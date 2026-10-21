import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from '@inertiajs/react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import Seo from '../Components/Seo';
import Page from '../Components/Page';
import ProjectCover from '../Components/ProjectCover';
import ContactCta from '../Components/ContactCta';
import Reveal from '../Components/Reveal';
import { ArrowUpRight } from '../Components/Icons';
import {
    archive,
    home,
    pathForProject,
    projectNumber,
    projects,
    totalProjects,
} from '../data/portfolio';

function WorkRow({ project, index, onEnter, onLeave }) {
    return (
        <Reveal as="li" className="work-row" delay={index * 0.04} amount={0.08}>
            <Link
                href={pathForProject(project)}
                className="work-row__link"
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                onFocus={onLeave}
                aria-label={`${project.title}, ${project.kind}, ${project.year}`}
            >
                <span className="work-row__number">{projectNumber(project)}</span>

                <span className="work-row__main">
                    <span className="work-row__title">{project.title}</span>
                    <span className="work-row__line">{project.cardLine}</span>
                </span>

                <span className="work-row__kind">{project.kind}</span>
                <span className="work-row__stack">{project.stack.slice(0, 2).join(', ')}</span>
                <span className="work-row__year">{project.year}</span>
                <span className="work-row__arrow" aria-hidden="true">
                    <ArrowUpRight size={20} />
                </span>

                <span className="work-row__thumb">
                    <ProjectCover project={project} />
                </span>
            </Link>
        </Reveal>
    );
}

export default function Work({ projects: serverProjects }) {
    const [active, setActive] = useState(null);
    const reduceMotion = useReducedMotion();
    const projectList = serverProjects && serverProjects.length > 0 ? serverProjects : projects;

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 260, damping: 30, mass: 0.55 });
    const springY = useSpring(y, { stiffness: 260, damping: 30, mass: 0.55 });

    const movePreview = (event) => {
        const width = 350;
        const height = 330;
        const flip = event.clientX + width + 48 > window.innerWidth;
        const nextX = flip ? event.clientX - width - 28 : event.clientX + 28;
        const nextY = Math.min(Math.max(event.clientY - height / 2, 96), window.innerHeight - height - 24);

        x.set(nextX);
        y.set(nextY);
    };

    const preview = (
        <motion.div
            className="work-preview"
            aria-hidden="true"
            style={{
                x: reduceMotion ? x : springX,
                y: reduceMotion ? y : springY,
            }}
            animate={{
                opacity: active ? 1 : 0,
                scale: active ? 1 : 0.97,
            }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="work-preview__cover">
                <ProjectCover project={active ?? projects[0]} />
            </div>
            <div className="work-preview__caption">
                <span>{active?.title ?? projects[0].title}</span>
                <span>{active?.year ?? projects[0].year}</span>
            </div>
        </motion.div>
    );

    return (
        <Page className="work-page">
            <Seo
                title="Karya pilihan"
                description="Karya pilihan Farel Zaghlul: pengembangan web dengan Laravel, motion graphics, dan portfolio pribadi."
                path="/work"
            />

            <header className="work-intro shell">
                <div className="work-intro__meta">
                    <span className="eyebrow">Indeks / 2020 — 2026</span>
                    <span className="work-intro__count">{String(projectList.length).padStart(2, '0')} karya</span>
                </div>

                <div className="work-intro__grid">
                    <h1 className="work-intro__title">
                        Karya
                        <br />
                        <span>pilihan.</span>
                    </h1>

                    <div className="work-intro__aside">
                        <p>{home.work.intro}</p>
                        <p className="work-intro__hint">
                            Studi kasusnya singkat. Pilih satu untuk mulai.
                        </p>
                    </div>
                </div>
            </header>

            <section
                className="work-list-shell shell"
                aria-label="Karya pilihan"
                onMouseMove={movePreview}
            >
                <div className="work-list__head" aria-hidden="true">
                    <span>No.</span>
                    <span>Karya</span>
                    <span>Bidang</span>
                    <span>Teknologi</span>
                    <span>Tahun</span>
                    <span />
                </div>

                <h2 className="sr-only">Daftar karya</h2>
                <ul className="work-list" onMouseLeave={() => setActive(null)}>
                    {projectList.map((project, index) => (
                        <WorkRow
                            key={project.slug}
                            project={project}
                            index={index}
                            onEnter={() => setActive(project)}
                            onLeave={() => setActive(null)}
                        />
                    ))}
                </ul>

                <p className="work-list__note">
                    Beberapa pekerjaan lain ada di arsip. Ada yang berhenti sebagai prototipe,
                    ada juga yang hanya sempat menjadi satu halaman. Itu tetap bagian dari proses.
                </p>

                <div className="work-archive">
                    <h2 className="sr-only">Arsip karya</h2>
                    <div className="work-archive__head">
                        <span className="eyebrow">Arsip kecil</span>
                        <span className="work-archive__note">Pekerjaan yang tidak punya halaman sendiri.</span>
                    </div>

                    <ul className="work-archive__list">
                        {archive.map((item, index) => (
                            <Reveal as="li" key={item.title} className="archive-row" delay={index * 0.04}>
                                <span className="archive-row__number">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="archive-row__title">{item.title}</span>
                                <span className="archive-row__kind">{item.kind}</span>
                                <span className="archive-row__note">{item.note}</span>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </section>

            {createPortal(preview, document.body)}

            <ContactCta
                label="Proyek berikutnya"
                title="Masih ada ruang untuk satu lagi."
                body="Saya memilih beberapa proyek pada satu waktu supaya bisa terlibat penuh. Kalau Anda punya website, visual, atau video yang perlu digarap, ceritakan dulu masalahnya."
                buttonLabel="Ceritakan idenya"
            />
        </Page>
    );
}
