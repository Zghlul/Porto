import content from '../../data/portfolio.json';

const sortedProjects = [...content.projects].sort((a, b) => a.order - b.order);

export const site = content.site;
export const navigation = content.navigation;
export const projects = sortedProjects;
export const home = content.home;
export const about = content.about;
export const contact = content.contact;
export const archive = content.archive;

export function getProject(slug) {
    return projects.find((project) => project.slug === slug) ?? null;
}

export function getNextProject(project) {
    return getProject(project.nextSlug) ?? projects.find((item) => item.slug !== project.slug) ?? null;
}

export function projectNumber(project) {
    return String(project.order).padStart(2, '0');
}

export function totalProjects() {
    return String(projects.length).padStart(2, '0');
}

export function pathForProject(project) {
    return `/work/${project.slug}`;
}
