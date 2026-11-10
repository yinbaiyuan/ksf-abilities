import {gunzipSync} from 'node:zlib';
import {readFileSync,readdirSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';import {join} from 'node:path';
import {buildCatalog} from './catalog/build.js';import {digest} from './catalog/protocol.js';
const directory='dist';rmSync(directory,{recursive:true,force:true});mkdirSync(join(directory,'packages'),{recursive:true});const objects=[];
for(const id of readdirSync('releases').sort()){
 const versions=readdirSync(join('releases',id)).filter(n=>n.endsWith('.ksfability')).map(n=>{const bytes=readFileSync(join('releases',id,n)),p=JSON.parse(gunzipSync(bytes)),sha256=digest(bytes),url='packages/'+sha256+'.ksfability';if(p.protocol!=='ksf-ability-package-v1'||p.sourceId!=='ksf-abilities'||p.objects?.[0]?.id!==id)throw Error('Invalid ability package '+id);writeFileSync(join(directory,url),bytes);return {...p.objects[0],package:{url,size:bytes.length,sha256}};}).sort((a,b)=>{const x=a.version.split('.').map(Number),y=b.version.split('.').map(Number);return y[0]-x[0]||y[1]-x[1]||y[2]-x[2];});
 if(versions.length)objects.push({...versions[0],versions});
}
const root=buildCatalog({directory,kind:'abilities',source:{id:'ksf-abilities',name:'KSF 公用能力源'},objects});console.log(JSON.stringify({revision:root.revision,count:root.count,indexBytes:readFileSync('dist/index.json').length}));
