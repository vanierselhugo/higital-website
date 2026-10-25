import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {once} from 'node:events';
import {configurePassengerSocket,createPreviewServer,listenForPassenger,startServer} from '../scripts/server.mjs';
import {pages} from '../src/pages.mjs';
import {packages,care,brand,navigation} from '../content/site.mjs';
import {redirects} from '../content/redirects.mjs';
import {publishedProjects} from '../content/projects.mjs';
import {projectDetail,projectCard} from '../src/project-template.mjs';
import '../src/form-core.js';
import {createContactService,validateSubmission} from '../src/contact-service.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const valid={name:'Voorbeeld Persoon',company:'Voorbeeldbedrijf',email:'test@example.com',phone:'',website:'https://example.com',package:'business',message:'Ik wil een nieuwe website voor mijn lokale bedrijf.'};
test('Passenger startup works without PORT and opens a dynamically assigned listener',async()=>{
  const previous=process.env.PORT;process.env.PORT='';
  let server;
  try{
    server=await startServer({passenger:true});
    await once(server,'listening');
    assert.equal(typeof server.address(),'object');
    assert.ok(server.address().port>0);
  }finally{
    if(server){server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
    if(previous===undefined)delete process.env.PORT;else process.env.PORT=previous;
  }
});
test('Passenger uses its explicit Unix-socket listener when Passenger is present',()=>{
  const configured=[];const listens=[];const server={listen:(...args)=>listens.push(args)};const onListening=()=>{};
  const available=configurePassengerSocket({configure:options=>configured.push(options)});
  assert.equal(available,true);assert.deepEqual(configured,[{autoInstall:false}]);
  listenForPassenger(server,onListening,available);
  assert.deepEqual(listens,[['passenger',onListening]]);
  listenForPassenger(server,onListening,false);
  assert.deepEqual(listens[1],[0,onListening]);
});
test('Passenger startup configures the API and selects the Passenger socket without PORT',async()=>{
  const originalListen=http.Server.prototype.listen;
  const previousApi=globalThis.PhusionPassenger;
  const previousPort=process.env.PORT;
  const configured=[];let listenArgs;
  globalThis.PhusionPassenger={configure:options=>configured.push(options)};
  process.env.PORT='';
  http.Server.prototype.listen=function(...args){listenArgs=args;return this;};
  try{
    await startServer({passenger:true});
    assert.deepEqual(configured,[{autoInstall:false}]);
    assert.equal(listenArgs[0],'passenger');
    assert.equal(typeof listenArgs[1],'function');
  }finally{
    http.Server.prototype.listen=originalListen;
    if(previousApi===undefined)delete globalThis.PhusionPassenger;else globalThis.PhusionPassenger=previousApi;
    if(previousPort===undefined)delete process.env.PORT;else process.env.PORT=previousPort;
  }
});
test('contact validation accepts a complete request and all supplied package choices',()=>{
  assert.deepEqual(globalThis.HigitalForm.validate(valid),{});
  for(const option of globalThis.HigitalForm.allowedPackages)assert.deepEqual(globalThis.HigitalForm.validate({...valid,package:option,website:'',phone:'+31 (0) 6 1234 5678'}),{});
});
test('contact validation rejects empty fields, invalid addresses and unwanted package values',()=>{
  const empty=globalThis.HigitalForm.validate({});assert.deepEqual(Object.keys(empty).sort(),['company','email','message','name']);
  for(const email of ['fout','a@','a @voorbeeld.nl'])assert.ok(globalThis.HigitalForm.validate({...valid,email}).email);
  for(const website of ['javascript:alert(1)','file:///C:/test','geen-webadres','ftp://example.com'])assert.ok(globalThis.HigitalForm.validate({...valid,website}).website);
  assert.ok(globalThis.HigitalForm.validate({...valid,package:'<script>alert(1)</script>'}).package);
  assert.ok(globalThis.HigitalForm.validate({...valid,message:' '.repeat(30)}).message);
  assert.ok(globalThis.HigitalForm.validate({...valid,message:'x'.repeat(4001)}).message);
});
test('original logo is copied byte for byte and package prices match the brief',async()=>{
  const hash=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
  const source=await fs.readFile(path.join(root,'public/assets/higital-logo-original.png'));
  const built=await fs.readFile(path.join(dist,'assets/higital-logo-original.png'));
  assert.equal(hash(source),hash(built));
  assert.equal(source.readUInt32BE(16),1254);assert.equal(source.readUInt32BE(20),1254);
  assert.deepEqual(packages.map(p=>p.amount),[499,999,1799]);assert.equal(packages[2].prefix,'Vanaf');
  assert.deepEqual(care.map(p=>p.price),['€ 24,95','€ 49,95']);assert.ok(care[1].features.some(f=>f.includes('30 minuten')));
  const css=await fs.readFile(path.join(dist,'assets/brand.css'),'utf8');for(const value of Object.values(brand.colors))assert.ok(css.includes(value));
});
test('all generated pages, internal links, local frames, assets and anchors resolve',async()=>{
  const files=await fs.readdir(dist,{recursive:true});
  const htmlFiles=files.filter(file=>file.endsWith('.html'));
  for(const file of htmlFiles){
    const absolute=path.join(dist,file);const html=await fs.readFile(absolute,'utf8');
    assert.match(html,/<html lang="nl">/);assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,`${file}: h1`);
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,`${file}: duplicate IDs`);
    for(const [,raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)){
      if(/^(https?:|mailto:|tel:)/.test(raw))continue;
      const uri=new URL(raw,'http://local/'+file.replaceAll('\\','/'));let target=path.join(dist,decodeURIComponent(uri.pathname));
      if(uri.pathname.endsWith('/'))target=path.join(target,'index.html');
      await assert.doesNotReject(fs.access(target),`${file}: ${raw}`);
      if(uri.hash&&path.extname(target)==='.html'){const targetHTML=await fs.readFile(target,'utf8');assert.ok(targetHTML.includes(`id="${decodeURIComponent(uri.hash.slice(1))}"`),`${file}: anchor ${raw}`);}
    }
    assert.equal((html.match(/<img[^>]*src="https?:/g)||[]).length,0,`${file}: external image`);
  }
});
test('public pages contain no demo language and contact submits through the mail service',async()=>{
  for(const file of await fs.readdir(dist,{recursive:true}))if(file.endsWith('.html')){const html=await fs.readFile(path.join(dist,file),'utf8');assert.doesNotMatch(html,/demonstratie|lokale ontwikkelomgeving|concepttekst|lokaal websiteconcept|test de aanvraag|na de demo|formulier is een demo|conceptpagina|conceptversie/i,file);assert.match(html,/Gratis kennismaking/);assert.match(html,/index, follow/);}
  const form=await fs.readFile(path.join(dist,'contact/index.html'),'utf8');assert.match(form,/action="\/api\/contact"/);assert.match(form,/Verstuur aanvraag/);assert.match(form,/role="status" aria-live="polite"/);assert.match(form,/<noscript>/);
  const privacy=await fs.readFile(path.join(dist,'privacy/index.html'),'utf8');assert.match(privacy,/Resend/);assert.match(privacy,/info@higital.nl/);
  const cookies=await fs.readFile(path.join(dist,'cookies/index.html'),'utf8');assert.match(cookies,/plaatst zelf geen cookies/);
  const footer=await fs.readFile(path.join(dist,'index.html'),'utf8');assert.match(footer,/Alle rechten voorbehouden/);assert.match(footer,/Privacyverklaring/);assert.match(footer,/Cookiebeleid/);assert.doesNotMatch(footer,/Privacy · concept|Lokaal websiteconcept/i);
  const portfolio=await fs.readFile(path.join(dist,'ons-werk/index.html'),'utf8');assert.match(portfolio,/Elk project begint met een goed gesprek/);assert.doesNotMatch(portfolio,/class="portfolio-card"/);
  const app=await fs.readFile(path.join(dist,'assets/app.js'),'utf8');assert.match(app,/fetch\('\/api\/contact'/);assert.doesNotMatch(app,/demo=1|bedankt\//);assert.match(app,/prefers-reduced-motion/);
  const css=await fs.readFile(path.join(dist,'assets/style.css'),'utf8');assert.match(css,/prefers-reduced-motion/);assert.match(css,/:focus-visible/);
});
test('home hero has no bottom ribbon and personal sections use a mobile-only natural flow',async()=>{
  const home=await fs.readFile(path.join(dist,'index.html'),'utf8');
  const about=await fs.readFile(path.join(dist,'over-higital/index.html'),'utf8');
  assert.doesNotMatch(home,/hero-foot|Webdesign &amp; ontwikkeling · Hugo van Iersel · Tilburg|Ontdek Higital/);
  assert.doesNotMatch(about,/hero-foot/);
  const css=await fs.readFile(path.join(dist,'assets/style.css'),'utf8');
  assert.doesNotMatch(css,/hero-foot/);
  assert.match(css,/@media\(max-width:700px\)\{[\s\S]*?\.about-strip\.personal-intro \.personal-intro-grid\{[\s\S]*?grid-template-columns:minmax\(0,1fr\)[\s\S]*?grid-auto-rows:auto/);
  assert.match(css,/@media\(max-width:700px\)\{[\s\S]*?\.about-surface \.about-main\{[\s\S]*?grid-auto-rows:auto[\s\S]*?height:auto[\s\S]*?overflow:visible/);
  assert.match(css,/@media\(max-width:390px\)\{/);
  assert.match(home,/personal-intro-grid/);assert.match(about,/class="about-main wrap"/);
});
test('preview server handles contact safely and reports missing mail configuration',async()=>{
  const server=createPreviewServer().listen(0,'127.0.0.1');await once(server,'listening');const origin=`http://127.0.0.1:${server.address().port}`;
  try{
    for(const [route] of pages){const response=await fetch(origin+route);assert.equal(response.status,200,route);assert.match(response.headers.get('content-type'),/text\/html/);await response.text();}
    for(const asset of ['/assets/style.css','/assets/app.js','/assets/brand.css','/assets/higital-logo-original.png','/assets/hugo-portret-400.jpg','/assets/hugo-portret-800.jpg','/assets/hugo-telefoon.jpg','/assets/kennismaking.jpg']){const response=await fetch(origin+asset);assert.equal(response.status,200,asset);await response.arrayBuffer();}
    for(const retired of ['/ons-werk/donders-meubel/','/work/donders/','/work/donders/index.html','/work/donders/assets/woonkamer-concept.jpg']){const response=await fetch(origin+retired);assert.equal(response.status,404,retired);await response.text();}
    const unknown=await fetch(origin+'/geen-bestaande-pagina');assert.equal(unknown.status,404);await unknown.text();
    const redirect=await fetch(origin+'/websites-prijzen?pakket=start',{redirect:'manual'});assert.equal(redirect.status,308);assert.equal(redirect.headers.get('location'),'/websites-prijzen/?pakket=start');
    for(const [old,target] of Object.entries(redirects)){
      for(const route of [old,old.slice(0,-1)]){const response=await fetch(origin+route,{redirect:'manual'});assert.equal(response.status,301);assert.equal(response.headers.get('location'),target);}
    }
    const oldQuery=await fetch(origin+'/websitepakketten?pakket=start',{redirect:'manual'});assert.equal(oldQuery.headers.get('location'),'/websites-prijzen/?pakket=start#pakketten');
    const validBody={...valid,website:''};
    const request=(body,headers={'content-type':'application/json',origin})=>fetch(origin+'/api/contact',{method:'POST',headers,body:JSON.stringify(body)});
    assert.equal((await fetch(origin+'/api/contact')).status,405);
    assert.equal((await request(validBody,{'content-type':'application/json',origin:'https://example.org'})).status,403);
    assert.equal((await request({...validBody,email:'ongeldig'})).status,422);
    const unconfigured=await request(validBody);assert.equal(unconfigured.status,503);assert.match((await unconfigured.json()).error,/info@higital.nl/);
    const successServer=createPreviewServer({contactService:{submit:async()=>({status:200,ok:true})}}).listen(0,'127.0.0.1');await once(successServer,'listening');
    try{const successOrigin=`http://127.0.0.1:${successServer.address().port}`;const success=await fetch(successOrigin+'/api/contact',{method:'POST',headers:{'content-type':'application/json',origin:successOrigin},body:JSON.stringify(validBody)});assert.equal(success.status,200);assert.equal((await success.json()).ok,true);}finally{successServer.closeAllConnections();await new Promise(resolve=>successServer.close(resolve));}
    const traversal=await fetch(origin+'/%5c..%5cpackage.json');assert.equal(traversal.status,403);
  }finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
});
test('email service validates requests, sends only to Higital, and confirms provider acceptance',async()=>{
  const input={...valid,website:''};let sent;
  const service=createContactService({env:{RESEND_API_KEY:'unit-test-key',HIGITAL_FROM_EMAIL:'website@example.nl'},fetchImpl:async(url,options)=>{sent={url,options};return{ok:true,json:async()=>({id:'email-test-id'})};}});
  assert.deepEqual(await service.submit({input,ip:'127.0.0.1'}),{status:200,ok:true});
  assert.equal(sent.url,'https://api.resend.com/emails');assert.equal(sent.options.headers.Authorization,'Bearer unit-test-key');
  const mail=JSON.parse(sent.options.body);assert.deepEqual(mail.to,['info@higital.nl']);assert.equal(mail.reply_to,input.email);assert.ok(mail.text.includes(input.message));
  let invoked=false;const missing=createContactService({env:{},fetchImpl:async()=>{invoked=true;}});
  assert.equal((await missing.submit({input,ip:'1'})).status,503);assert.equal(invoked,false);
  const rejected=createContactService({env:{RESEND_API_KEY:'key',HIGITAL_FROM_EMAIL:'website@example.nl'},fetchImpl:async()=>({ok:false})});
  assert.equal((await rejected.submit({input,ip:'2'})).status,502);
  let time=1000;const limited=createContactService({env:{},now:()=>time});
  for(let i=0;i<5;i++)await limited.submit({input,ip:'same'});
  assert.equal((await limited.submit({input,ip:'same'})).status,429);time+=3600001;
  assert.equal((await limited.submit({input,ip:'same'})).status,503);
  assert.ok(validateSubmission({...input,website:'spam'}).website);
});
test('removed portfolio, arrows, pause control and text band are absent throughout the build',async()=>{
  const files=await fs.readdir(dist,{recursive:true});
  for(const file of files){
    assert.doesNotMatch(file,/donders/i);
    if(!/\.(html|css|js|json|txt)$/.test(file))continue;
    const text=await fs.readFile(path.join(dist,file),'utf8');
    assert.doesNotMatch(text,/donders|motion-toggle|type-band|data-scroll-type|[↗↳↓↑→]/i,file);
    if(file.endsWith('.html'))assert.doesNotMatch(text,/<iframe|localStorage|reset-preferences|Jouw verhaal\. Jouw website\./,file);
  }
  const app=await fs.readFile(path.join(dist,'assets/app.js'),'utf8');
  assert.doesNotMatch(app,/localStorage|userMotion|motionButton|device-preview/);
  assert.match(app,/const motionEnabled=\(\)=>!reduced.matches/);
});
test('authentic images copied intact, optimised portrait and work variants present',async()=>{
  const sourceRoot="C:/Users/vanie/.codex/Referentie foto's";
  const mapping=[['Foto Mezelf.png','hugo-portret-original.png'],['Foto aan het werk.jpg','hugo-werk-original.jpg'],['hugo-aan-de-telefoon-254x300.jpg','hugo-telefoon.jpg'],['kennismaking-handdruk-300x168.jpg','kennismaking.jpg']];
  for(const [source,copy] of mapping){const a=await fs.readFile(path.join(sourceRoot,source));const b=await fs.readFile(path.join(root,'public/assets',copy));assert.deepEqual(a,b);}
  for(const name of ['hugo-portret-400.jpg','hugo-portret-800.jpg','hugo-werk-600.jpg','hugo-werk-1200.jpg']){const file=await fs.readFile(path.join(dist,'assets',name));assert.equal(file.readUInt16BE(0),0xffd8);assert.ok(file.length<110000);}
  const about=await fs.readFile(path.join(dist,'over-higital/index.html'),'utf8');assert.match(about,/srcset="[^"]*400w,[^"]*800w/);
  const home=await fs.readFile(path.join(dist,'index.html'),'utf8');assert.match(home,/hugo-werk-1200.jpg/);assert.match(home,/kennismaking.jpg/);
  for(const name of ['hugo-portret-original.png','hugo-werk-original.jpg'])await assert.rejects(fs.access(path.join(dist,'assets',name)));
  const contact=await fs.readFile(path.join(dist,'contact/index.html'),'utf8');assert.match(contact,/hugo-telefoon.jpg/);
});
test('future project templates publish approved complete entries only and escape client text',()=>{
  assert.deepEqual(publishedProjects(),[]);
  assert.deepEqual(publishedProjects([{published:false}]),[]);
  const fixture={published:true,slug:'template-test',name:'Test <project>',company:'Test & bedrijf',summary:'Introductie.',challenge:'De uitdaging.',approach:'De aanpak.',design:'Ontwerpkeuzes.',services:['Webdesign'],hero:{src:'/assets/hugo-portret-800.jpg',alt:'Afbeelding voor technische templatecontrole',width:800,height:1132},screenshots:[{src:'/assets/kennismaking.jpg',alt:'Technische templatecontrole',width:300,height:168,caption:'Toelichting.'}]};
  assert.equal(publishedProjects([fixture]).length,1);
  for(const field of ['name','company','summary','challenge','approach','design','hero'])assert.throws(()=>publishedProjects([{...fixture,[field]:null}]));
  assert.throws(()=>publishedProjects([fixture,fixture]));assert.throws(()=>publishedProjects([{...fixture,slug:'../outside'}]));
  const detail=projectDetail(fixture);assert.equal((detail.match(/<h1/g)||[]).length,1);assert.match(detail,/Test &lt;project&gt;/);assert.match(detail,/Test &amp; bedrijf/);
  for(const text of ['De uitdaging.','De aanpak.','Het ontwerp.','Terug naar ons werk','Bekijk alle projecten'])assert.ok(detail.includes(text));
  assert.match(projectCard(fixture),/href="\/ons-werk\/template-test\/"/);
});
test('five main navigation destinations, real contact details and all brief inclusions',async()=>{
  assert.deepEqual(navigation.map(([label])=>label),['Home','Websites & prijzen','Ons werk','Over Higital','Contact']);
  assert.equal(brand.personName,'Hugo van Iersel');assert.equal(brand.email,'info@higital.nl');
  for(const [route] of pages){const html=await fs.readFile(path.join(dist,route,'index.html'),'utf8');
    for(const nav of ['Hoofdnavigatie','Mobiele hoofdnavigatie']){
      const content=html.match(new RegExp('<nav[^>]*aria-label="'+nav+'"[^>]*>([\\s\\S]*?)</nav>'))[1];
      const paths=[...content.matchAll(/href="([^"#]+)"/g)].map(m=>m[1]).filter(p=>p.startsWith('/'));
      assert.deepEqual(paths,navigation.map(n=>n[1]),route+' '+nav);
      assert.match(content,/>Gratis kennismaking</);
    }
    assert.match(html,/mailto:info@higital.nl/);assert.match(html,/tel:\+31643880582/);
  }
  const full=await fs.readFile(path.join(dist,'websites-prijzen/index.html'),'utf8');
  for(const p of [...packages,...care])for(const feature of p.features)assert.ok(full.includes(feature),feature);
  for(const id of ['pakketten','vernieuwen','onderhoud','vragen','start','business','premium'])assert.ok(full.includes(`id="${id}"`));
  const contact=await fs.readFile(path.join(dist,'contact/index.html'),'utf8');
  assert.deepEqual([...contact.matchAll(/<(?:input|select|textarea)[^>]*name="([^"]+)"/g)].map(m=>m[1]),['website','name','company','email','phone','package','message']);
  for(const retired of ['websites-laten-maken','websitepakketten','websiteonderhoud','werkwijze'])await assert.rejects(fs.access(path.join(dist,retired,'index.html')));
});
