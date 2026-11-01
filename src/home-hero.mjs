import {button,link} from './components.mjs';

// Brand composition only; client projects remain in the portfolio.
export function homeHero(){return `<section class="home-hero tone-dark" aria-labelledby="home-hero-title">
  <div class="home-hero-art" aria-hidden="true"><span class="hero-plane hero-plane-left"></span><span class="hero-plane hero-plane-right"></span><span class="hero-rule"></span></div>
  <div class="wrap">
    <div class="home-hero-content">
      <h1 id="home-hero-title" class="home-hero-title"><span>Een website die laat zien</span> <span>wat jouw bedrijf <em>waard is.</em></span></h1>
      <p class="home-hero-subtitle">Jouw bedrijf. Jouw verhaal.<br> Een website die daarbij past.</p>
      <p class="home-hero-description">Van een professionele website voor starters tot een compleet ontwerp op maat. Higital bouwt moderne websites die passen bij jouw bedrijf en jouw ambities.</p>
      <div class="home-hero-actions">${button('Bekijk websites & prijzen','/websites-prijzen/','button-navy')}${link('Vraag een gratis websiteconcept aan','/contact/')}</div>
      <a class="home-hero-price" href="/websites-prijzen/">Websites vanaf <strong>€ 499</strong><span>eenmalig, excl. btw </span></a>
    </div>
  </div>
</section>`;}
