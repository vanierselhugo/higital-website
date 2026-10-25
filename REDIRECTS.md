# URL-plan, uitsluitend lokaal

De live site higital.nl, www.higital.nl en de openbare wp-json-route konden op 25 oktober 2026 niet worden opgehaald. Er is daarom geen betrouwbare volledige live sitemap, pagina-inventaris of marketing-URL-lijst. De onderstaande oude routes zijn uitsluitend geverifieerd in de aangetroffen lokale Higital-versie.

| Oude lokale route | Nieuwe bestemming | Lokale status |
|---|---|---|
| `/websites-laten-maken/` | `/websites-prijzen/` | 301 |
| `/websitepakketten/` | `/websites-prijzen/#pakketten` | 301 |
| `/websiteonderhoud/` | `/websites-prijzen/#onderhoud` | 301 |
| `/werkwijze/` | `/over-higital/#werkwijze` | 301 |

De previewserver behoudt queryparameters. De configuratie staat in `content/redirects.mjs` en wordt voor overdracht ook als `dist/redirects.json` geëxporteerd. Een latere statische host moet deze redirects expliciet configureren; een JSON-bestand alleen activeert geen redirects op hosting.

Voor een eventuele live migratie: eerst de bestaande WordPress-pagina’s, permalinkinstellingen, sitemap en relevante inkomende URL’s exporteren. Een oude pagina over websiteontwikkeling kan naar Websites & prijzen. Voor vervallen SEO- en social-advertisingpagina’s per pagina beoordelen of er een inhoudelijk passende bestemming is. Geen blind redirect van alle vervallen marketingpagina’s naar de homepage. Oude content vooraf archiveren en passende 301/410-besluiten afzonderlijk vastleggen.

Dit document wijzigt niets op higital.nl en is geen toestemming voor publicatie.
