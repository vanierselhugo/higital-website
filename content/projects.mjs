// Add only approved, completed work. Drafts never appear in the site or build.
// The structure and authoring instructions are in PORTFOLIO.md.
export const projects = [];

export function publishedProjects(items=projects) {
  const published=items.filter(project=>project.published===true);
  const slugs=new Set();
  for (const project of published) {
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)||slugs.has(project.slug)) throw new Error('Each project needs a unique, valid slug.');
    slugs.add(project.slug);
    for(const field of ['name','company','summary','challenge','approach','design']) {
      if(typeof project[field]!=='string'||!project[field].trim())throw new Error(`Project ${project.slug}: missing ${field}.`);
    }
    for(const photo of [project.hero,...(project.screenshots??[])]) {
      if(!photo||!/^\/assets\/[a-zA-Z0-9/_-]+\.(jpg|png|webp|avif)$/.test(photo.src)||!photo.alt||!(photo.width>0)||!(photo.height>0))throw new Error(`Project ${project.slug}: invalid image or missing alt/dimensions.`);
    }
  }
  return published;
}
