import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {pages} from '../src/pages.mjs';
import {header,footer,esc} from '../src/components.mjs';
import {contactWidget} from '../src/contact-components.mjs';
import {brand} from '../content/site.mjs';
import {redirects} from '../content/redirects.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
// Build in isolation; preserve the previous build instead of deleting source/work.
const dist=await fs.mkdtemp(path.join(root,'.build-'));
await fs.cp(path.join(root,'public'),dist,{recursive:true,filter:source=>!/-original\.(png|jpg)$/.test(source)||source.endsWith('higital-logo-original.png')});
await fs.mkdir(path.join(dist,'assets'),{recursive:true});
for(const file of ['style.css','app.js','form-core.js','contact-ui.js'])await fs.copyFile(path.join(root,'src',file),path.join(dist,'assets',file));
await fs.appendFile(path.join(dist,'assets/style.css'),'\n'+await fs.readFile(path.join(root,'src/refinements.css'),'utf8'));
await fs.appendFile(path.join(dist,'assets/style.css'),'\n'+await fs.readFile(path.join(root,'src/contact.css'),'utf8'));
await fs.appendFile(path.join(dist,'assets/style.css'),'\n'+await fs.readFile(path.join(root,'src/navy.css'),'utf8'));
await fs.appendFile(path.join(dist,'assets/style.css'),'\n'+await fs.readFile(path.join(root,'src/mobile-layout.css'),'utf8'));
await fs.writeFile(path.join(dist,'assets/brand.css'),`:root{${Object.entries(brand.colors).map(([key,value])=>`--${key}:${value}`).join(';')}}`);
const packageJson=await fs.readFile(path.join(root,'package.json'),'utf8');
const version=JSON.parse(packageJson).version;
for(const [route,title,description,render] of pages){
  const body=render();
  const html=`<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="${brand.colors.navy}"><meta name="color-scheme" content="light"><meta name="robots" content="index, follow"><title>${esc(title)} | Higital</title><meta name="description" content="${esc(description)}"><meta property="og:title" content="${esc(title)} | Higital"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:locale" content="nl_NL"><link rel="icon" href="/assets/higital-logo-original.png" type="image/png"><link rel="stylesheet" href="/assets/style.css?v=${version}"><link rel="stylesheet" href="/assets/brand.css?v=${version}"><script src="/assets/form-core.js?v=${version}" defer></script><script src="/assets/app.js?v=${version}" defer></script><script type="module" src="/assets/contact-ui.js?v=${version}"></script></head><body>${header(route)}<main id="inhoud" tabindex="-1">${body}</main>${footer()}${contactWidget()}</body></html>`;
  const dir=path.join(dist,route.replace(/^\//,''));await fs.mkdir(dir,{recursive:true});await fs.writeFile(path.join(dir,'index.html'),html);
}
await fs.copyFile(path.join(dist,'404/index.html'),path.join(dist,'404.html'));
await fs.writeFile(path.join(dist,'robots.txt'),'User-agent: *\nAllow: /\n');
await fs.writeFile(path.join(dist,'redirects.json'),JSON.stringify(redirects,null,2));
const destination=path.join(root,'dist');
try { await fs.access(destination);await fs.mkdir(path.join(root,'.history'),{recursive:true});await fs.rename(destination,path.join(root,'.history','dist-'+Date.now())); } catch(error) { if(error.code!=='ENOENT')throw error; }
await fs.rename(dist,destination);
console.log(`Higital ${version}: vijf hoofdpagina’s, ondersteunende pagina’s, portfolio-opzet en lokale assets gebouwd in ${destination}`);
