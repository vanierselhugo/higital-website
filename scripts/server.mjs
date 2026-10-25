import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {redirects} from '../content/redirects.mjs';
import {CONTACT_BODY_LIMIT,createContactService,validSameOrigin} from '../src/contact-service.mjs';
import {loadLocalEnv} from './load-env.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const port=Number(process.env.PORT)||5173;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.txt':'text/plain; charset=utf-8','.json':'application/json'};
export function createPreviewServer(options={}){const env=options.env??process.env;const contactService=options.contactService??createContactService({env});return http.createServer(async(req,res)=>{
  const headers={'X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin','Cache-Control':'no-store'};
  const pathname=new URL(req.url,'http://localhost').pathname;
  if(pathname==='/api/contact'){
    if(req.method!=='POST'){res.writeHead(405,{...headers,Allow:'POST','Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify({error:'Gebruik het contactformulier om een aanvraag te versturen.'}));return;}
    if(!validSameOrigin(req)){res.writeHead(403,{...headers,'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify({error:'De aanvraag kon niet worden verwerkt. Vernieuw de pagina en probeer het opnieuw.'}));return;}
    try{
      let raw='',tooLarge=false;
      for await(const chunk of req){if(Buffer.byteLength(raw)+chunk.length>CONTACT_BODY_LIMIT){tooLarge=true;continue;}if(!tooLarge)raw+=chunk;}
      if(tooLarge){res.writeHead(413,{...headers,'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify({error:'Je aanvraag is te lang. Verkort je bericht en probeer het opnieuw.'}));return;}
      const contentType=req.headers['content-type']?.split(';')[0].trim();
      let input;
      if(contentType==='application/json')input=JSON.parse(raw);
      else if(contentType==='application/x-www-form-urlencoded')input=Object.fromEntries(new URLSearchParams(raw));
      else{res.writeHead(415,{...headers,'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify({error:'Deze aanvraag kon niet worden verwerkt.'}));return;}
      if(!input||typeof input!=='object'||Array.isArray(input))throw new SyntaxError('Invalid form body');
      const headerNames=new Set(['x-forwarded-for','x-real-ip','cf-connecting-ip']);
      const trustedHeader=headerNames.has(env.HIGITAL_CLIENT_IP_HEADER?.toLowerCase())?env.HIGITAL_CLIENT_IP_HEADER.toLowerCase():'';
      const proxyIp=trustedHeader?String(req.headers[trustedHeader]||'').split(',')[0].trim():'';
      const result=await contactService.submit({input,ip:proxyIp||req.socket.remoteAddress||'unknown'});
      res.writeHead(result.status,{...headers,'Content-Type':'application/json; charset=utf-8'});
      res.end(JSON.stringify(result.ok?{ok:true,message:'Bedankt. Je aanvraag is verstuurd. Hugo neemt contact met je op.'}:{error:result.error,fields:result.fields}));
    }catch(error){
      const badInput=error instanceof SyntaxError;
      res.writeHead(badInput?400:500,{...headers,'Content-Type':'application/json; charset=utf-8'});
      res.end(JSON.stringify({error:badInput?'Controleer je gegevens en probeer het opnieuw.':'Versturen is niet bevestigd. Probeer het opnieuw of mail naar info@higital.nl.'}));
    }
    return;
  }
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{...headers,Allow:'GET, HEAD','Content-Type':'text/plain; charset=utf-8'});res.end('Methode niet toegestaan.');return;}
  try{
    const decodedPath=decodeURIComponent(pathname);
    const previous=decodedPath.endsWith('/')?decodedPath:decodedPath+'/';
    if(redirects[previous]){
      const targetUrl=new URL(redirects[previous],'http://localhost');
      targetUrl.search=new URL(req.url,'http://localhost').search;
      res.writeHead(301,{...headers,Location:targetUrl.pathname+targetUrl.search+targetUrl.hash});res.end();return;
    }
    let target=path.resolve(root,'.'+decodedPath);
    if(target!==root&&!target.startsWith(root+path.sep)){res.writeHead(403,headers);res.end();return;}
    if((await fs.stat(target)).isDirectory()){
      if(!decodedPath.endsWith('/')){res.writeHead(308,{...headers,Location:decodedPath+'/'+new URL(req.url,'http://localhost').search});res.end();return;}
      target=path.join(target,'index.html');
    }
    const data=await fs.readFile(target);res.writeHead(200,{...headers,'Content-Type':types[path.extname(target)]||'application/octet-stream','Content-Length':data.length});res.end(req.method==='HEAD'?undefined:data);
  }catch{const data=await fs.readFile(path.join(root,'404.html'));res.writeHead(404,{...headers,'Content-Type':'text/html; charset=utf-8'});res.end(req.method==='HEAD'?undefined:data);}
});}
export async function startServer({passenger=false}={}){
  await loadLocalEnv();
  const server=createPreviewServer();
  const configuredPort=process.env.PORT;
  const port=passenger?Number(configuredPort):(Number(configuredPort)||5173);
  if(passenger&&(!configuredPort||!Number.isInteger(port)||port<1||port>65535))throw new Error('Passenger heeft geen geldige PORT aan de Node.js-app doorgegeven.');
  server.on('error',error=>{console.error(error.code==='EADDRINUSE'?`Poort ${port} is bezet. Stop de andere server of gebruik $env:PORT=5174.`:error.message);process.exitCode=1;});
  const onListening=()=>console.log(passenger?'Higital Passenger-app gestart.':`Higital lokaal: http://localhost:${port}\nE-mailverzending is actief wanneer Resend is ingesteld. Stop met Ctrl+C.`);
  if(passenger)server.listen(port,onListening);
  else server.listen(port,'localhost',onListening);
  return server;
}
export const startPassengerServer=()=>startServer({passenger:true});
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  await startServer();
}
