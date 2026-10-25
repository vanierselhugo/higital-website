// Real local screenshots supplied for this case. The source files remain untouched.
const dondersImages = {
  homepage: {
    src: '/assets/donders-home.jpg',
    alt: 'Desktopweergave van de vernieuwde homepage van Donders Meubel met een grote bank, navigatie en rode collectieknop',
    width: 1600,
    height: 747
  },
  collection: {
    src: '/assets/donders-collectie.jpg',
    alt: 'Collectiepagina van Donders Meubel met meubelcategorieën en een raster van producten',
    width: 1600,
    height: 726
  },
  product: {
    src: '/assets/donders-product.jpg',
    alt: 'Productpagina van Donders Meubel met foto, prijs en uitgebreide informatie over een bankstel',
    width: 1600,
    height: 772
  },
  mobile: {
    src: '/assets/donders-home-mobiel.jpg',
    alt: 'Mobiele weergave van de Donders Meubel homepage met meubelfotografie en knoppen naar de collectie en showroom',
    width: 444,
    height: 672,
    className: 'project-photo--mobile'
  }
};

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
    externalLinkLabel: 'Bekijk de website van Donders Meubel',
    externalNote: 'De nieuwe website is nog in afronding. Bekijk alvast de demo van het ontwerp.',
    metaTitle: 'Donders Meubel website redesign in Tilburg',
    metaDescription: 'Bekijk hoe Higital de website van Donders Meubel in Tilburg vernieuwde, met een overzichtelijke collectie en aandacht voor persoonlijk advies.',
    heroEyebrow: 'KLANTVERHAAL / WEBDESIGN / TILBURG',
    headline: 'Een nieuwe uitstraling voor een vertrouwde meubelzaak.',
    summary: 'Al sinds 1985 helpt Donders Meubel klanten bij het vinden van meubels die écht bij ze passen. Higital vertaalde die persoonlijke aanpak naar een moderne, overzichtelijke website waarin de collectie en de winkel centraal staan.',
    homepageCategory: 'Website redesign · Tilburg',
    homepageSummary: 'Een compleet vernieuwde website voor een vertrouwde meubelzaak in Tilburg. Met een frisse uitstraling, overzichtelijke collectie en aandacht voor persoonlijk advies.',
    serviceLabel: 'Webdesign & webontwikkeling',
    hero: dondersImages.homepage,
    heroFit: 'contain',
    customer: 'Donders Meubel is een meubelzaak in Tilburg die sinds 1985 bestaat. De winkel staat voor persoonlijk advies, zitcomfort en meubels die aansluiten bij de wensen van de klant.',
    challenge: 'De bestaande website was verouderd en sloot qua uitstraling en gebruiksgemak niet meer goed aan bij de winkel. De vernieuwde site moest bezoekers helpen zich online te oriënteren en tegelijk duidelijk maken wat ze in de showroom kunnen verwachten.',
    approach: 'De collectie, productinformatie, showroom en persoonlijke service kregen elk een duidelijke plek in de nieuwe website.',
    approachItems: [
      'Een vernieuwde, professionele uitstraling.',
      'Een overzichtelijke navigatie.',
      'Een duidelijke presentatie van de meubelcollectie.',
      'Ruimte voor individuele producten en meubelinformatie.',
      'Een aparte pagina voor opruimingsproducten.',
      'Meer aandacht voor de showroom en persoonlijk advies.',
      'Een responsive ontwerp voor desktop en mobiel.'
    ],
    result: 'Het resultaat is een moderne en overzichtelijke website die beter aansluit bij de uitstraling van Donders Meubel. Bezoekers kunnen door meubelcategorieën bladeren, producten bekijken en informatie vinden over de showroom.',
    design: 'Warme meubelfotografie krijgt de ruimte. Rode accenten sluiten aan op Donders Meubel en de indeling helpt bezoekers collectie en productinformatie te verkennen.',
    services: ['Website redesign', 'Webontwikkeling', 'Responsive ontwerp'],
    screenshots: [dondersImages.collection,dondersImages.product,dondersImages.mobile],
    storySections: [
      {
        type: 'intro',
        title: 'Een meubelzaak met een verhaal.',
        body: 'Sinds 1985 helpt Donders Meubel mensen in Tilburg bij het kiezen van meubels die passen bij hun huis en manier van leven.',
        support: 'Persoonlijk advies, zitcomfort en de showroom vormen een belangrijk deel van die ervaring. De website moest dat warme, persoonlijke karakter ook online laten voelen.'
      },
      {
        type: 'challenge',
        title: 'Een website die niet meer bij de winkel paste.',
        body: 'De bestaande website voelde verouderd en maakte het aanbod minder overzichtelijk. Aan een nieuwe bezoeker moest sneller duidelijk worden welke meubels er zijn en wat Donders Meubel in de showroom te bieden heeft.',
        support: 'Daarom lag de focus op een frisse uitstraling, duidelijke routes en ruimte om rustig door de collectie te kijken.'
      },
      {
        type: 'feature',
        title: 'De collectie verdient de hoofdrol.',
        body: 'De categorieën brengen bezoekers snel naar onder meer bankstellen, hoekbanken en relaxstoelen. Grote productbeelden en een heldere indeling geven de collectie de aandacht die past bij een meubelzaak.',
        image: dondersImages.collection,
        imageSide: 'left'
      },
      {
        type: 'feature',
        title: 'Ook de details maken het verschil.',
        body: 'Op de productpagina staan de foto’s, prijs en uitgebreide productinformatie overzichtelijk bij elkaar. Zo kunnen bezoekers rustig bekijken wat een meubel te bieden heeft en verder door de informatie navigeren.',
        image: dondersImages.product,
        imageSide: 'right'
      },
      {
        type: 'mobile',
        title: 'Van groot scherm tot smartphone.',
        body: 'De website is responsive opgebouwd. Op mobiel blijven de belangrijkste informatie en knoppen goed bereikbaar, terwijl de meubelfotografie het ontwerp blijft dragen.',
        image: dondersImages.mobile
      },
      {
        type: 'result',
        title: 'Een uitstraling die bij Donders Meubel past.',
        body: 'Het vernieuwde ontwerp brengt een moderne presentatie samen met de vertrouwde identiteit van Donders Meubel. Bezoekers kunnen de collectie ontdekken, productinformatie bekijken en meer lezen over de winkel en showroom.'
      }
    ],
    closingCta: {
      title: 'Ook een website die',
      emphasis: 'écht bij jouw bedrijf past?',
      body: 'Misschien is jouw website ook toe aan een frisse uitstraling. Ik denk graag met je mee en laat je met een gratis en vrijblijvend eerste concept zien wat er mogelijk is.',
      buttonLabel: 'Bekijk wat er mogelijk is',
      href: '/contact/'
    }
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
    const storyTypes=new Set(['intro','challenge','feature','mobile','result']);
    for(const section of project.storySections??[])if(!storyTypes.has(section.type)||!section.title||!(section.body||section.support))throw new Error(`Project ${project.slug}: invalid story section.`);
    for(const photo of [project.hero,...(project.screenshots??[]),...(project.storySections??[]).map(section=>section.image).filter(Boolean)]) {
      if(!photo||!/^\/assets\/[a-zA-Z0-9/_-]+\.(jpg|png|webp|avif)$/.test(photo.src)||!photo.alt||!(photo.width>0)||!(photo.height>0))throw new Error(`Project ${project.slug}: invalid image or missing alt/dimensions.`);
    }
  }
  return published;
}
