import { Link } from '@inertiajs/react';
import Seo from '../Components/Seo';
import Page from '../Components/Page';
import ProjectCover from '../Components/ProjectCover';
import Reveal from '../Components/Reveal';
import { ArrowLeft, ArrowUpRight, AccentMark } from '../Components/Icons';
import {
    getNextProject,
    getProject,
    projectNumber,
    totalProjects,
} from '../data/portfolio';

export default function Project({ slug, project: serverProject, nextProject: serverNext }) {
    const project = serverProject ?? getProject(slug);

    if (!project) {
        return null;
    }

    const nextProject = serverNext ?? getNextProject(project);

    return (
        <Page className="project-page">
            <Seo
                title={project.title}
                description={project.summary}
                path={`/work/${project.slug}`}
            />

            <header className="case-intro shell">
                <div className="case-intro__topline">
                    <Link href="/work" className="case-back">
                        <ArrowLeft size={14} />
                        Semua karya
                    </Link>
                    <span className="eyebrow">
                        Studi kasus {projectNumber(project)} / {totalProjects()}
                    </span>
                </div>

                <div className="case-intro__grid">
                    <div>
                        <h1 className="case-intro__title">{project.title}</h1>
                        <div className="case-intro__client">
                            <span>{project.client}</span>
                            <span>{project.year}</span>
                        </div>
                    </div>

                    <div className="case-intro__aside">
                        <p className="case-intro__summary">{project.summary}</p>
                        <div className="case-intro__kind">
                            <span className="eyebrow">Bidang</span>
                            <span>{project.kind}</span>
                        </div>
                        {project.external && (
                            <a
                                href={project.external}
                                target="_blank"
                                rel="noreferrer"
                                className="case-intro__external text-link"
                            >
                                Kunjungi situs
                                <ArrowUpRight size={14} />
                            </a>
                        )}
                    </div>
                </div>
            </header>

            <Reveal className="case-cover shell" amount={0.05}>
                <ProjectCover project={project} />
                <div className="case-cover__caption">
                    <span>{project.coverAlt}</span>
                    <span>Gbr. 01</span>
                </div>
            </Reveal>

            <div className="case-details shell">
                <dl className="case-details__grid">
                    <div className="case-detail">
                        <dt>Tahun</dt>
                        <dd>{project.year}</dd>
                    </div>
                    <div className="case-detail">
                        <dt>Peran</dt>
                        <dd>{project.role}</dd>
                    </div>
                    <div className="case-detail">
                        <dt>Tim</dt>
                        <dd>{project.team}</dd>
                    </div>
                    <div className="case-detail">
                        <dt>Teknologi</dt>
                        <dd>{project.stack.join(', ')}</dd>
                    </div>
                </dl>
            </div>

            <section className="case-chapter shell" aria-labelledby="overview-title">
                <div className="case-chapter__label">
                    <span className="eyebrow">01 / Ikhtisar</span>
                </div>

                <div className="case-chapter__body">
                    <h2 id="overview-title" className="sr-only">
                        Ikhtisar
                    </h2>
                    {project.overview.map((paragraph, index) => (
                        <p
                            key={paragraph}
                            className={index === 0 ? 'case-chapter__lead' : 'case-chapter__copy'}
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>

                <aside className="case-chapter__aside">
                    <div>
                        <span className="eyebrow">Cakupan</span>
                        <p>{project.scope}</p>
                    </div>
                    <div>
                        <span className="eyebrow">Durasi</span>
                        <p>{project.duration}</p>
                    </div>
                </aside>
            </section>

            <section className="case-problem shell" aria-labelledby="problem-title">
                <div className="case-problem__label">
                    <span className="eyebrow">02 / Masalah</span>
                </div>

                <div className="case-problem__body">
                    <Reveal>
                        <h2 id="problem-title" className="case-problem__title">
                            {project.problem.heading}
                        </h2>
                    </Reveal>

                    <div className="case-problem__copy">
                        {project.problem.body.map((paragraph, index) => (
                            <Reveal key={paragraph} delay={index * 0.05}>
                                <p>{paragraph}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="case-approach shell" aria-labelledby="approach-title">
                <div className="case-approach__top">
                    <span className="eyebrow">03 / Pendekatan</span>
                    <h2 id="approach-title" className="case-approach__title">
                        Keputusan yang membuatnya bekerja.
                    </h2>
                </div>

                <ol className="approach-list">
                    {project.approach.map((step, index) => (
                        <Reveal
                            as="li"
                            key={step.number}
                            className="approach"
                            delay={index * 0.05}
                            amount={0.15}
                        >
                            <span className="approach__number">{step.number}</span>
                            <h3 className="approach__title">{step.title}</h3>
                            <p className="approach__body">{step.body}</p>
                        </Reveal>
                    ))}
                </ol>
            </section>

            <section
                className="case-outcome"
                aria-labelledby="outcome-title"
                style={{
                    '--outcome-bg': project.background,
                    '--outcome-fg': project.foreground,
                    '--outcome-accent': project.accent,
                }}
            >
                <div className="case-outcome__inner shell">
                    <Reveal className="case-outcome__head">
                        <span className="eyebrow eyebrow--light">04 / Hasil</span>
                        <h2 id="outcome-title" className="case-outcome__title">
                            {project.outcome.title}
                        </h2>
                        <AccentMark size={38} className="case-outcome__star" />
                    </Reveal>

                    <Reveal className="case-outcome__body" delay={0.08}>
                        <p>{project.outcome.body}</p>
                    </Reveal>

                    <div className="metrics">
                        {project.outcome.metrics.map((metric, index) => (
                            <Reveal
                                key={metric.label}
                                className="metric"
                                delay={index * 0.06}
                                amount={0.2}
                            >
                                <span className="metric__value">{metric.value}</span>
                                <span className="metric__label">{metric.label}</span>
                                <span className="metric__note">{metric.note}</span>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="case-reflection shell" aria-labelledby="reflection-title">
                <div className="case-reflection__label">
                    <span className="eyebrow">05 / Yang saya bawa</span>
                </div>
                <Reveal className="case-reflection__body">
                    <h2 id="reflection-title" className="sr-only">
                        Refleksi
                    </h2>
                    <AccentMark size={26} className="case-reflection__mark" />
                    <blockquote>{project.reflection}</blockquote>
                    <span className="case-reflection__sign">
                        {project.title} / {project.year}
                    </span>
                </Reveal>
            </section>

            {nextProject && (
                <section className="next-project" aria-labelledby="next-title">
                    <div className="next-project__inner shell">
                        <Reveal>
                            <Link
                                href={`/work/${nextProject.slug}`}
                                className="next-project__link"
                                aria-label={`Proyek berikutnya: ${nextProject.title}, ${nextProject.kind}`}
                            >
                                <div className="next-project__meta">
                                    <span className="eyebrow">Proyek berikutnya</span>
                                    <span className="next-project__number">
                                        {projectNumber(nextProject)} / {totalProjects()}
                                    </span>
                                </div>

                                <div className="next-project__grid">
                                    <h2 id="next-title" className="next-project__title">
                                        {nextProject.title}
                                    </h2>

                                    <div className="next-project__cover" aria-hidden="true">
                                        <ProjectCover project={nextProject} />
                                    </div>

                                    <div className="next-project__aside">
                                        <span>{nextProject.kind}</span>
                                        <span>{nextProject.year}</span>
                                        <span className="next-project__arrow">
                                            <ArrowUpRight size={28} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </Reveal>
                    </div>
                </section>
            )}
        </Page>
    );
}
