# Contactwidget en voorbeeldgesprek

Deze uitbreiding bouwt voort op de bestaande kleuren, afgeronde vormen, typografie en animaties. Geen extra hoofdpagina’s of runtimepakketten.

## Widget

De widget staat buiten de footer op alle pagina’s. Een kleine eigen chatillustratie, donkerblauwe pillvorm en lichtblauw accent geven een herkenbare contactactie. Geen pijlen, automatische popup of pulserende aandachtseffecten.

Het HTML-uitgangspunt is een gewone Contact-link. JavaScript vervangt die door een echte button met `aria-expanded`, `aria-controls` en `aria-haspopup`. Het paneel is een benoemde niet-modale dialoog. Openen geeft de sluitknop focus. Sluiten via de knop of Escape geeft focus terug aan de trigger; buiten klikken of verder tabben sluit zonder focus van de gekozen pagina-inhoud af te nemen. Tijdens de sluitanimatie is het paneel inert. Snelle heropening annuleert een oude sluittimer.

WhatsApp: https://wa.me/31643880582 met een URL-gecodeerd `text`-argument:

‘Hoi Hugo! Ik heb je website bekeken en wil graag wat meer weten over een nieuwe website.’

E-mail: `mailto:info@higital.nl`. Beide acties zijn links; de website verstuurt zelf geen berichten. WhatsApp opent pas na de expliciete klik op de WhatsApp-optie.

## Mobiele ruimte

De triggertekst wordt ‘Even sparren?’. Het paneel past binnen de viewport, respecteert safe-area-insets en kan bij een laag scherm intern scrollen. Onder de footer is extra ruimte vrijgehouden. De widget verbergt tijdelijk bij het mobiele menu, formulierfocus, een zichtbaar schermtoetsenbord of overlap met links, knoppen en velden. Bij keyboardfocus op de widget blijft hij bedienbaar. Een bewust geopend paneel mag over de pagina staan en kan altijd worden gesloten.

De overlapcontrole draait maximaal één keer per animation frame op scroll/resize/focus en leest alleen zichtbare relevante controls. Op desktop wordt de widget niet vanwege paginaknop-overlap verborgen. Zonder JavaScript staat de mobiele fallback in de normale paginastroom.

## Voorbeeldgesprek

De nieuwe sectie staat op Home na de persoonlijke introductie. Die introductie is korter gemaakt om de nieuwe uitleg niet te herhalen. De chat gebruikt een eigen interface met Higital-blauwe antwoorden en warme lichte ondernemersberichten. Elke spreker is ook tekstueel benoemd.

Alle vijf berichten staan altijd in de HTML, met de zichtbare toelichting ‘Illustratief voorbeeldgesprek. Geen echte chat of klantreview.’ Er is geen `aria-live`: een schermlezer hoeft geen vertraagde berichten af te wachten. Bij binnenkomst in beeld animeert de reeks eenmalig, met circa 380 ms tussen de berichten. De volledige conversatie staat na ongeveer 2,1 seconden in beeld. Geen loop, nep-online-indicator of onbevestigde reactietijd.

De systeeminstelling voor minder beweging en browsers zonder de observer tonen alles direct. Als minder beweging tijdens de animatie wordt ingeschakeld, worden de effecten verwijderd en wordt de reeks niet opnieuw gestart.

## Inspiratie en controle

[DtchMedia](https://dtchmedia.com/) is via de webtool bestudeerd. Het korte dialoogvoorbeeld bij ‘Gewoon geregeld’ vormde samen met de aangeleverde briefing het uitgangspunt. Teksten, screenshots, vormgeving en commerciële toezeggingen van die bron zijn niet overgenomen. Er was geen schermopname als toegankelijk bestand bij deze opdracht beschikbaar en geen gekoppelde browser; specifieke visuele timing is daarom niet rechtstreeks beoordeeld.

Tests staan in `tests/contact-ui.test.mjs`. Ze dekken de linkinhoud, paneellogica, focusoverdracht, Escape, onderdrukking bij mobiele overlap en de eenmalige chatobserver. Fysieke mobiele en visuele browser-QA blijft nog nodig; zie `QA.md`.
