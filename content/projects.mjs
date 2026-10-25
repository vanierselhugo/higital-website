// Only projects explicitly marked published appear in the site and production build.
export const projects = [
  {
    published: true,
    slug: 'donders-meubel',
    name: 'Donders Meubel',
    company: 'Donders Meubel',
    category: 'Website redesign · Webontwikkeling',
    location: 'Tilburg',
    status: 'In afronding',
    externalUrl: 'https://demo.higital.nl/',
    metaTitle: 'Donders Meubel website redesign in Tilburg',
    metaDescription: 'Bekijk hoe Higital de website van Donders Meubel in Tilburg vernieuwde, met een overzichtelijke collectie en aandacht voor persoonlijk advies.',
    headline: 'Een frisse online uitstraling voor Donders Meubel.',
    summary: 'Voor Donders Meubel in Tilburg ontwierp Higital een compleet vernieuwde website, waarbij de collectie, persoonlijke service en jarenlange ervaring centraal staan.',
    customer: 'Donders Meubel is een meubelzaak in Tilburg. De winkel bestaat sinds 1985 en staat voor persoonlijk advies, zitcomfort en meubels die aansluiten bij de wensen van de klant.',
    challenge: 'De bestaande website was verouderd en sloot qua uitstraling en gebruiksgemak niet meer goed aan bij het bedrijf. De uitdaging was om een moderne, overzichtelijke website te ontwerpen die beter laat zien wat Donders Meubel te bieden heeft.',
    approach: 'De vernieuwde website brengt de collectie en de persoonlijke service van Donders Meubel samen in een heldere presentatie.',
    approachItems: [
      'Een vernieuwde, professionele uitstraling.',
      'Een overzichtelijke navigatie.',
      'Een duidelijke presentatie van de meubelcollectie.',
      'Ruimte voor individuele producten en meubelinformatie.',
      'Een aparte pagina voor opruimingsproducten.',
      'Meer aandacht voor de showroom en persoonlijk advies.',
      'Een responsive ontwerp voor desktop en mobiel.'
    ],
    result: 'Het resultaat is een moderne en overzichtelijke website die beter aansluit bij de uitstraling van Donders Meubel. Bezoekers kunnen eenvoudig door de meubelcategorieën bladeren, producten ontdekken en informatie vinden over de showroom.',
    design: 'De warme fotografie van de meubels krijgt de ruimte. Rode accenten sluiten aan bij de uitstraling van Donders Meubel, terwijl de indeling bezoekers helpt de collectie en productinformatie te verkennen.',
    services: ['Website redesign', 'Webontwikkeling', 'Responsive ontwerp'],
    heroFit: 'contain',
    hero: {
      src: '/assets/donders-home.jpg',
      alt: 'Desktopweergave van de vernieuwde homepage van Donders Meubel met een grote bank, navigatie en rode collectieknop',
      width: 1600,
      height: 747,
      caption: 'De vernieuwde homepage van Donders Meubel.'
    },
    screenshots: [
      {
        src: '/assets/donders-collectie.jpg',
        alt: 'Collectiepagina van Donders Meubel met categorieën en een raster van meubels',
        width: 1600,
        height: 726,
        caption: 'De collectie brengt categorieën en meubels overzichtelijk bij elkaar.'
      },
      {
        src: '/assets/donders-product.jpg',
        alt: 'Productpagina van Donders Meubel met productfoto, prijs en uitgebreide informatie over een bankstel',
        width: 1600,
        height: 772,
        caption: 'Productinformatie krijgt naast de fotografie een duidelijke plek.'
      },
      {
        src: '/assets/donders-home-mobiel.jpg',
        alt: 'Mobiele weergave van de Donders Meubel homepage met meubelfotografie en twee duidelijke knoppen',
        width: 444,
        height: 672,
        caption: 'De homepage op mobiel, met de collectie en showroom direct in beeld.',
        className: 'project-photo--mobile'
      }
    ]
  }
];

export function publishedProjects(items=projects) {
  const published=items.filter(project=>project.published===true);
  const slugs=new Set();
  for (const project of published) {
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)||slugs.has(project.slug)) throw new Error('Each project needs a unique, valid slug.');
    slugs.add(project.slug);
    for(const field of ['name','company','summary','challenge','approach','design']) {
      if(typeof project[field]!=='string'||!project[field].trim())throw new Error(`Project ${project.slug}: missing ${field}.`);
    }
    if(project.externalUrl&&!/^https:\/\//i.test(project.externalUrl))throw new Error(`Project ${project.slug}: external project links must use HTTPS.`);
    for(const photo of [project.hero,...(project.screenshots??[])]) {
      if(!photo||!/^\/assets\/[a-zA-Z0-9/_-]+\.(jpg|png|webp|avif)$/.test(photo.src)||!photo.alt||!(photo.width>0)||!(photo.height>0))throw new Error(`Project ${project.slug}: invalid image or missing alt/dimensions.`);
    }
  }
  return published;
}
