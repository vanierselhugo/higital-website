# URL-inventaris en migratievoorstel

## Wat kon worden gecontroleerd

Op 25 oktober 2026 waren zowel de oude pagina's op `higital.nl` als `nieuw.higital.nl` niet bereikbaar vanuit de onderzoeksomgeving. Ook kon de publieke WordPress-API niet worden uitgelezen. De onderstaande oude URL's zijn daarom de adressen die Hugo voor deze inventaris heeft genoemd; ze zijn niet live geverifieerd. De lokale inhoud, interne links en actieve routes van het nieuwe project zijn wel gecontroleerd.

## Voorgestelde redirects

| Oude URL (door Hugo genoemd) | Bestemming in de nieuwe site | Status |
|---|---|---|
| `/website-laten-maken/` | `/websites-prijzen/` | 301 in `content/redirects.mjs` |
| `/over-mij/` | `/over-higital/` | 301 in `content/redirects.mjs` |
| `/cases/` | `/ons-werk/` | 301 in `content/redirects.mjs` |
| `/pakketten/` | `/websites-prijzen/#pakketten` | 301 in `content/redirects.mjs` |
| `/contact/` | `/contact/` | Route blijft gelijk |

De lokale previewserver voert de redirects uit en bewaart queryparameters. Bij de productiehost moeten deze routes als echte 301-redirects worden ingesteld; `dist/redirects.json` alleen voert geen redirect uit.

## Twee kennisartikelen

De oude artikelteksten, titels en exacte URL's konden niet worden opgehaald en staan niet in de lokale codebase. Daarom heb ik geen inhoud of slugs verzonnen. Voor de verhuizing: exporteer beide artikelen en de WordPress-sitemap. Behoud bruikbare artikelen op inhoudelijk passende URL's; maak per oude URL een 301 naar het gemigreerde artikel. Als een artikel vervalt, bepaal afzonderlijk of er een relevante vervangende pagina is of dat de oude URL een 410 moet geven. Stuur niet alle vervallen URL's naar de homepage.

## Voor de definitieve migratie

Vergelijk de volledige WordPress-sitemap, permalinklijst en relevante inkomende URL's met dit voorstel. Controleer vervolgens redirects op de productiehost, interne links en canonical-/sitemap-URL's. De broncode bevat relatieve interne links; de productiedomeininstellingen, canonical URL's en sitemap moeten vóór lancering controleren dat ze naar `higital.nl` wijzen, niet naar `nieuw.higital.nl`.

Dit document is een migratievoorstel en wijzigt niets aan de live website.
