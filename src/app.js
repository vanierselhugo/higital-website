(() => {
  'use strict';
  const root=document.documentElement;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  const motionEnabled=()=>!reduced.matches;
  const header=document.querySelector('.site-header');
  const menu=document.querySelector('#site-menu');
  const menuButton=document.querySelector('.menu-toggle');
  const hero=document.querySelector('[data-hero-art]');
  const magnets=[...document.querySelectorAll('[data-magnetic]')];
  const processes=[...document.querySelectorAll('[data-process]')].map(section=>({
    section,steps:[...section.querySelectorAll('[data-step]')],number:section.querySelector('[data-step-number]'),bar:section.querySelector('.process-progress span')
  }));
  let ticking=false,closeTimer;
  function setMotion(){
    root.dataset.motion=motionEnabled()?'on':'off';
    if(!motionEnabled()){magnets.forEach(el=>el.style.transform='');if(hero)hero.style.transform='';}
    schedule();
  }
  reduced.addEventListener('change',setMotion);
  fine.addEventListener('change',()=>{magnets.forEach(el=>el.style.transform='');if(hero)hero.style.transform='';schedule();});

  function closeMenu(focus=false){
    clearTimeout(closeTimer);
    menuButton.setAttribute('aria-expanded','false');menuButton.querySelector('.menu-label').textContent='Menu';
    document.querySelector('main').inert=false;document.querySelector('footer').inert=false;
    if(focus)menuButton.focus();
    document.dispatchEvent(new CustomEvent('higital:menu',{detail:{open:false}}));
    const finish=()=>{menu.hidden=true;menu.classList.remove('is-closing');document.body.classList.remove('menu-open');};
    if(motionEnabled()&&!menu.hidden){menu.inert=true;menu.classList.add('is-closing');closeTimer=setTimeout(finish,180);}else finish();
  }
  menuButton.addEventListener('click',()=>{
    if(menuButton.getAttribute('aria-expanded')==='true'){closeMenu(true);return;}
    clearTimeout(closeTimer);menu.classList.remove('is-closing');menu.inert=false;menu.hidden=false;
    menuButton.setAttribute('aria-expanded','true');menuButton.querySelector('.menu-label').textContent='Sluiten';
    document.body.classList.add('menu-open');document.querySelector('main').inert=true;document.querySelector('footer').inert=true;
    menu.querySelector('a').focus();
    document.dispatchEvent(new CustomEvent('higital:menu',{detail:{open:true}}));
  });
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
  document.addEventListener('keydown',event=>{
    if(menu.hidden||menu.inert)return;
    if(event.key==='Escape'){closeMenu(true);return;}
    if(event.key==='Tab'){
      const nodes=[menuButton,...menu.querySelectorAll('a')];const at=nodes.indexOf(document.activeElement);
      if(event.shiftKey&&at<=0){event.preventDefault();nodes.at(-1).focus();}
      else if(!event.shiftKey&&(at===nodes.length-1||at===-1)){event.preventDefault();nodes[0].focus();}
    }
  });
  matchMedia('(min-width:1001px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
  magnets.forEach(button=>{
    button.addEventListener('pointermove',event=>{
      if(!motionEnabled()||!fine.matches)return;
      const rect=button.getBoundingClientRect();
      const x=Math.max(-3,Math.min(3,(event.clientX-rect.left-rect.width/2)*.045));
      const y=Math.max(-2,Math.min(2,(event.clientY-rect.top-rect.height/2)*.08));
      button.style.transform='translate('+x+'px,'+y+'px)';
    });
    button.addEventListener('pointerleave',()=>button.style.transform='');
    button.addEventListener('blur',()=>button.style.transform='');
  });
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
    },{threshold:.08});
    document.querySelectorAll('[data-reveal]').forEach(el=>{observer.observe(el);el.classList.add('reveal-ready');});
  }
  function updateScroll(){
    ticking=false;header.classList.toggle('scrolled',window.scrollY>35);
    if(hero){
      hero.style.transform=motionEnabled()&&fine.matches&&window.innerWidth>700?'translateY('+Math.min(window.scrollY*.025,12)+'px)':'';
    }
    for(const {steps,number,bar} of processes){
      let active=0;steps.forEach((step,i)=>{if(step.getBoundingClientRect().top<window.innerHeight*.55)active=i;});
      steps.forEach((step,i)=>step.classList.toggle('is-current',active===i));
      number.textContent=String(active+1).padStart(2,'0');bar.style.transform='scaleX('+((active+1)/steps.length)+')';
    }
  }
  function schedule(){if(!ticking){ticking=true;requestAnimationFrame(updateScroll);}}
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});setMotion();
  const form=document.querySelector('#contact-form');
  if(form){
    const selected=new URLSearchParams(location.search).get('pakket');if(globalThis.HigitalForm.allowedPackages.includes(selected))form.elements.package.value=selected;
    const contexts={start:'Higital Start · € 499 excl. btw · tot 5 pagina’s',business:'Higital Business · € 999 excl. btw · tot 12 pagina’s',premium:'Higital Premium · vanaf € 1.799 excl. btw · tot 25 pagina’s als uitgangspunt','care-basic':'Care Basic · € 24,95 per maand excl. btw','care-plus':'Care Plus · € 49,95 per maand excl. btw'};
    const updatePackage=()=>document.querySelector('#package-context').textContent=contexts[form.elements.package.value]||'';form.elements.package.addEventListener('change',updatePackage);updatePackage();
    const summary=document.querySelector('#form-errors'),result=document.querySelector('#form-result'),submit=form.querySelector('[type="submit"]');
    const showErrors=errors=>{const list=summary.querySelector('ul');list.textContent='';[...form.querySelectorAll('[aria-invalid]')].forEach(el=>el.removeAttribute('aria-invalid'));form.querySelectorAll('.field-error').forEach(el=>el.textContent='');for(const [name,message] of Object.entries(errors)){const field=form.elements[name];if(field)field.setAttribute('aria-invalid','true');const error=document.querySelector(`#${name}-error`);if(error)error.textContent=message;const li=document.createElement('li');const a=document.createElement('a');a.href='#'+name;a.textContent=message;a.addEventListener('click',e=>{e.preventDefault();field?.focus();});li.append(a);list.append(li);}summary.hidden=!Object.keys(errors).length;if(!summary.hidden)summary.focus();};
    form.addEventListener('submit',async event=>{
      event.preventDefault();const data=Object.fromEntries(new FormData(form));const errors=globalThis.HigitalForm.validate(data);result.hidden=true;result.classList.remove('is-error');
      if(Object.keys(errors).length){showErrors(errors);return;}
      summary.hidden=true;[...form.querySelectorAll('[aria-invalid]')].forEach(el=>el.removeAttribute('aria-invalid'));form.querySelectorAll('.field-error').forEach(el=>el.textContent='');
      submit.disabled=true;submit.querySelector('span').textContent='Versturen…';
      try{
        const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)});
        const payload=await response.json().catch(()=>({}));
        if(!response.ok||payload.ok!==true){if(payload.fields)showErrors(payload.fields);result.textContent=payload.error||'Versturen is niet bevestigd. Probeer het opnieuw of mail naar info@higital.nl.';result.classList.add('is-error');result.hidden=false;result.focus();return;}
        result.textContent=payload.message||'Bedankt. Je aanvraag is verstuurd. Hugo neemt contact met je op.';result.classList.remove('is-error');result.hidden=false;form.reset();updatePackage();result.focus();
      }catch{result.textContent='Versturen is niet bevestigd. Probeer het opnieuw of mail naar info@higital.nl.';result.classList.add('is-error');result.hidden=false;result.focus();}
      finally{submit.disabled=false;submit.querySelector('span').textContent='Verstuur aanvraag';}
    });
  }
  window.addEventListener('pageshow',event=>{if(event.persisted&&form)form.reset();});
})();
