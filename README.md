# Higital 2.4 - contactformulier en publicatieteksten

Doorgewerkt in het bestaande Higital-project. De kleuren, typografie, vijf hoofdpagina’s, pakketten en bestaande motion-aanpak zijn behouden. Alleen lokaal gewerkt; niets gewijzigd op higital.nl.

## Openen en starten

Preview: **http://localhost:5173**

```powershell
Set-Location 'C:\Users\vanie\Documents\higital-website-2.0'
npm.cmd run dev
```

Geen installatie nodig. Laat het venster open; stop met Ctrl+C. `START-HIGITAL.cmd` werkt ook. Als de preview nog draait, kun je het adres direct openen. Voor een tweede server gebruik je `$env:PORT = '5174'` vóór het startcommando.

Na bronwijzigingen: `npm.cmd run build` en de browser verversen. Er is geen hot reload.

## Visuele verfijning 2.3

- De originele donkerblauwe kleur `#12275F` vormt nu de basis van header, hero, paginakoppen, portfolio, werkwijze en footer. Lichtblauw `#A6CFF7` blijft het accent; warm beige `#F1EEEA` en wit geven rust bij prijzen, fotografie en formulieren.
- Hero met grote lichte typografie, abstract websiteontwerp en direct zichtbare vanafprijs. Afgeronde sectieovergangen, pillknoppen, rustige hover-effecten en dezelfde bestaande animaties.
- De nieuwe echte werkfoto staat op Home en Over Higital. Het portret blijft op Over Higital. Werkfotoformaten van 600 en 1200 pixels laden via `srcset` (circa 26 en 77 kB).
- De chat heeft de heading ‘Korte lijntjes. Snel geregeld.’ en exact het aangeleverde gesprek over het aanpassen van foto's. Het blijft duidelijk een illustratie.
- Het portfolio blijft bewust leeg, met de bestaande herbruikbare projecttemplate. Geen fictieve of nog niet opgeleverde projecten.
- `content/site.mjs` is byte voor byte gelijk aan de back-up: prijzen, pakketinhoud, merkgegevens en navigatie zijn intact.

## Contactformulier 2.4

Het formulier controleert gegevens in de browser en op de server. Aanvragen gaan via Resend naar info@higital.nl. Alleen na bevestiging van Resend verschijnt een succesmelding. Zonder mailinstellingen meldt het formulier een fout en biedt het directe e-mail aan. Stel `.env` in op basis van `.env.example` en volg [PUBLICATIE-CHECKLIST.md](PUBLICATIE-CHECKLIST.md) voor hosting en privacy.

## Contactonderdelen

- Eén donkerblauwe, afgeronde contactwidget op alle pagina’s. Het paneel opent uitsluitend op verzoek.
- WhatsApp opent naar het bevestigde nummer met exact het aangeleverde bericht. De bezoeker verzendt het zelf in WhatsApp. De e-mailactie opent info@higital.nl.
- Duidelijke sluitknop, Escape, klik buiten het paneel en focusterugkeer. Het paneel is niet modaal; normale paginanavigatie blijft mogelijk. Bij focus buiten het paneel sluit het.
- Op desktop en mobiel: ‘Stel gerust je vraag’. De widget wijkt tijdelijk tijdens formulierinvoer, bij een zichtbaar schermtoetsenbord, een open mobiel menu of overlap met zichtbare links/knoppen. Er is extra ruimte onderaan de pagina.
- Na de persoonlijke introductie op Home: ‘Korte lijntjes. Snel geregeld.’ met het aangeleverde voorbeeldgesprek. De introductie erboven is ingekort.
- Eenmalige, korte chatreeks bij binnenkomst in beeld, circa 2,1 seconden. Alle berichten staan vooraf in HTML; geen echte chat, klantreview, typing-status of beschikbaarheidsbelofte.
- Zonder JavaScript is de widget een gewone Contact-link en is de hele chat leesbaar. Op mobiel staat die fallback in de normale paginastroom, zodat hij geen velden bedekt.
- Minder beweging via de systeeminstelling toont de chat direct en schakelt decoratieve paneel-/widgetanimaties uit.

Nieuwe bestanden: src/contact-components.mjs, src/contact-ui.js, src/contact.css en tests/contact-ui.test.mjs. Geen extra afhankelijkheden of pagina’s. Zie ook CONTACT-INTERACTIONS.md.

## Eerdere verfijning

- Alle beschikbare referentieafbeeldingen bekeken, inclusief de nieuw toegevoegde werkfoto.
- Echte portretfoto op Over Higital; werkfoto in de persoonlijke introductie en op Over Higital; telefoonfoto op Contact; handdruk bij de werkwijze.
- Originele gebruikte foto’s ongewijzigd gekopieerd. Portretversies van 400 en 800 pixels gegenereerd voor snel laden; uitsnede in CSS, zonder de originele foto te wijzigen.
- Geen eerder getoond, nog niet opgeleverd klantconcept meer in de website. Zowel de detailpagina als alle bereikbare assets zijn verwijderd uit de build. De oude directe URL’s geven 404.
- Abstracte websitecompositie in de hero, duidelijk geen klantproject.
- Geen handmatige animatie-/pauzeknop en geen bijbehorende browseropslag. Motion volgt uitsluitend `prefers-reduced-motion`.
- Geen losse diagonale pijlen of andere pijlversieringen. Het originele logo is ongewijzigd.
- Grote bewegende tekststrook verwijderd; ruimte tussen pakketten en werkwijze verkleind.
- Pillvormige knoppen, rustigere hover-effecten, afgeronde foto’s, kaarten en formuliervelden.
- Verzorgd leeg portfolio plus herbruikbare, geteste projectdetailtemplate. Zie `PORTFOLIO.md`.
- Geen verzonnen klanten, beoordelingen, projecten of resultaten.

## Navigatie

Home `/` · Websites & prijzen `/websites-prijzen/` · Ons werk `/ons-werk/` · Over Higital `/over-higital/` · Contact `/contact/`.

Privacyverklaring, cookiebeleid en 404 blijven ondersteunende routes buiten de hoofdnavigatie. De bestaande redirects voor oude lokale dienstpagina’s blijven actief; zie `REDIRECTS.md`.

## Techniek

De gebruiker heeft deze lichte stack expliciet toegestaan: zelfstandige HTML gegenereerd met Node.js, native CSS en JavaScript. Het is geen WordPress- of Elementor-export.

```text
content/site.mjs         Merkgegevens, pakketten, proces, navigatie
content/projects.mjs     Goedgekeurde portfolio-items (nu leeg)
content/redirects.mjs    Redirects van oude lokale dienstpagina’s
src/components.mjs      Herbruikbare websiteonderdelen
src/pages.mjs           Pagina-inhoud
src/project-template.mjs Projectkaart en detailtemplate
src/style.css           Bestaande vormgeving, opgeschoond
src/refinements.css     Afgeronde vormen, fotografie en nieuw portfolio
src/navy.css            Kleurverdeling, hero, leesvlakken en responsive verfijning
src/app.js              Menu, reveals, rustige motion en formulierverzending
src/contact-service.mjs Validatie, spamremming en veilige mailverzending
src/contact-page.mjs    Contact-, privacy- en cookiepagina
scripts/load-env.mjs    Lokale geheimen veilig uit .env laden
src/form-core.js        Formuliervalidatie
scripts/build.mjs       Bouwt dist en bewaart vorige builds in .history
scripts/server.mjs      Lokale previewserver
public/assets/          Logo en geselecteerde foto’s
tests/site.test.mjs     Automatische controles
```

De build combineert de vier stylesheets in één bestand. De originele grote portret- en werkfoto blijven in het project maar worden niet naar de previewbuild gekopieerd. De pagina’s gebruiken geoptimaliseerde JPEG-varianten met `srcset`. De kleinere telefoon-/handdrukfoto’s worden bewust in kleine kaders gebruikt. De twee aangeleverde hero-sfeerbeelden zijn bekeken maar niet ingezet; de echte persoonlijke foto’s krijgen voorrang.

## Controle en beperkingen

```powershell
npm.cmd run build
npm.cmd test
```

Zestien testgroepen controleren routes, links, assets, prijzen, formulieren, verwijderde onderdelen, echte fotokopieën, portfoliovalidatie, de toekomstige detailtemplate en de nieuwe contactinteracties. Zie `QA.md`.

Er is geen gekoppelde browser beschikbaar. De responsive regels zijn aangepast en de broncode is gecontroleerd, maar de visuele desktop-/mobielcontrole en het animatiegevoel zijn niet in een browser beoordeeld. De huidige palet-/fontkeuzes zijn behouden; ze zijn niet opnieuw met live CSS geverifieerd.

Het formulier verstuurt na configuratie via Resend. Zonder geldige serverinstellingen verschijnt geen succesmelding. Aanvragen worden niet in een Higital-database opgeslagen. Telefoon-, e-mail- en WhatsApp-links openen alleen na een klik. De site gebruikt momenteel geen cookies, analytics of externe fonts. De ontbrekende productie- en juridische gegevens staan in [PUBLICATIE-CHECKLIST.md](PUBLICATIE-CHECKLIST.md).

## Back-up

Bronnen vóór de donkerblauwe verfijning: `.history/before-navy-20261025-154103`. Iedere build bewaart de vorige uitvoer in `.history/dist-*`.

Volledige versie van vóór deze verfijning:

`C:\Users\vanie\Documents\higital-website-2.0-backup-refinement-20261025-142742`

Verwijderde projectassets zijn daarnaast veilig bewaard in `.history/removed-work-assets`, buiten de publiek geserveerde map. De previewserver serveert uitsluitend `dist/`.
