globalThis.HigitalForm={
  allowedPackages:['','nieuw','vernieuwen','onderhoud','start','business','premium','care-basic','care-plus'],
  validate(data){
    const errors={};const value=key=>String(data[key]??'').trim();
    if(value('name').length<2||value('name').length>120)errors.name='Vul je naam in (2–120 tekens).';
    if(value('company').length>160)errors.company='De bedrijfsnaam mag maximaal 160 tekens bevatten.';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('email'))||value('email').length>200)errors.email='Vul een geldig e-mailadres in.';
    if(value('phone')&&!/^[+()\d\s.-]{6,40}$/.test(value('phone')))errors.phone='Controleer het telefoonnummer, of laat dit veld leeg.';
    if(value('website')){try{const url=new URL(value('website'));if(!['https:','http:'].includes(url.protocol)||!url.hostname.includes('.')||value('website').length>500)throw Error();}catch{errors.website='Gebruik een volledig webadres, bijvoorbeeld https://jouwbedrijf.nl.';}}
    if(!this.allowedPackages.includes(value('package')))errors.package='Kies een van de beschikbare opties.';
    if(value('message').length<20||value('message').length>4000)errors.message='Vertel iets meer over je plannen (20–4.000 tekens).';
    return errors;
  }
};
