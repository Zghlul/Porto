import { Link } from '@inertiajs/react';
import { motion, useReducedMotion } from 'motion/react';
import Seo from '../Components/Seo';
import Page from '../Components/Page';
import SectionHead from '../Components/SectionHead';
import ProjectCard from '../Components/ProjectCard';
import ContactCta from '../Components/ContactCta';
import LocalTime from '../Components/LocalTime';
import Reveal from '../Components/Reveal';
import { ArrowDown, ArrowUpRight, AccentMark } from '../Components/Icons';
import { home, projects, site } from '../data/portfolio';

function NowCard() {
    return (
        <Reveal as="article" className="now-card" delay={0.12} amount={0.05}>
            <div className="now-card__top">
                <span className="eyebrow eyebrow--light">{home.now.label}</span>
                <AccentMark size={24} />
            </div>

            <h3 className="now-card__title">{home.now.title}</h3>

            <dl className="now-card__list">
                {home.now.items.map((item) => (
                    <div key={item.label} className="now-card__item">
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                    </div>
                ))}
            </dl>

            <Link href="/contact" className="now-card__link">
                {home.now.linkLabel}
                <ArrowUpRight size={16} />
            </Link>
        </Reveal>
    );
}

export default function Home() {
    const reduceMotion = useReducedMotion();
    const titleLines = site.hero.title;

    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.fullName,
        alternateName: site.name,
        jobTitle: site.role,
        description: site.hero.description,
        url: site.url,
        email: `mailto:${site.email}`,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Jakarta',
            addressCountry: 'ID',
        },
        sameAs: site.socials
            .map((social) => social.url)
            .filter((url) => url.startsWith('http')),
    };

    return (
        <Page className="home">
            <Seo
                title="Web developer & motion designer"
                description="Farel Zaghlul adalah web developer dan motion designer di Jakarta. Mahasiswa Sistem Informasi yang membangun website, antarmuka, dan visual."
                path="/"
            >
                <script head-key="person-schema" type="application/ld+json">
                    {JSON.stringify(personSchema)}
                </script>
            </Seo>

            <section className="hero shell" aria-labelledby="hero-title">
                <div className="hero__meta">
                    <span className="eyebrow">
                        <AccentMark size={12} />
                        Portofolio / 2026
                    </span>
                    <span className="hero__meta-center">Mahasiswa Sistem Informasi / Jakarta</span>
                    <span className="hero__meta-place">
                        Jakarta, ID / <LocalTime showZone />
                    </span>
                </div>

                <div className="hero__body">
                    <div className="hero__main">
                        <span className="hero__eyebrow">{site.hero.eyebrow}</span>

                        <h1 id="hero-title" className="hero__title">
                            {titleLines.map((line, index) => (
                                <span className="hero__line" key={line}>
                                    <motion.span
                                        className="hero__line-inner"
                                        initial={reduceMotion ? false : { y: '112%' }}
                                        animate={{ y: '0%' }}
                                        transition={{
                                            duration: reduceMotion ? 0 : 0.95,
                                            delay: reduceMotion ? 0 : 0.12 + index * 0.09,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                    >
                                        {line}
                                        {index === titleLines.length - 1 && (
                                            <span className="hero__title-dot" aria-hidden="true">
                                                .
                                            </span>
                                        )}
                                    </motion.span>
                                </span>
                            ))}
                        </h1>

                        <motion.div
                            className="hero__intro-block"
                            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.7,
                                delay: reduceMotion ? 0 : 0.42,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <p className="hero__intro">{site.hero.description}</p>

                            <div className="hero__actions">
                                <a href="#selected-work" className="button button--ink">
                                    Lihat karya
                                    <ArrowDown size={15} />
                                </a>
                                <Link href="/about" className="text-link">
                                    Tentang saya
                                    <ArrowUpRight size={14} />
                                </Link>
                            </div>

                            <dl className="hero__quick">
                                <div>
                                    <dt>Fokus</dt>
                                    <dd>Web, antarmuka, motion</dd>
                                </div>
                                <div>
                                    <dt>Kuliah</dt>
                                    <dd>S1 Sistem Informasi</dd>
                                </div>
                                <div>
                                    <dt>Status</dt>
                                    <dd>{site.availability.label}</dd>
                                </div>
                            </dl>
                        </motion.div>
                    </div>

                    <motion.figure
                        className="hero__profile"
                        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.85,
                            delay: reduceMotion ? 0 : 0.24,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <div className="hero__portrait">
                            <img
                                src={site.portrait}
                                alt={site.portraitAlt}
                                width="768"
                                height="1024"
                                fetchPriority="high"
                            />
                            <span className="hero__portrait-label">FZ / 01</span>
                            <AccentMark size={30} className="hero__portrait-mark" />
                            <div className="hero__portrait-caption">
                                <span>Jakarta, Indonesia</span>
                                <span>Terbuka untuk proyek</span>
                            </div>
                        </div>
                        <figcaption className="hero__profile-caption">
                            <span>{site.name}</span>
                            <span>{site.role}</span>
                        </figcaption>
                    </motion.figure>
                </div>

                <div className="hero__foot">
                    <a href="#selected-work" className="hero__scroll">
                        <span className="hero__scroll-line" aria-hidden="true" />
                        Gulir ke karya pilihan
                    </a>
                    <span className="hero__foot-note">
                        Website, antarmuka, dan visual yang bekerja
                    </span>
                    <span className="hero__coordinates">{site.coordinates}</span>
                </div>
            </section>

            <section id="selected-work" className="section work-section shell">
                <SectionHead
                    number="01"
                    label={home.work.label}
                    title={home.work.title}
                    intro={home.work.intro}
                    link="/work"
                    linkLabel="Semua karya"
                />

                <div className="work-grid">
                    {projects.slice(0, 3).map((project, index) => (
                        <ProjectCard key={project.slug} project={project} index={index} />
                    ))}
                    <NowCard />
                </div>
            </section>

            <section className="statement" aria-labelledby="statement-title">
                <div className="statement__inner shell">
                    <Reveal className="statement__meta">
                        <span className="eyebrow eyebrow--light">
                            02 / {home.statement.label}
                        </span>
                        <AccentMark size={34} className="statement__star" />
                    </Reveal>

                    <div className="statement__grid">
                        <Reveal delay={0.08}>
                            <h2 id="statement-title" className="statement__title">
                                {home.statement.title}
                            </h2>
                        </Reveal>

                        <Reveal className="statement__aside" delay={0.16}>
                            <p>{home.statement.body}</p>
                            <span className="statement__aside-mark">
                                Catatan dari tengah proses
                            </span>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="section capabilities shell" aria-labelledby="capabilities-title">
                <SectionHead
                    number="03"
                    label={home.capabilities.label}
                    title={home.capabilities.title}
                    titleId="capabilities-title"
                    intro={home.capabilities.intro}
                />

                <div className="capabilities__list">
                    {home.capabilities.items.map((item, index) => (
                        <Reveal
                            key={item.number}
                            className="capability"
                            delay={index * 0.06}
                            amount={0.15}
                        >
                            <span className="capability__number">{item.number}</span>
                            <h3 className="capability__title">{item.title}</h3>
                            <p className="capability__copy">{item.copy}</p>
                            <ul className="capability__tools" aria-label={`Alat ${item.title}`}>
                                {item.tools.map((tool) => (
                                    <li key={tool}>{tool}</li>
                                ))}
                            </ul>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="section home-about shell" aria-labelledby="home-about-title">
                <div className="home-about__grid">
                    <Reveal className="home-about__aside">
                        <span className="eyebrow">
                            <span className="eyebrow__number">04</span>
                            {home.about.label}
                        </span>
                        <div className="home-about__card" aria-hidden="true">
                            <span className="home-about__card-index">{site.initials} / 01</span>
                            <span className="home-about__monogram">fz.</span>
                            <AccentMark size={28} />
                            <div className="home-about__card-foot">
                                <span>Web & motion</span>
                                <span>Jakarta, ID</span>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal className="home-about__content" delay={0.1}>
                        <h2 id="home-about-title" className="home-about__title">
                            {home.about.title}
                        </h2>
                        <p className="home-about__body">{home.about.body}</p>
                        <Link href="/about" className="text-link">
                            {home.about.link}
                            <ArrowUpRight size={14} />
                        </Link>

                        <div className="home-about__facts">
                            <div>
                                <span className="eyebrow">Kuliah</span>
                                <strong>2025</strong>
                            </div>
                            <div>
                                <span className="eyebrow">Berbasis di</span>
                                <strong>Jakarta</strong>
                            </div>
                            <div>
                                <span className="eyebrow">Terbuka untuk</span>
                                <strong>Proyek</strong>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <ContactCta />
        </Page>
    );
}
