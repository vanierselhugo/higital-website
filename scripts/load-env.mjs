import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const projectRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export async function loadLocalEnv(env=process.env){
  let source;
  try{source=await fs.readFile(path.join(projectRoot,'.env'),'utf8');}
  catch(error){if(error.code==='ENOENT')return;throw error;}
  for(const line of source.split(/\r?\n/)){
    const match=line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if(!match||line.trimStart().startsWith('#')||Object.hasOwn(env,match[1]))continue;
    let value=match[2];
    if((value.startsWith('"')&&value.endsWith('"'))||(value.startsWith("'")&&value.endsWith("'")))value=value.slice(1,-1);
    env[match[1]]=value;
  }
}
