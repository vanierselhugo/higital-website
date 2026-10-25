import {esc,link,button} from './components.mjs';

const photo=(asset,hero=false)=>`<figure class="project-photo ${esc(asset.className??'')}" data-reveal="clip"><img src="${esc(asset.src)}" alt="${esc(asset.alt)}" width="${Number(asset.width)}" height="${Number(asset.height)}" ${hero?'fetchpriority="high"':'loading="lazy"'} decoding="async">${asset.caption?`<figcaption>${esc(asset.caption)}</figcaption>`:''}</figure>`;

function projectCard(project) {
  return `<article class="portfolio-card project-card" data-reveal="rise"><a href="/ons-werk/${esc(project.slug)}/" aria-label="Bekijk het project ${esc(project.name)}"><div class="portfolio-image ${project.heroFit==='contain'?'project-image--contain':''}"><img src="${esc(project.hero.src)}" alt="${esc(project.hero.alt)}" width="${Number(project.hero.width)}" height="${Number(project.hero.height)}" loading="lazy" decoding="async"><span class="project-view">Bekijk het project</span></div><div class="portfolio-caption"><div><h2>${esc(project.name)}</h2><span>${esc(project.location??project.company)}</span>${project.status?`<span class="project-status">${esc(project.status)}</span>`:''}</div><p>${esc(project.summary)}</p><ul class="project-card-tags" aria-label="Projectcategorieën">${[project.category].filter(Boolean).map(tag=>`<li>${esc(tag)}</li>`).join('')}</ul></div></a></article>`;
}

function browserPreview(asset){
  return `<div class="case-browser" data-reveal="clip"><div class="case-browser-bar" aria-hidden="true"><span class="case-browser-dots"><i></i><i></i><i></i></span><span class="case-browser-address">demo.higital.nl</span><span class="case-browser-spacer"></span></div>${photo(asset,true)}</div>`;
}

function storySection(section,index){
  const title=esc(section.title??'');
  const body=section.body?`<p>${esc(section.body)}</p>`:'';
  const support=section.support?`<p>${esc(section.support)}</p>`:'';
  if(section.type==='intro')return `<section class="case-story case-story--intro" aria-labelledby="case-section-${index}"><div class="wrap"><h2 id="case-section-${index}">${title}</h2><div>${body}${support}</div></div></section>`;
  if(section.type==='challenge')return `<section class="case-story case-story--challenge" aria-labelledby="case-section-${index}"><div class="wrap"><h2 id="case-section-${index}">${title}</h2><div>${body}${support}</div></div></section>`;
  if(section.type==='feature'&&section.image)return `<section class="case-story case-story--feature case-story--image-${section.imageSide==='right'?'right':'left'}" aria-labelledby="case-section-${index}"><div class="wrap"><div class="case-story-copy"><h2 id="case-section-${index}">${title}</h2>${body}${support}</div>${photo(section.image)}</div></section>`;
  if(section.type==='mobile'&&section.image)return `<section class="case-story case-story--mobile" aria-labelledby="case-section-${index}"><div class="wrap"><div class="case-story-copy"><h2 id="case-section-${index}">${title}</h2>${body}${support}</div><div class="case-phone"><span class="case-phone-speaker" aria-hidden="true"></span>${photo(section.image)}</div></div></section>`;
  if(section.type==='result')return `<section class="case-story case-story--result" aria-labelledby="case-section-${index}"><div class="wrap"><h2 id="case-section-${index}">${title}</h2>${body}${support}</div></section>`;
  return '';
}

function defaultStory(project){
  return `${project.customer?`<section class="project-story project-customer wrap section-pad"><h2>Over de klant.</h2><p>${esc(project.customer)}</p></section>`:''}<section class="project-story wrap section-pad"><h2>De uitdaging.</h2><p>${esc(project.challenge)}</p></section><section class="project-story project-approach wrap section-pad"><h2>De aanpak.</h2><div><p>${esc(project.approach)}</p>${project.approachItems?.length?`<ul class="project-approach-list">${project.approachItems.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`:''}</div></section>${project.result?`<section class="project-result wrap section-pad"><h2>Het resultaat.</h2><p>${esc(project.result)}</p></section>`:''}<section class="project-design wrap section-pad"><div class="section-heading"><h2>Het ontwerp.</h2><p>${esc(project.design)}</p></div><div class="project-gallery">${(project.screenshots??[]).map(asset=>photo(asset)).join('')}</div></section>`;
}

export function projectDetail(project) {
  const meta=[['Klant',project.company],['Locatie',project.location],['Diensten',project.serviceLabel??project.category],['Status',project.status]].filter(([,value])=>value);
  const metadata=meta.map(([label,value])=>`<div><dt>${esc(label)}</dt><dd>${label==='Status'?`<span class="case-status">${esc(value)}</span>`:esc(value)}</dd></div>`).join('');
  const external=project.externalUrl?`<div class="case-external"><a class="case-external-link" href="${esc(project.externalUrl)}" target="_blank" rel="noopener noreferrer">${esc(project.externalLinkLabel??'Bekijk de website')}</a>${project.externalNote?`<p>${esc(project.externalNote)}</p>`:''}</div>`:'';
  const story=project.storySections?.length?project.storySections.map(storySection).join(''):defaultStory(project);
  const finalCta=project.closingCta??{};
  return `<article class="project-detail project-case"><section class="project-case-hero tone-dark"><div class="case-back wrap">${link('Terug naar ons werk','/ons-werk/')}</div><header class="project-intro wrap"><p class="project-kicker">${esc(project.heroEyebrow??`KLANTVERHAAL / ${project.category??'WEBDESIGN'} / ${project.location??''}`)}</p><h1 data-reveal="lines">${esc(project.headline??project.name)}</h1><div class="project-lead"><p>${esc(project.summary)}</p><div class="project-lead-meta">${external}</div></div><dl class="case-meta">${metadata}</dl></header><div class="project-hero wrap">${browserPreview(project.hero)}</div></section>${story}<div class="project-return wrap">${link('Terug naar alle projecten','/ons-werk/')}</div><section class="project-cta tone-dark"><div class="wrap"><h2>${esc(finalCta.title??'Ook toe aan een website die')}<br><em>${esc(finalCta.emphasis??'beter bij jouw bedrijf past?')}</em></h2><p>${esc(finalCta.body??'Vertel me wat je voor ogen hebt. Ik denk graag met je mee.')}</p>${button(finalCta.buttonLabel??'Vraag een gratis websiteconcept aan',finalCta.href??'/contact/','button-light large-button')}</div></section></article>`;
}

export {projectCard};
