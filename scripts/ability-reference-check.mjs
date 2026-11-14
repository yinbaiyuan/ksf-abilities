// Executable definitions must cite the versions shipped in their product.
// Apply this to current releases; historical frozen bytes stay unchanged.
export function checkAbilityReferences(packet){
 const groups=packet.protocol==='ksf-ability-package-v2'?packet.groups:[packet],objects=new Map(groups.flatMap(g=>g.objects.map(o=>[o.id,o.version])));let checked=0;
 for(const group of groups)for(const object of group.objects){
  const entry=({partner:'partner.md',competency:'competency.md',cooperation:'cooperation.md','data-package':'datapackage.md'})[object.id.split('.')[0]],file=group.files.find(f=>f.path===object.relative+'/'+entry);if(!file)throw Error('Missing definition '+object.id);
  const text=Buffer.from(file.content,'base64').toString('utf8');for(const m of text.matchAll(/\b((?:cooperation|partner|competency|data-package)\.[a-z0-9-]+\.[a-z0-9_-]+)@(\d+\.\d+\.\d+)\b/g)){const expected=objects.get(m[1])??object.dependencies?.find(d=>d.id===m[1])?.version;if(expected&&m[2]!==expected)throw Error('Stale ability reference in '+object.id+': '+m[1]+'@'+m[2]+'; bundled '+expected);}
  checked++;
 }
 return checked;
}
