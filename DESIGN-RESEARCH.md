# Higital 2.1 — verfijning en bronnen

## Bestaande stijl behouden

Dit is een verfijning van het bestaande lokale project, geen herbouw. De donkerblauwe, lichtblauwe en warme lichte kleuren blijven `#12275F`, `#A6CFF7` en `#F1EEEA`. Ook Segoe UI met Georgia-accent, de grote typografie, vijf pagina’s en de bestaande hero-/scrollreveal-aanpak zijn behouden.

De exacte live CSS en fonts waren bij het eerdere onderzoek niet bereikbaar. De gebruiker heeft de huidige lokale stijl nu expliciet als vertrekpunt aangewezen. Het originele logo blijft intact, inclusief het beeldmerk.

## Nieuwe foto’s

Alle zes bestanden in `C:\Users\vanie\.codex\Referentie foto's` zijn daadwerkelijk bekeken:

| Bestand | Gebruik |
|---|---|
| Foto Mezelf.png | Echt portret op Over Higital en bij de persoonlijke introductie; 400/800px JPEG-varianten |
| hugo-aan-de-telefoon-254x300.jpg | Klein afgerond beeld bij contact |
| kennismaking-handdruk-300x168.jpg | Klein beeld bij de werkwijze |
| Logo Higital.png | Bestaande ongewijzigde merkafbeelding |
| higital-hero-desktop.jpg | Bekeken, niet gebruikt |
| higital-hero-mobile.jpg | Bekeken, niet gebruikt |

De gebruikte bronbestanden zijn ongewijzigd gekopieerd naar `public/assets`. De portretbron is 1414 × 2000. Voor het web zijn twee JPEG-versies gemaakt, circa 34 en 94 kB. `srcset` laat de browser een passend formaat kiezen. De visuele uitsnede gebeurt met `object-fit` en `object-position`, zodat de bronfoto intact blijft. De kleinere foto’s worden niet als grote hero opgeblazen.

## Portfolio-inspiratie

Bron: [DtchMedia klantverhalen](https://dtchmedia.com/klantverhalen/), gelezen op 25 oktober 2026.

De leesbare pagina koppelt afzonderlijke projecten aan een bedrijfsnaam, korte toelichting en een link naar het verhaal. Er volgt een heldere uitnodiging tot kennismaken. Die overzichtelijke structuur is vertaald naar Higital: grote beeldvlakken, rustige titels, korte begeleidende tekst en een directe route naar de detailpagina.

De browserinventaris is leeg. Afmetingen, exacte animaties en hovergedrag van de bron zijn daarom niet visueel gecontroleerd. Er zijn geen bronbeelden, teksten of klantverhalen overgenomen.

Er staan momenteel geen goedgekeurde projecten in de portfolio-inhoud. De zichtbare lege toestand vermeldt dat hier binnenkort websites worden gedeeld. Er zijn geen fictieve projectkaarten. `PORTFOLIO.md` beschrijft de herbruikbare kaart- en detailtemplate.

## Rustigere vormgeving

- Pillvormige CTA’s en kleur-/hoverfeedback zonder losse pijlen.
- Subtiele hoeken bij kaarten, formuliervelden en fotografie.
- Een abstracte websitecompositie in de hero, zonder fictief klantproject.
- Geen grote bewegende tekststrook; kleinere overgangsruimte naar de werkwijze.
- Kleine magnetische bewegingen en beperkte desktopparallax; geen voortdurende autoplay-beweging.
- Alleen de systeeminstelling `prefers-reduced-motion` bepaalt of decoratieve animaties actief zijn.

De uitgenomen portfolio-inhoud is niet meer aanwezig in de actieve broncomponenten, publieke assets of huidige build. Historische bestanden blijven veilig buiten de webroot in back-ups en `.history`.
