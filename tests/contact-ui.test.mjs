import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {pages} from '../src/pages.mjs';
import {esc} from '../src/components.mjs';
import {whatsappMessage,whatsappUrl,exampleMessages} from '../src/contact-components.mjs';
import {createContactController,shouldSuppressWidget,initExampleChat} from '../src/contact-ui.js';

function fixture(reduce=false){
  let focus=null,id=0;const timers=new Map();
  const panel={hidden:true,inert:true,dataset:{}};
  const trigger={attributes:{},setAttribute(name,value){this.attributes[name]=value;},focus(){focus='trigger';}};
  const closeButton={focus(){focus='close';}};const reduced={matches:reduce};
  const controller=createContactController({panel,trigger,closeButton,reduced,setTimer(fn){timers.set(++id,fn);return id;},clearTimer(key){timers.delete(key);}});
  return {controller,panel,trigger,reduced,timers,get focus(){return focus;},finish(){for(const fn of timers.values())fn();timers.clear();}};
}
test('widget opens only on request, closes with focus restoration, and has no stale closing timer',()=>{
  const f=fixture();assert.equal(f.panel.hidden,true);assert.equal(f.controller.isOpen,false);
  f.controller.toggle();assert.equal(f.controller.isOpen,true);assert.equal(f.panel.hidden,false);assert.equal(f.panel.inert,false);assert.equal(f.trigger.attributes['aria-expanded'],'true');assert.equal(f.focus,'close');
  f.controller.close({returnFocus:true});assert.equal(f.focus,'trigger');assert.equal(f.panel.inert,true);assert.equal(f.panel.dataset.state,'closing');assert.equal(f.panel.hidden,false);
  f.controller.open();f.finish();assert.equal(f.panel.hidden,false);assert.equal(f.panel.inert,false);assert.equal(f.controller.isOpen,true);
  f.controller.close();f.finish();assert.equal(f.panel.hidden,true);assert.equal(f.trigger.attributes['aria-expanded'],'false');
});
test('Escape closes and returns focus; reduced motion and menu close require no animation wait',()=>{
  const f=fixture();f.controller.open();let prevented=false;
  f.controller.keydown({key:'Escape',preventDefault(){prevented=true;}});assert.ok(prevented);assert.equal(f.focus,'trigger');f.finish();assert.equal(f.panel.hidden,true);
  f.controller.open();f.controller.close({immediate:true});assert.equal(f.panel.hidden,true);assert.equal(f.timers.size,0);
  const quiet=fixture(true);quiet.controller.open();quiet.controller.close({returnFocus:true});assert.equal(quiet.panel.hidden,true);assert.equal(quiet.timers.size,0);
  f.controller.open();f.controller.close();f.reduced.matches=true;f.controller.settleMotion();assert.equal(f.panel.hidden,true);assert.equal(f.timers.size,0);
});
test('mobile widget yields to fields, keyboard, menu and intersecting actions while its own panel stays usable',()=>{
  const base={menuOpen:false,mobile:true,formFocused:false,keyboardOpen:false,widgetFocused:false,panelOpen:false,widgetRect:{left:180,right:360,top:720,bottom:768},controls:[]};
  assert.equal(shouldSuppressWidget(base),false);
  for(const prop of ['formFocused','keyboardOpen','menuOpen'])assert.equal(shouldSuppressWidget({...base,[prop]:true}),true);
  const control={left:190,right:350,top:710,bottom:760,width:160,height:50};
  assert.equal(shouldSuppressWidget({...base,controls:[control]}),true);
  assert.equal(shouldSuppressWidget({...base,controls:[{...control,top:400,bottom:450}]}),false);
  assert.equal(shouldSuppressWidget({...base,controls:[{...control,width:0,height:0}]}),false);
  assert.equal(shouldSuppressWidget({...base,controls:[control],panelOpen:true}),false);
  assert.equal(shouldSuppressWidget({...base,controls:[control],widgetFocused:true}),false);
  assert.equal(shouldSuppressWidget({...base,menuOpen:true,panelOpen:true}),true);
});
function chatFixture({quiet=false,observer=true}={}){
  const classes=new Set();const example={classList:{add:s=>classes.add(s),remove:s=>classes.delete(s)}};
  const reduced={matches:quiet,listener:null,addEventListener(type,fn){this.listener=fn;}};
  let callback,observations=0,disconnects=0;
  const win={matchMedia:()=>reduced};
  if(observer)win.IntersectionObserver=class{constructor(fn){callback=fn;}observe(node){assert.equal(node,example);observations++;}disconnect(){disconnects++;}};
  initExampleChat({querySelector:()=>example},win);
  return {classes,reduced,fire:entries=>callback?.(entries),get observations(){return observations;},get disconnects(){return disconnects;}};
}
test('example conversation animates once on entering view; reduced motion and unsupported browsers remain static',()=>{
  const f=chatFixture();assert.equal(f.observations,1);assert.equal(f.classes.size,0);
  f.fire([{isIntersecting:false}]);assert.equal(f.classes.size,0);
  f.fire([{isIntersecting:true}]);assert.ok(f.classes.has('chat-playing'));assert.equal(f.disconnects,1);
  f.fire([{isIntersecting:true}]);assert.equal(f.disconnects,1);
  f.reduced.matches=true;f.reduced.listener();assert.equal(f.classes.size,0);
  assert.equal(chatFixture({quiet:true}).observations,0);assert.equal(chatFixture({observer:false}).observations,0);
});
test('all pages include one accessible widget with exact WhatsApp message and email; chat stays homepage-only',async()=>{
  assert.equal(new URL(whatsappUrl).hostname,'wa.me');assert.equal(new URL(whatsappUrl).pathname,'/31643880582');
  assert.equal(new URL(whatsappUrl).searchParams.get('text'),'Hoi Hugo! Ik heb je website bekeken en wil graag wat meer weten over een nieuwe website.');
  assert.equal(new URL(whatsappUrl).searchParams.get('text'),whatsappMessage);
  for(const [route] of pages){
    const html=await fs.readFile(new URL('../dist'+route+'index.html',import.meta.url),'utf8');
    assert.equal((html.match(/data-contact-widget/g)||[]).length,1,route);
    assert.ok(html.includes(whatsappUrl));assert.match(html,/href="mailto:info@higital.nl"/);
    assert.match(html,/role="dialog" aria-labelledby="contact-panel-title" aria-describedby="contact-panel-copy" hidden inert/);
    assert.match(html,/<a class="contact-trigger" href="\/contact\/"/);
    assert.match(html,/aria-label="Contactpaneel sluiten"/);assert.match(html,/type="module" src="\/assets\/contact-ui.js/);
    if(route==='/'){
      assert.match(html,/Illustratief voorbeeldgesprek\. Geen echte chat of klantreview\./);
      assert.equal((html.match(/class="chat-message /g)||[]).length,5);
      let previous=-1;for(const [,message] of exampleMessages){const index=html.indexOf(esc(message));assert.ok(index>previous);previous=index;}
      assert.ok(html.indexOf('personal-intro')<html.indexOf('direct-contact-section'));
      assert.doesNotMatch(html,/aria-live="(?:polite|assertive)"/);
    }else assert.doesNotMatch(html,/data-chat-example/);
  }
});
