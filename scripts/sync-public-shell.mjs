import { execFileSync } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args=process.argv.slice(2);
const check=args.includes('--check');
const brandOnly=args.includes('--brand-only');
const index=args.indexOf('--source');
const source=index>=0?path.resolve(args[index+1]??''):undefined;
const manifestPath=path.join(root,'src/content/public-shell-manifest.json');
const files=[
 ['branding/tokens.css','src/styles/tokens.css'],
 ['branding/public-header.css','src/styles/public-header.css'],
 ['branding/public-navigation.json','src/content/public-navigation.json'],
 ['apps/dashboard/src/app/locale.ts','src/components/locale.ts'],
 ['apps/docs/src/components/PublicHeader.tsx','src/components/PublicHeader.tsx'],
 ['apps/docs/src/components/SessionLink.tsx','src/components/SessionLink.tsx'],
 ['apps/docs/src/components/live-api/session.ts','src/components/live-api/session.ts'],
 ['apps/docs/src/navigation.ts','src/content/docs-navigation.ts'],
 ['apps/docs/src/components/PublicNavigationMenu.tsx','src/components/PublicNavigationMenu.tsx'],
];
const brandFiles=[
 ['branding/identity.css','src/styles/identity.css'],
 ['apps/dashboard/src/components/NiuBrand.tsx','src/components/NiuBrand.tsx'],
 ['branding/rounded/sources/mark-paths.json','src/content/brand/mark-paths.json'],
 ['branding/rounded/sources/lettering.json','src/content/brand/lettering.json'],
 ['branding/rounded/manifest.json','src/content/brand/manifest.json'],
 ['branding/assets/niu-mark.png','public/site-assets/brand/niu-mark.png',true],
 ['branding/assets/niu-logo-dark.png','public/site-assets/brand/niu-logo-dark.png',true],
 ['branding/assets/niu-social-en-dark.png','public/site-assets/brand/niu-social-en-dark.png',true],
 ['branding/assets/favicon.ico','public/favicon.ico',true],
 ['branding/rounded/sources/MAPLE-MONO-OFL.txt','public/site-assets/brand/MAPLE-MONO-OFL.txt'],
 ['branding/rounded/sources/OPEN-HUNINN-OFL.txt','public/site-assets/brand/OPEN-HUNINN-OFL.txt'],
];
files.push(...brandFiles);
const brandOrigins=new Set([...brandFiles.map(([origin])=>origin),'branding/public-header.css','apps/docs/src/components/PublicHeader.tsx']);
const activeFiles=brandOnly?files.filter(([origin])=>brandOrigins.has(origin)):files;
const digest=text=>createHash('sha256').update(text).digest('hex');
const adapt=(text,file)=>file.endsWith('.tsx')?text.replaceAll('../../../dashboard/src/components/NiuBrand', './NiuBrand').replaceAll('../../../../branding/rounded/sources/', '../content/brand/').replaceAll('../../../../branding/rounded/manifest.json', '../content/brand/manifest.json').replaceAll('../../../../branding/identity.css', '../styles/identity.css').replaceAll('../../../dashboard/src/components/ui/', './ui/').replaceAll('../../../dashboard/src/app/locale', './locale').replaceAll("'../navigation'","'../content/docs-navigation'").replaceAll("'../../../dashboard/src/components/ui/","'./ui/").replaceAll("'./ThemeMenu'","'./PublicThemeMenu'").replaceAll("'../../../../branding/public-navigation.json'","'../content/website-navigation'"):text;
if(!source&&!check)throw new Error('Provide --source <public-niu-checkout> to synchronize.');
const previous=brandOnly?JSON.parse(await readFile(manifestPath,'utf8')):undefined;
const manifest={...previous,sourceRepository:'niu-io/niu',files:{...previous?.files}};
if(source&&!check){
 const revision=execFileSync('git',['-C',source,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
 const changed=execFileSync('git',['-C',source,'status','--porcelain','--',...activeFiles.map(([origin])=>origin)],{encoding:'utf8'}).trim();
 if(brandOnly){manifest.brandSourceRevision=revision;manifest.brandSourceWorkingTreeModified=Boolean(changed);}
 else{manifest.sourceRevision=revision;manifest.sourceWorkingTreeModified=Boolean(changed);}
}
const recorded=check?JSON.parse(await readFile(manifestPath,'utf8')):undefined;
for(const [origin,target,binary=false] of activeFiles){
 const expected=source?(binary?await readFile(path.join(source,origin)):Buffer.from(adapt(await readFile(path.join(source,origin),'utf8'),target))):undefined;
 const current=check?await readFile(path.join(root,target)):expected;
 if(check&&((expected!==undefined&&!expected.equals(current))||recorded.files[target]!==digest(current)))throw new Error(`Public shell snapshot is stale: ${target}`);
 if(!check){await mkdir(path.dirname(path.join(root,target)),{recursive:true});await writeFile(path.join(root,target),expected);}
 manifest.files[target]=digest(current);
}
if(!check)await writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');
console.log(check?'Public shell snapshot verified.':'Public shell snapshot synchronized.');
