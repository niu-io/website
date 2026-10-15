import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args=process.argv.slice(2);
const check=args.includes('--check');
const index=args.indexOf('--source');
const source=index>=0?path.resolve(args[index+1]??''):undefined;
const manifestPath=path.join(root,'src/content/public-shell-manifest.json');
const files=[
 ['branding/tokens.css','src/styles/tokens.css'],
 ['branding/public-header.css','src/styles/public-header.css'],
 ['branding/public-navigation.json','src/content/public-navigation.json'],
 ['apps/docs/src/components/PublicHeader.tsx','src/components/PublicHeader.tsx'],
 ['apps/docs/src/components/PublicNavigationMenu.tsx','src/components/PublicNavigationMenu.tsx'],
];
const digest=text=>createHash('sha256').update(text).digest('hex');
const adapt=(text,file)=>file.endsWith('.tsx')?text.replaceAll("'../../../dashboard/src/components/ui/","'./ui/").replaceAll("'./ThemeMenu'","'./PublicThemeMenu'").replaceAll("'../../../../branding/public-navigation.json'","'../content/website-navigation'"):text;
if(!source&&!check)throw new Error('Provide --source <public-niu-checkout> to synchronize.');
const manifest={sourceRepository:'niu-io/niu',files:{}};
if(source&&!check){
 const revision=execFileSync('git',['-C',source,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
 const changed=execFileSync('git',['-C',source,'status','--porcelain','--',...files.map(([origin])=>origin)],{encoding:'utf8'}).trim();
 manifest.sourceRevision=revision;
 manifest.sourceWorkingTreeModified=Boolean(changed);
}
const recorded=check?JSON.parse(await readFile(manifestPath,'utf8')):undefined;
for(const [origin,target] of files){
 const expected=source?adapt(await readFile(path.join(source,origin),'utf8'),target):undefined;
 const current=check?await readFile(path.join(root,target),'utf8'):expected;
 if(check&&((expected!==undefined&&expected!==current)||recorded.files[target]!==digest(current)))throw new Error(`Public shell snapshot is stale: ${target}`);
 if(!check)await writeFile(path.join(root,target),expected);
 manifest.files[target]=digest(current);
}
if(!check)await writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
console.log(check?'Public shell snapshot verified.':'Public shell snapshot synchronized.');
