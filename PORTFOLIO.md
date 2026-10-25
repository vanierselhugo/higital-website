# Portfolio en herbruikbare projecttemplate

Het portfolio toont Donders Meubel als eerste klantproject. De case staat als **In afronding** vermeld en linkt voorlopig naar de demo-website. De bestaande template blijft beschikbaar voor volgende afgeronde projecten.

## Onderdelen

- `content/projects.mjs`: projectgegevens, status en lokale projectbeelden.
- `src/project-template.mjs`: herbruikbare projectkaart en case study.
- `src/components.mjs`, `portfolioBlock()`: portfolio-overzicht op Home en Ons werk.
- `src/navy.css`: projectbeelden, responsieve galerij en vormgeving in Higital-kleuren.

Het eerste project krijgt een brede beeldpresentatie. Volgende projecten staan in een ruim raster met twee kolommen, op mobiel één kolom. Projectnamen, plaats, status en korte omschrijving blijven zichtbaar; essentiële informatie hangt niet af van hover.

## Een project toevoegen

1. Kopieer goedgekeurde, echte projectbeelden naar `public/assets/`.
2. Voeg een object toe aan de `projects`-lijst met `published: false`.
3. Vul de velden hieronder in. Gebruik beschrijvende alt-teksten en de werkelijke afbeeldingsafmetingen.
4. Zet het project op `published: true` als het klaar is om te tonen.
5. Voer `npm.cmd run build` en `npm.cmd test` uit.

| Veld | Inhoud |
|---|---|
| `published` | Toont de projectkaart en detailroute als `true` |
| `slug` | Unieke URL-naam met kleine letters, cijfers en koppeltekens |
| `name`, `company` | Project- en bedrijfsnaam |
| `category`, `location`, `status` | Optionele context voor kaart en detailpagina |
| `headline`, `summary` | Hoofdtitel en introductie |
| `customer`, `challenge`, `approach`, `result`, `design` | Inhoud van de case study |
| `approachItems` | Optionele lijst met concrete projectstappen |
| `externalUrl` | Optionele HTTPS-link naar de projectwebsite |
| `services` | Optionele lijst met verrichte werkzaamheden |
| `hero` | Hoofdbeeld met `src`, `alt`, `width`, `height` en optioneel `caption` |
| `screenshots` | Aanvullende beelden in hetzelfde formaat; `className` kan de mobiele opname apart positioneren |

Een gepubliceerd project verschijnt automatisch op Home, op `/ons-werk/` en op `/ons-werk/<slug>/`. Onvolledige beeldgegevens stoppen de build met een foutmelding. Tekst wordt ge-escaped voordat die in HTML verschijnt.

## Inspiratie

[DtchMedia klantverhalen](https://dtchmedia.com/klantverhalen/) koppelt projecten aan een bedrijfsnaam, korte context en een link naar het verhaal. De Higital-template gebruikt grote beeldvlakken, een rustig raster en korte begeleidende tekst in de bestaande kleuren en typografie.
