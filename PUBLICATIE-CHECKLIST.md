# Instellen vóór publicatie

De contactpagina verstuurt aanvragen met de Resend e-mail-API. De API-sleutel ontbreekt nog in deze omgeving. Zonder configuratie geeft het formulier een foutmelding en verwijst het bezoekers naar info@higital.nl; er verschijnt dan geen succesmelding.

## Mail instellen

1. Maak een Resend-account aan en verifieer het verzenddomein volgens de DNS-instructies van Resend.
2. Kies een afzenderadres op dat geverifieerde domein. Het e-mailadres van de bezoeker komt als `Reply-To` mee. Aanvragen gaan vast naar `info@higital.nl`.
3. Kopieer `.env.example` naar `.env` en stel daarin `RESEND_API_KEY` en `HIGITAL_FROM_EMAIL` in. De sleutel is alleen server-side nodig. Zet hem in productie als geheime omgevingsvariabele op de host, nooit in de websitecode of Git.
4. Host de website op Node.js 20 of hoger en routeer `/api/contact` naar `scripts/server.mjs`. De sitebouwer is een gegenereerde site, maar het formulier vereist deze serverroute.
5. Stel een vertrouwd proxy-IP-header in via `HIGITAL_CLIENT_IP_HEADER` als de hosting een reverse proxy gebruikt. Kies alleen een header die de proxy zelf overschrijft. De ingebouwde limiet is vijf aanvragen per IP per uur per serverproces; productie met meerdere processen of instanties vraagt daarnaast limieten aan de hostingrand.
6. Verstuur na configuratie een echte testaanvraag en controleer de ontvangende inbox, het `Reply-To`-adres en de afhandeling in Resend voordat de website live gaat.

Resend accepteert mail via `POST https://api.resend.com/emails` met een Bearer API-key. De site meldt succes alleen wanneer Resend een succesvolle reactie met een e-mail-ID teruggeeft. Een netwerkstoring of afwijzing levert een fout op; er wordt niet automatisch opnieuw verstuurd.

## Privacy vóór publicatie nalopen

De pagina’s beschrijven de huidige code: het formulier vraagt naam, bedrijfsnaam, e-mail, optioneel telefoonnummer, dienstkeuze en bericht. De aanvraag wordt via Resend naar de Higital-inbox gestuurd en niet in een website-database gezet. De browser slaat geen formuliergegevens op. E-mail kan wel in de mailbox en bij de maildienst bewaard blijven.

Vul de privacyverklaring vóór publicatie aan of bevestig die met de werkelijke bedrijfs- en hostinggegevens. Controleer in ieder geval:

- De officiële juridische bedrijfsnaam, vestigings-/postadres en eventuele registratiegegevens die Higital op de site moet tonen.
- De toepasselijke grondslag voor het beantwoorden van aanvragen, een concrete bewaartermijn voor e-mailcorrespondentie en de praktische procedure voor inzage- en verwijderverzoeken.
- De verwerkersafspraken met Resend, de toepasselijke opslag-/doorgifteregio en de bewaartermijnen van Resend. Zie ook de [privacyverklaring van Resend](https://resend.com/legal/privacy-policy).
- De gekozen hostingpartij, de verwerking van IP-adressen en technische logs, bewaartermijn, toegang en verwerkersafspraken.
- Of de uiteindelijke hostinglaag, eventuele CDN, scripts of ingeschakelde plugins cookies of andere opslag toevoegen. De huidige broncode gebruikt geen cookies, analyse- of advertentietools en laadt geen externe fonts.

Deze punten zijn open omdat bedrijfs-, hosting- en accountgegevens niet in het project aanwezig zijn. De huidige cookieverklaring beschrijft alleen de code die nu in de site staat; controleer haar opnieuw na het toevoegen of wijzigen van diensten.

## Zakelijke keuzes en inhoud vóór lancering

- De oude WordPress-pagina's waren tijdens de contentcontrole niet bereikbaar. Bevestig daarom of een kennismaking nog ongeveer een half uur duurt en of Hugo meestal binnen één werkdag reageert. De huidige nieuwe contacttekst belooft bewust geen duur of reactietermijn.
- Bepaal of het eerste visuele websiteconcept gratis is, betaald is of per aanvraag wordt afgesproken. De nieuwe tekst belooft geen gratis concept: de inhoud en eventuele kosten worden vóór het maken besproken, en de klant beslist na de presentatie of de betaalde opdracht start.
- Bevestig de standaard afspraak voor aanleveren van teksten en foto's, hoeveel redactiehulp inbegrepen is en of tekstschrijven of beeldinkoop extra wordt geoffreerd. De prijspagina zegt nu dat de klant in principe aanlevert, Hugo meedenkt over opbouw en volledige productie vooraf apart wordt afgesproken.
- Bepaal welke toegang, bestanden en eventuele CMS-beheerrechten standaard bij oplevering horen. De standaard websitecode heeft geen klantgerichte CMS-editor; zelf beheren vereist een afgesproken beheersysteem en kan extra inrichting vragen.
- Vergelijk de oude WordPress-sitemap en permalinklijst met het voorstel in [REDIRECTS.md](REDIRECTS.md). Exporteer de twee oude kennisartikelen, bevestig hun titels/URL's en besluit of ze worden gemigreerd of inhoudelijk worden doorverwezen.
- Controleer de bedrijfs- en privacygegevens, hostinglogs en verwerkersinformatie uit de sectie hierboven. De code gebruikt geen analytics of advertentietracking, maar hosting- en mailinstellingen moeten afzonderlijk worden bevestigd.
- Voer na de mailconfiguratie één testaanvraag uit en controleer dat die aankomt. Dit is nog niet gedaan; tijdens deze wijziging zijn geen echte aanvragen verstuurd.
