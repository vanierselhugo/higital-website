import {button,link} from './components.mjs';

// Only the homepage uses this composition. The supplied project captures stay intact.
export function homeHero(){return `<section class="home-hero tone-dark" aria-labelledby="home-hero-title">
  <div class="wrap">
    <div class="home-hero-content">
      <h1 id="home-hero-title" class="home-hero-title"><span>Een website die laat zien</span> <span>wat jouw bedrijf <em>waard is.</em></span></h1>
      <p class="home-hero-subtitle">Jouw bedrijf. Jouw verhaal.<br> Een website die daarbij past.</p>
      <p class="home-hero-description">Van een professionele website voor starters tot een compleet ontwerp op maat. Higital bouwt moderne websites die passen bij jouw bedrijf en jouw ambities.</p>
      <div class="home-hero-actions">${button('Bekijk websites & prijzen','/websites-prijzen/','button-navy')}${link('Vraag een gratis websiteconcept aan','/contact/')}</div>
      <a class="home-hero-price" href="/websites-prijzen/">Websites vanaf <strong>€ 499</strong><span>eenmalig, excl. btw </span></a>
    </div>
    <div class="home-hero-showcase">
      <div class="home-hero-backplate" aria-hidden="true"></div>
      <figure class="home-hero-browser">
        <div class="home-hero-toolbar" aria-hidden="true"><span class="home-hero-dots"><i></i><i></i><i></i></span><span class="home-hero-address">Donders Meubel</span><span class="home-hero-window-icon"></span></div>
        <img src="/assets/donders-home.jpg" srcset="/assets/donders-home-800.jpg 800w, /assets/donders-home-1200.jpg 1200w, /assets/donders-home.jpg 1600w" sizes="(max-width: 600px) 82vw, (max-width: 1288px) 77vw, 998px" alt="De website van Donders Meubel op desktop, ontworpen door Higital" width="1600" height="747" fetchpriority="high" decoding="async">
      </figure>
      <figure class="home-hero-phone">
        <span class="home-hero-speaker" aria-hidden="true"></span>
        <img src="/assets/donders-home-mobiel.jpg" srcset="/assets/donders-home-mobiel-222.jpg 222w, /assets/donders-home-mobiel.jpg 444w" sizes="(max-width: 600px) 25vw, (max-width: 1000px) 20vw, (max-width: 1288px) 18vw, 210px" alt="Dezelfde website van Donders Meubel op mobiel" width="444" height="672" decoding="async">
        <span class="home-hero-home-indicator" aria-hidden="true"></span>
      </figure>
    </div>
  </div>
</section>`;}
