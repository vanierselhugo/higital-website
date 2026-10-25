// A non-modal disclosure: visitors retain normal access to the page and its links.
export function createContactController({panel,trigger,closeButton,reduced,onChange=()=>{},setTimer=setTimeout,clearTimer=clearTimeout}) {
  let isOpen=false,timer=null;
  function open(){
    clearTimer(timer);isOpen=true;panel.hidden=false;panel.inert=false;
    panel.dataset.state='open';trigger.setAttribute('aria-expanded','true');
    onChange(true);closeButton.focus({preventScroll:true});
  }
  function close({returnFocus=false,immediate=false}={}){
    if(!isOpen&&panel.hidden)return;
    clearTimer(timer);isOpen=false;panel.inert=true;trigger.setAttribute('aria-expanded','false');
    if(returnFocus)trigger.focus({preventScroll:true});
    const finish=()=>{panel.hidden=true;panel.dataset.state='closed';timer=null;};
    panel.dataset.state='closing';onChange(false);
    if(immediate||reduced.matches)finish();else timer=setTimer(finish,180);
  }
  function toggle(){if(isOpen)close({returnFocus:true});else open();}
  function keydown(event){if(event.key==='Escape'&&isOpen){event.preventDefault();close({returnFocus:true});}}
  function settleMotion(){if(reduced.matches&&!isOpen){clearTimer(timer);panel.hidden=true;panel.dataset.state='closed';}}
  return {open,close,toggle,keydown,settleMotion,get isOpen(){return isOpen;}};
}

export function rectanglesOverlap(a,b,gap=8){
  return b.width>0&&b.height>0&&a.left<b.right+gap&&a.right>b.left-gap&&a.top<b.bottom+gap&&a.bottom>b.top-gap;
}
export function shouldSuppressWidget({menuOpen,mobile,formFocused,keyboardOpen,widgetFocused,panelOpen,widgetRect,controls=[]}){
  if(menuOpen)return true;
  if(panelOpen||widgetFocused||!mobile)return false;
  return formFocused||keyboardOpen||controls.some(rect=>rectanglesOverlap(widgetRect,rect));
}

export function initContactWidget(doc=document,win=window){
  const widget=doc.querySelector('[data-contact-widget]');if(!widget)return;
  // The initial anchor is a usable Contact link without JavaScript.
  const fallback=widget.querySelector('[data-contact-trigger]');
  const trigger=doc.createElement('button');trigger.type='button';trigger.className=fallback.className;
  trigger.innerHTML=fallback.innerHTML;trigger.setAttribute('aria-label',fallback.getAttribute('aria-label'));
  trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','contact-panel');trigger.setAttribute('aria-haspopup','dialog');
  fallback.replaceWith(trigger);
  const panel=widget.querySelector('.contact-panel');const closeButton=widget.querySelector('.contact-close');
  const reduced=win.matchMedia('(prefers-reduced-motion: reduce)');const mobile=win.matchMedia('(max-width:700px)');
  let scheduled=false;
  const controls=[...doc.querySelectorAll('main a,main button,main input,main select,main textarea,main summary,main .process-steps>li,footer a,footer button')];
  const controller=createContactController({panel,trigger,closeButton,reduced,onChange:open=>{widget.dataset.open=String(open);if(open){widget.dataset.suppressed='false';widget.inert=false;}schedule();}});
  trigger.addEventListener('click',controller.toggle);
  closeButton.addEventListener('click',()=>controller.close({returnFocus:true}));
  doc.addEventListener('keydown',controller.keydown);
  doc.addEventListener('pointerdown',event=>{if(controller.isOpen&&!widget.contains(event.target))controller.close();});
  doc.addEventListener('focusin',event=>{if(controller.isOpen&&!widget.contains(event.target))controller.close();schedule();});
  doc.addEventListener('focusout',schedule);
  doc.addEventListener('higital:menu',event=>{if(event.detail.open)controller.close({immediate:true});schedule();});
  reduced.addEventListener('change',controller.settleMotion);
  function update(){
    scheduled=false;
    const active=doc.activeElement;
    const focused=widget.contains(active);
    const field=Boolean(active?.matches('input,textarea,select,[contenteditable="true"]'));
    const keyboard=Boolean(win.visualViewport&&win.innerHeight-win.visualViewport.height>150);
    const isMobile=mobile.matches;
    const suppress=shouldSuppressWidget({menuOpen:doc.body.classList.contains('menu-open'),mobile:isMobile,formFocused:field,keyboardOpen:keyboard,widgetFocused:focused,panelOpen:controller.isOpen,widgetRect:trigger.getBoundingClientRect(),controls:isMobile&&!focused&&!controller.isOpen?controls.filter(el=>!el.disabled&&el.getClientRects().length&&win.getComputedStyle(el).visibility!=='hidden').map(el=>el.getBoundingClientRect()):[]});
    widget.dataset.suppressed=String(suppress);widget.inert=suppress;
  }
  function schedule(){if(!scheduled){scheduled=true;win.requestAnimationFrame(update);}}
  win.addEventListener('scroll',schedule,{passive:true});win.addEventListener('resize',schedule,{passive:true});
  win.visualViewport?.addEventListener('resize',schedule,{passive:true});mobile.addEventListener('change',schedule);
  widget.dataset.enhanced='true';schedule();
  return controller;
}

export function initExampleChat(doc=document,win=window){
  const example=doc.querySelector('[data-chat-example]');if(!example)return;
  const reduced=win.matchMedia('(prefers-reduced-motion: reduce)');
  // No hidden content is applied before intersection: fallback and screen readers
  // receive the complete conversation immediately, without live announcements.
  if(reduced.matches||!('IntersectionObserver' in win))return;
  let played=false;
  const observer=new win.IntersectionObserver(entries=>{
    if(played||!entries.some(entry=>entry.isIntersecting))return;
    played=true;observer.disconnect();if(!reduced.matches)example.classList.add('chat-playing');
  },{threshold:.18});
  observer.observe(example);
  reduced.addEventListener('change',()=>{if(reduced.matches){example.classList.remove('chat-playing');observer.disconnect();played=true;}});
}
if(typeof document!=='undefined'){initContactWidget();initExampleChat();}
