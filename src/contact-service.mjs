const recipient = 'info@higital.nl';
const packageNames = new Map([
  ['', 'Eerst overleggen'], ['nieuw', 'Nieuwe website'], ['vernieuwen', 'Website vernieuwen'],
  ['onderhoud', 'Websiteonderhoud'], ['start', 'Higital Start'], ['business', 'Higital Business'],
  ['premium', 'Higital Premium'], ['care-basic', 'Care Basic'], ['care-plus', 'Care Plus']
]);

export function validateSubmission(input) {
  const value = key => String(input?.[key] ?? '').trim();
  const errors = {};
  if (value('name').length < 2 || value('name').length > 120) errors.name = 'Vul je naam in.';
  if (value('company').length > 160) errors.company = 'De bedrijfsnaam mag maximaal 160 tekens bevatten.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('email')) || value('email').length > 200) errors.email = 'Vul een geldig e-mailadres in.';
  if (value('phone') && !/^[+()\d\s.-]{6,40}$/.test(value('phone'))) errors.phone = 'Controleer het telefoonnummer.';
  if (!packageNames.has(value('package'))) errors.package = 'Kies een geldige optie.';
  if (value('message').length < 20 || value('message').length > 4000) errors.message = 'Vertel iets meer over je plannen.';
  if (value('website')) errors.website = 'De aanvraag kon niet worden verwerkt.';
  return errors;
}

export function createContactService({env = process.env, fetchImpl = globalThis.fetch, now = Date.now} = {}) {
  const limits = new Map();

  return {
    async submit({input, ip}) {
      const current = now();
      for (const [key, entry] of limits) if (entry.resetAt <= current) limits.delete(key);
      const entry = limits.get(ip);
      if (entry && entry.count >= 5) return {status: 429, error: 'Je hebt kort geleden al een bericht verstuurd. Probeer het later opnieuw of mail naar info@higital.nl.'};
      limits.set(ip, entry ? {...entry, count: entry.count + 1} : {count: 1, resetAt: current + 60 * 60 * 1000});
      if (limits.size > 10_000) limits.delete(limits.keys().next().value);

      const errors = validateSubmission(input);
      if (Object.keys(errors).length) return {status: 422, error: 'Controleer je gegevens en probeer het opnieuw.', fields: errors};

      const apiKey = env.RESEND_API_KEY?.trim();
      const fromAddress = env.HIGITAL_FROM_EMAIL?.trim();
      if (!apiKey || !fromAddress || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(fromAddress)) {
        return {status: 503, error: 'Je aanvraag kon niet worden verstuurd. Mail Hugo rechtstreeks via info@higital.nl.'};
      }

      const clean = key => String(input[key] ?? '').trim();
      const text = [
        'Nieuwe websiteaanvraag via higital.nl', '',
        `Naam: ${clean('name')}`,
        `Bedrijf: ${clean('company') || 'Niet opgegeven'}`,
        `E-mailadres: ${clean('email')}`,
        `Telefoon: ${clean('phone') || 'Niet opgegeven'}`,
        `Onderwerp: ${packageNames.get(clean('package'))}`, '',
        'Bericht:', clean('message')
      ].join('\n');

      try {
        const response = await fetchImpl('https://api.resend.com/emails', {
          method: 'POST',
          headers: {Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json'},
          body: JSON.stringify({
            from: `Higital <${fromAddress}>`, to: [recipient], reply_to: clean('email'),
            subject: 'Nieuwe websiteaanvraag via higital.nl', text
          }),
          signal: AbortSignal.timeout(12_000)
        });
        if (!response.ok) return {status: 502, error: 'Versturen is niet bevestigd. Probeer het opnieuw of mail naar info@higital.nl.'};
        const result = await response.json();
        if (typeof result?.id !== 'string' || !result.id) return {status: 502, error: 'Versturen is niet bevestigd. Probeer het opnieuw of mail naar info@higital.nl.'};
        return {status: 200, ok: true};
      } catch {
        return {status: 502, error: 'Versturen is niet bevestigd. Probeer het opnieuw of mail naar info@higital.nl.'};
      }
    }
  };
}

export function validSameOrigin(req) {
  const host = req.headers.host;
  const origin = req.headers.origin;
  if (!host || !origin || origin === 'null') return false;
  try { return new URL(origin).host === host; } catch { return false; }
}

export const CONTACT_BODY_LIMIT = 12_000;
