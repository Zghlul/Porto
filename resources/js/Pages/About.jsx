import Seo from '../Components/Seo';
import Page from '../Components/Page';
import LocalTime from '../Components/LocalTime';
import Reveal from '../Components/Reveal';
import ContactCta from '../Components/ContactCta';
import Status from '../Components/Status';
import { AccentMark } from '../Components/Icons';
import { about, site } from '../data/portfolio';

export default function About() {
    const titleWords = about.title.trim().split(' ');
    const lastWord = titleWords.pop();
    const initials = site.initials.split('');

    return (
        <Page className="about-page">
            <Seo
                title="Tentang"
                description="Farel Zaghlul, mahasiswa Sistem Informasi dan web developer di Jakarta. Berpengalaman dalam website Laravel, desain antarmuka, dan motion graphics."
                path="/about"
            />

            <header className="about-intro shell">
                <div className="about-intro__meta">
                    <span className="eyebrow">
                        <AccentMark size={12} />
                        Tentang / {site.name}
                    </span>
                    <span className="about-intro__place">
                        Jakarta, ID / <LocalTime showZone />
                    </span>
                </div>

                <div className="about-intro__grid">
                    <h1 className="about-intro__title">
                        {titleWords.join(' ')}{' '}
                        <span className="about-intro__title-accent">{lastWord}</span>
                    </h1>

                    <div className="about-intro__aside">
                        <p className="about-intro__lead">{about.intro}</p>
                        <Status
                            label={site.availability.label}
                            detail={site.availability.detail}
                            className="about-intro__status"
                        />
                        <span className="about-intro__scroll">Versi lengkapnya di bawah</span>
                    </div>
                </div>
            </header>

            <section className="about-body shell" aria-label="Biografi">
                <div className="about-body__grid">
                    <div className="about-body__aside">
                        <Reveal className="identity-card">
                            <div className="identity-card__top">
                                <span className="identity-card__code">{site.initials} / 01</span>
                                <span className="identity-card__code">JKT / ID</span>
                            </div>

                            <div className="identity-card__monogram" aria-hidden="true">
                                <span>{initials[0]}</span>
                                <span>{initials[1]}</span>
                            </div>

                            <div className="identity-card__cross" aria-hidden="true">
                                <span />
                                <span />
                            </div>

                            <div className="identity-card__bottom">
                                <span>
                                    Web developer
                                    <br />
                                    Motion designer
                                </span>
                                <span className="identity-card__coordinates">
                                    {site.coordinates}
                                    <br />
                                    Jakarta, ID
                                </span>
                            </div>

                            <AccentMark size={32} className="identity-card__star" />
                        </Reveal>

                        <Reveal className="about-facts" delay={0.08}>
                            <dl>
                                {about.facts.map((fact) => (
                                    <div key={fact.label} className="about-fact">
                                        <dt>{fact.label}</dt>
                                        <dd>{fact.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </Reveal>
                    </div>

                    <div className="about-body__copy">
                        {about.body.map((paragraph, index) => (
                            <Reveal
                                key={paragraph}
                                delay={index * 0.05}
                                className={`about-paragraph ${index === 0 ? 'about-paragraph--lead' : ''}`}
                            >
                                <p>{paragraph}</p>
                            </Reveal>
                        ))}

                        <Reveal className="about-signoff">
                            <span className="about-signoff__line" aria-hidden="true" />
                            <p>
                                Saya suka pekerjaan yang spesifik, berguna, dan sedikit keras kepala
                                soal detail.
                            </p>
                            <span className="about-signoff__name">{site.firstName}</span>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="principles" aria-labelledby="principles-title">
                <div className="principles__inner shell">
                    <Reveal className="principles__head">
                        <span className="eyebrow eyebrow--light">{about.principles.label}</span>
                        <h2 id="principles-title" className="principles__title">
                            {about.principles.title}
                        </h2>
                        <AccentMark size={42} className="principles__star" />
                    </Reveal>

                    <div className="principles__grid">
                        {about.principles.items.map((principle, index) => (
                            <Reveal
                                key={principle.number}
                                className="principle"
                                delay={index * 0.05}
                                amount={0.2}
                            >
                                <span className="principle__number">{principle.number}</span>
                                <h3 className="principle__title">{principle.title}</h3>
                                <p className="principle__copy">{principle.copy}</p>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section about-record shell" aria-labelledby="record-title">
                <div className="about-record__head">
                    <Reveal className="about-record__intro">
                        <span className="eyebrow">{about.experience.label}</span>
                        <h2 id="record-title" className="about-record__title">
                            {about.experience.title}
                        </h2>
                    </Reveal>
                    <Reveal className="about-record__note" delay={0.08}>
                        <p>
                            Versi singkat. Cerita lengkapnya biasanya keluar sambil ngopi atau
                            lewat panggilan.
                        </p>
                    </Reveal>
                </div>

                <ol className="experience-list">
                    {about.experience.items.map((item, index) => (
                        <Reveal
                            as="li"
                            key={`${item.company}-${item.years}`}
                            className="experience"
                            delay={index * 0.04}
                            amount={0.15}
                        >
                            <span className="experience__years">{item.years}</span>
                            <div className="experience__company">
                                <h3>{item.company}</h3>
                                <span>{item.location}</span>
                            </div>
                            <div className="experience__role">
                                <span>{item.role}</span>
                                <p>{item.copy}</p>
                            </div>
                        </Reveal>
                    ))}
                </ol>
            </section>

            <section className="practice" aria-labelledby="toolkit-title">
                <div className="practice__inner shell">
                    <div className="practice__toolkit">
                        <Reveal className="practice__aside">
                            <span className="eyebrow">{about.toolkit.label}</span>
                            <h2 id="toolkit-title" className="practice__title">
                                Alat, bukan identitas.
                            </h2>
                            <p>
                                Saya memilih perangkat yang paling langsung untuk pekerjaannya, lalu
                                berhenti mencari yang lebih baru. Yang penting hasilnya bisa
                                dipakai dan dirawat.
                            </p>
                        </Reveal>

                        <div className="toolkit">
                            {about.toolkit.groups.map((group, index) => (
                                <Reveal
                                    key={group.title}
                                    className="toolkit__group"
                                    delay={index * 0.06}
                                    amount={0.2}
                                >
                                    <h3>{group.title}</h3>
                                    <ul>
                                        {group.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </Reveal>
                            ))}
                        </div>
                    </div>

                    <div className="currently">
                        <Reveal className="currently__head">
                            <span className="eyebrow">{about.currently.label}</span>
                            <AccentMark size={24} />
                        </Reveal>
                        <Reveal className="currently__list" delay={0.08}>
                            {about.currently.items.map((item) => (
                                <div key={item.label} className="currently__item">
                                    <span>{item.label}</span>
                                    <p>{item.value}</p>
                                </div>
                            ))}
                        </Reveal>
                    </div>
                </div>
            </section>

            <ContactCta
                label="Proyek berikutnya"
                title="Mari membuat sesuatu yang berguna."
                body="Kalau Anda sudah membaca sampai sini, mungkin kita cocok bekerja bersama. Ceritakan apa yang ingin dibuat dan bagian mana yang terasa paling sulit."
                buttonLabel="Mulai percakapan"
            />
        </Page>
    );
}
