import { Link } from '@inertiajs/react';
import { ArrowUpRight } from './Icons';
import ProjectCover from './ProjectCover';
import Reveal from './Reveal';
import { pathForProject, projectNumber } from '../data/portfolio';

export default function ProjectCard({ project, index }) {
    return (
        <Reveal
            as="article"
            className={`project-card project-card--${index + 1}`}
            delay={(index % 2) * 0.1}
            amount={0.05}
        >
            <Link
                href={pathForProject(project)}
                className="project-card__link"
                aria-label={`${project.title}, ${project.kind}, ${project.year}`}
            >
                <div className="project-card__media">
                    <ProjectCover project={project} />
                    <span className="project-card__open" aria-hidden="true">
                        Lihat studi kasus
                        <ArrowUpRight size={15} />
                    </span>
                </div>

                <div className="project-card__caption">
                    <div className="project-card__heading">
                        <span className="project-card__number">{projectNumber(project)}</span>
                        <h3 className="project-card__title">{project.title}</h3>
                        <span className="project-card__arrow" aria-hidden="true">
                            <ArrowUpRight size={22} />
                        </span>
                    </div>

                    <div className="project-card__details">
                        <span>{project.kind}</span>
                        <span>{project.year}</span>
                    </div>

                    <p className="project-card__line">{project.cardLine}</p>
                </div>
            </Link>
        </Reveal>
    );
}
