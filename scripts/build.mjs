import {gunzipSync} from 'node:zlib';
import {readFileSync,readdirSync,mkdirSync,writeFileSync,rmSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';import {pathToFileURL} from 'node:url';import YAML from 'yaml';
import {buildCatalog} from './catalog/build.js';import {digest} from './catalog/protocol.js';

export function buildAbilitySource({root=process.cwd(),directory=join(root,'dist')}={}){
 const declaration=YAML.parse(readFileSync(join(root,'ksf-source.yaml'),'utf8')),entries=declaration.distribution?.entries;
 if(entries!==undefined&&(!Array.isArray(entries)||!entries.length||entries.some(id=>typeof id!=='string')||new Set(entries).size!==entries.length))throw Error('Invalid distribution.entries');
 const withdrawals=existsSync(join(root,'withdrawals.json'))?JSON.parse(readFileSync(join(root,'withdrawals.json'))):{};
 rmSync(directory,{recursive:true,force:true});mkdirSync(join(directory,'packages'),{recursive:true});const objects=[],legacyObjects=[],membersByArchive=new Map();let archives=0;
 for(const id of readdirSync(join(root,'releases')).sort()){
  const versions=readdirSync(join(root,'releases',id)).filter(n=>n.endsWith('.ksfability')).map(n=>{
   const bytes=readFileSync(join(root,'releases',id,n)),packet=JSON.parse(gunzipSync(bytes,{maxOutputLength:32*1024*1024})),sha256=digest(bytes),url='packages/'+sha256+'.ksfability';
   const members=packet.protocol==='ksf-ability-package-v2'?packet.groups?.flatMap(g=>g.objects):packet.objects,object=members?.find(o=>o.id===id);
   if(!['ksf-ability-package-v1','ksf-ability-package-v2'].includes(packet.protocol)||packet.sourceId!==declaration.id||!packet.roots?.includes(id)||!object)throw Error('Invalid ability package '+id);
   // Retired standalone entries leave discovery, but their immutable binaries
   // remain available to historical catalog references and installed clients.
   writeFileSync(join(directory,url),bytes);archives++;
   membersByArchive.set(sha256,members);
   return {...object,...(withdrawals[id+'@'+object.version]?{withdrawn:true,withdrawalReason:withdrawals[id+'@'+object.version].reason}:{}),package:{url,size:bytes.length,sha256}};
  }).sort((a,b)=>{const x=a.version.split('.').map(Number),y=b.version.split('.').map(Number);return y[0]-x[0]||y[1]-x[1]||y[2]-x[2];});
  const legacy=versions.filter(v=>!v.distribution);if(legacy.length)legacyObjects.push({...legacy[0],versions:legacy});
  if(versions.length&&(!entries||entries.includes(id))){if(entries&&versions[0].distribution?.entry!==true)throw Error('Generate a new bundled snapshot for '+id);objects.push({...versions[0],versions});}
 }
 if(entries?.some(id=>!objects.some(o=>o.id===id)))throw Error('Missing release for a distribution entry');
 // Keep the former independent directory shards addressable for clients that
 // cached that verified root. Only the final index exposes current products.
 if(entries&&legacyObjects.length)buildCatalog({directory,kind:'abilities',source:{id:declaration.id,name:declaration.name},objects:legacyObjects});
 // Core 0.5.6 resolves exact dependencies through detail/version lookups. Keep
 // those lookups hidden from discovery and point them at the same whole product
 // binary: no separate member artifact or standalone product is published.
 const aliases=new Map();if(entries)for(const product of objects)for(const release of product.versions){for(const member of membersByArchive.get(release.package.sha256)??[]){if(entries.includes(member.id))continue;let alias=aliases.get(member.id);if(!alias){alias={...member,hidden:true,versions:[]};aliases.set(member.id,alias);}const prior=alias.versions.find(v=>v.version===member.version);if(prior){if(prior.contentDigest&&member.contentDigest&&prior.contentDigest!==member.contentDigest)throw Error('Bundled member content conflict '+member.id);continue;}alias.versions.push({...member,...(release.withdrawn?{withdrawn:true,withdrawalReason:release.withdrawalReason}:{}),package:release.package});}}
 for(const [id,alias] of aliases){for(const v of legacyObjects.find(o=>o.id===id)?.versions??[])if(!alias.versions.some(r=>r.version===v.version))alias.versions.push(v);alias.versions.sort((a,b)=>{const x=a.version.split('.').map(Number),y=b.version.split('.').map(Number);return y[0]-x[0]||y[1]-x[1]||y[2]-x[2];});}
 const index=buildCatalog({directory,kind:'abilities',source:{id:declaration.id,name:declaration.name},objects:[...objects,...aliases.values()]});
 return {revision:index.revision,count:index.count,archives,indexBytes:readFileSync(join(directory,'index.json')).length};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)console.log(JSON.stringify(buildAbilitySource()));
