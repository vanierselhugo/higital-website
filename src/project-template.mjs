import {esc,link,button,cta} from './components.mjs';

const photo=(asset,hero=false)=>`<figure class="project-photo" data-reveal="clip"><img src="${esc(asset.src)}" alt="${esc(asset.alt)}" width="${Number(asset.width)}" height="${Number(asset.height)}" ${hero?'fetchpriority="high"':'loading="lazy"'} decoding="async">${asset.caption?`<figcaption>${esc(asset.caption)}</figcaption>`:''}</figure>`;

export function projectCard(project) {
  return `<article class="portfolio-card" data-reveal="rise"><a href="/ons-werk/${esc(project.slug)}/" aria-label="Bekijk het project ${esc(project.name)}"><div class="portfolio-image"><img src="${esc(project.hero.src)}" alt="${esc(project.hero.alt)}" width="${Number(project.hero.width)}" height="${Number(project.hero.height)}" loading="lazy" decoding="async"><span class="project-view">Bekijk het verhaal</span></div><div class="portfolio-caption"><div><h2>${esc(project.name)}</h2><span>${esc(project.company)}</span></div><p>${esc(project.summary)}</p></div></a></article>`;
}

export function projectDetail(project) {
  return `<article class="project-detail"><div class="case-back wrap">${link('Terug naar ons werk','/ons-werk/')}</div><header class="project-intro wrap"><p>${esc(project.company)}</p><h1 data-reveal="lines">${esc(project.name)}</h1><div class="project-lead"><p>${esc(project.summary)}</p>${project.services?.length?`<ul aria-label="Werkzaamheden">${project.services.map(s=>`<li>${esc(s)}</li>`).join('')}</ul>`:''}</div></header><div class="project-hero wrap">${photo(project.hero,true)}</div><section class="project-story wrap section-pad"><h2>De uitdaging.</h2><p>${esc(project.challenge)}</p></section><section class="project-story project-approach wrap"><h2>De aanpak.</h2><p>${esc(project.approach)}</p></section><section class="project-design wrap section-pad"><div class="section-heading"><h2>Het ontwerp.</h2><p>${esc(project.design)}</p></div><div class="project-gallery">${(project.screenshots??[]).map(asset=>photo(asset)).join('')}</div></section><div class="project-return wrap">${button('Bekijk alle projecten','/ons-werk/','button-outline')}</div></article>${cta()}`;
}
