# Portfolio en herbruikbare projecttemplate

De huidige portfolio-opzet is bewust leeg. Alleen afgeronde projecten met toestemming voor publicatie mogen worden toegevoegd. Er staan geen fictieve klanten of projecten in de website.

## Onderdelen

- `content/projects.mjs`: projectgegevens; de lijst is momenteel leeg.
- `src/project-template.mjs`: herbruikbare overzichtskaart en volledige projectpagina.
- `src/components.mjs`, `portfolioBlock()`: overzicht en verzorgde lege toestand.
- `src/refinements.css`: grote projectbeelden, afgeronde kaders, subtiele hovertransitie en responsive detailpagina.

Het eerste gepubliceerde project krijgt een brede beeldpresentatie. Volgende projecten staan in een ruim raster met twee kolommen, op mobiel één kolom. De projectnaam, bedrijfsnaam, korte toelichting en knoptekst blijven altijd zichtbaar; essentiële informatie hangt niet af van hover.

## Een toekomstig project toevoegen

1. Kopieer goedgekeurde beelden naar `public/assets/projects/`. Gebruik lokale JPEG/PNG/WebP/AVIF-bestanden.
2. Voeg een object toe aan de `projects`-lijst. Begin met `published: false`.
3. Vul alle velden hieronder in. Er zijn geen automatische claims, resultaten of reviews.
4. Pas na inhoudelijke goedkeuring en oplevering `published` aan naar `true`.
5. Voer `npm.cmd run build` en `npm.cmd test` uit.

| Veld | Inhoud |
|---|---|
| `published` | `true` uitsluitend voor goedgekeurd afgerond werk |
| `slug` | Unieke URL-naam met kleine letters, cijfers en koppeltekens |
| `name` | Projectnaam |
| `company` | Echte bedrijfsnaam |
| `summary` | Korte introductie voor overzicht en detail |
| `challenge` | De uitdaging in gewone tekst |
| `approach` | De aanpak in gewone tekst |
| `design` | Toelichting op het uiteindelijke ontwerp |
| `services` | Optionele lijst met verrichte werkzaamheden |
| `hero` | Beeldobject met `src`, `alt`, `width`, `height`, optioneel `caption` |
| `screenshots` | Optionele lijst van dezelfde beeldobjecten |

Een gepubliceerde entry verschijnt automatisch in het portfolio en op `/ons-werk/<slug>/`. Conceptentries leveren geen route of kaart op. Onvolledige gepubliceerde entries stoppen de build met een foutmelding. Tekst wordt ge-escaped, zodat aangeleverde tekst geen HTML of scripts kan invoegen.

De detailtemplate bevat terugnavigatie, projectnaam, bedrijfsnaam, hero, intro, uitdaging, aanpak, ontwerp, grote screenshots en een afsluitende contactactie. Er komt geen extra hoofdpagina bij.

## Inspiratie

[DtchMedia klantverhalen](https://dtchmedia.com/klantverhalen/) koppelt projecten aan een bedrijfsnaam, korte context en een link naar het verhaal. De vertaling voor Higital gebruikt grote beeldvlakken, een rustig raster en korte begeleidende tekst in de bestaande kleuren en typografie.

De pagina is via de webtool gelezen. Een gekoppelde browser ontbrak, waardoor de exacte visuele afwerking, afmetingen en hoveranimaties van de referentie niet rechtstreeks zijn beoordeeld. Er zijn geen beelden, teksten of klanten van deze bron overgenomen.
