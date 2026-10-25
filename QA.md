## Update 2.4 - form, privacy and public copy

- Demo-, lokale en conceptmeldingen uit de gegenereerde bezoekerspagina?s gehaald. Footerlinks, copyright, metadata en headerknop voor desktop en mobiel nagekeken.
- Contactformulier POST naar dezelfde-origin `/api/contact`; server valideert invoer, verstuurt alleen naar Higital, begrenst de body en gebruikt een verborgen spamveld en een limiet per IP. Er worden geen aanvragen in een website-database opgeslagen.
- Resend-integratie is met een nagebootste API getest. Alleen een geldige providerrespons met e-mail-ID geldt als succes. Ontbrekende instellingen geven 503; weigering/time-out geeft 502. Geen echte e-mail verstuurd: er zijn geen mailinstellingen beschikbaar.
- `.env` wordt alleen server-side gelezen en staat op de Git-ignore. De publicatiehandleiding noemt het Node-hostingvereiste en de benodigde mailconfiguratie.
- Privacy- en cookiepagina beschrijven de actuele code en noemen Resend. Juridische bedrijfsgegevens, rechtsgrond, bewaartermijn, providerafspraken en hostinglogs moeten v??r publicatie worden gecontroleerd.

# Controleverslag — verfijning 25 oktober 2026

## Update 2.3 — donkerblauwe basis

- Hero, header, paginakoppen, portfolio, werkwijze en footer donkerblauw; prijzen, fotografie en formulier op lichte vlakken; chat op lichtblauw. Originele kleurcodes en fonts behouden.
- Nieuwe werkfoto bekeken en ongewijzigd gekopieerd. Geoptimaliseerde varianten 600/1200 pixels naast de portretvarianten 400/800 pixels; elk onder 110 kB. Grote foto-originelen worden niet publiek geserveerd.
- Alle negen gegenereerde HTML-documenten gecontroleerd op gebalanceerde tags en correcte nesting van de nieuwe oppervlakken. Dit is een broncontrole, geen browserrendercontrole.
- Merk-, pakket-, navigatie- en procesbron `content/site.mjs` byte voor byte vergeleken met de back-up: ongewijzigd.
- Tekstkleurparen numeriek gecontroleerd: warm wit/donkerblauw 12,26:1; wit/donkerblauw 14,18:1; lichtblauw/donkerblauw 8,70:1; gedempte tekst/donkerblauw 9,91:1; inkt/lichtblauw 8,36:1; gedempte tekst/beige 5,37:1. Dit verifieert de kleurparen, geen volledige toegankelijkheidsaudit.
- Alle zestien testgroepen slagen. De fotocontrole volgt nu de nieuwe werkfoto op Home. Chat- en widgetlogica zijn behouden.
- De browserinventaris is opnieuw leeg. Visuele desktop- en mobiele goedkeuring blijft daarom open.

## Automatisch gecontroleerd

`npm.cmd test`: **16 testgroepen geslaagd, 0 mislukt.**

- Vijf navigatieroutes, met dezelfde bestemmingen op desktop en mobiel.
- Alle gegenereerde pagina’s, interne links, ankers en lokale assets bestaan.
- Eén h1 per pagina; geen dubbele ids.
- Pakketten en onderhoudsonderdelen zijn intact; echte contactgegevens aanwezig.
- Formuliercontrole met geldige en ongeldige invoer, grenswaarden en alle pakketopties.
- Het formulier stuurt via de serverroute; zonder mailinstellingen meldt het eerlijk een fout.
- HTTP-server: pagina’s/assets, redirects, ontbrekende pagina’s, padtraversal en weigeren van POST-verzending.
- Oude projectdetail- en asset-URL’s geven 404.
- Alle tekstbestanden en bestandsnamen in de complete build gescand: geen verwijzingen naar het verwijderde werk, geen pijltekens, pauzeknop, tekststrook, preview-iframe of bijbehorende animatiecode.
- Geen browseropslag of handmatige bewegingsbediening in de applicatiecode. Systeeminstelling voor minder beweging blijft aanwezig.
- Gebruikte originele foto’s byte voor byte gelijk aan de referentiemap. Twee JPEG-portretvarianten en twee werkfotovarianten aanwezig, ieder onder 110 kB. De pagina’s gebruiken responsive srcset.
- Portfolio blijft leeg zolang er geen gepubliceerde projecten zijn. Concepten leveren geen kaart op. Publicatievalidatie weigert incomplete gegevens, ongeldige beelden en dubbele/onveilige slugs.
- Herbruikbare projecttemplate getest op intro, uitdaging, aanpak, ontwerp, beelden, terugnavigatie, één h1 en escaping van tekst. Testfixtures worden niet als websitepagina’s gebouwd.
- JavaScript-syntax gecontroleerd.
- De eigen achtergrondpreview gecontroleerd gestopt en opnieuw gestart op localhost:5173. Alle vijf hoofdpagina’s en beide portretformaten geven HTTP 200; de oude projectdetailpagina, preview en afbeelding geven HTTP 404 op de opnieuw gestarte server.

## Contactwidget en voorbeeldchat

- Eén widget per gegenereerde pagina, correcte dialoognaam en uitleg, expliciete sluitknop en standaard gesloten paneel.
- Exact WhatsApp-nummer en exact gedecodeerd vooraf ingevuld bericht gecontroleerd. E-maillink gecontroleerd. Geen bericht daadwerkelijk verstuurd.
- Controller-unit-tests voor openen/sluiten, Escape, focusterugkeer, snelle heropening tijdens sluiten, directe sluiting bij het mobiele menu en schakelen naar minder beweging.
- Unit-tests van mobiele overlaplogica: formulierfocus, virtueel toetsenbord, menu, overlappende actieknop, lege geometrie en bediening van het geopende paneel.
- Observer-unit-tests: chat start één keer bij binnenkomst in beeld; blijft volledig leesbaar bij minder beweging of ontbrekende IntersectionObserver.
- HTML-controle: exact vijf berichten in de juiste volgorde, illustratielabel, geen live-chatmeldingen voor schermlezers, alleen op Home en na de persoonlijke introductie.
- De widget is zonder JavaScript een Contact-link. De chat heeft geen standaard verborgen inhoud.

Deze tests controleren de logica en gegenereerde HTML. Ze zijn geen browser-, schermlezer- of fysieke mobiele tests.

## Ontwerp en motion

De oorspronkelijke kleuren en fonts blijven in de bestaande tokens staan. De nieuwe stylesheet voegt afgeronde knoppen, afbeeldingen, containers en formuliervelden toe. Kleine CTA’s reageren via kleur en zachte beweging. De hero behoudt een korte introductie; desktopparallax is beperkt tot 12 pixels en magnetische knoppen tot 3/2 pixels. Er zijn geen doorlopende tekstanimaties.

`prefers-reduced-motion` schakelt intro’s, transitions en decoratieve transforms uit. De inhoud staat in gewone HTML. Mobiele navigatie en alle overige inhoud blijven zonder JavaScript toegankelijk via de bestaande CSS-fallback.

## Browserbeperking

De beschikbare browserinventaris gaf opnieuw `apps: []` en `browsers: []`. Geen visuele browsercontrole, screenshots, touchtest, echte toetsenbordtest of Lighthouse-/axe-meting uitgevoerd. De automatische controles bewijzen geen visueel perfecte weergave.

Nog visueel na te lopen bij 1440, 1024, 768, 390 en 320px:

1. Hero, abstracte compositie, zichtbare prijzen en pillknoppen zonder overflow.
2. Mobiel menu: openen, sluiten, Escape, focus en achtergrondscroll.
3. Portretuitsneden en kleine foto's; leesbaarheid en witruimte.
4. Leeg portfolio, afgeronde pakketten, Care-opties, FAQ en formulier.
5. Systeeminstelling normale/minder beweging en weergave zonder JavaScript.
6. Widget met muis, touch en toetsenbord; paneelhoogte in mobiel landschap; werkelijke veld-/knopoverlap en virtueel toetsenbord.
7. Voorbeeldchat: korte eenmalige reeks, volledige eindtoestand en alle berichten direct leesbaar zonder animaties.

## Bronnen en bescherming

- Alle beschikbare afbeeldingen in de opgegeven referentiemap daadwerkelijk bekeken, inclusief de nieuwe werkfoto.
- Gebruikte bronnen ongewijzigd behouden; afgeleide portretformaten in de projectmap.
- Volledige projectback-up vóór wijzigingen; oude werkassets buiten de webroot gearchiveerd.
- DtchMedia-klantverhalen via webtool gelezen; specifieke visuele timing en hovergedrag niet waargenomen.
- Geen wijzigingen aan higital.nl, hosting, DNS of live database. Geen deployment.
