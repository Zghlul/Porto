import { useEffect, useRef, useState } from 'react';
import Seo from '../Components/Seo';
import Page from '../Components/Page';
import ContactForm from '../Components/ContactForm';
import LocalTime from '../Components/LocalTime';
import Status from '../Components/Status';
import Reveal from '../Components/Reveal';
import { ArrowUpRight, AccentMark } from '../Components/Icons';
import { contact, site } from '../data/portfolio';
import { externalLinkProps } from '../utils/links';

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const copyTimer = useRef(null);

    useEffect(() => () => window.clearTimeout(copyTimer.current), []);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(site.email);
            setCopied(true);
            window.clearTimeout(copyTimer.current);
            copyTimer.current = window.setTimeout(() => setCopied(false), 2200);
        } catch {
            window.location.href = `mailto:${site.email}`;
        }
    };

    return (
        <Page className="contact-page">
            <Seo
                title="Kontak"
                description="Hubungi Farel Zaghlul untuk proyek website, desain antarmuka, motion graphics, atau kesempatan magang. Berbasis di Jakarta."
                path="/contact"
            />

            <header className="contact-intro shell">
                <div className="contact-intro__meta">
                    <span className="eyebrow">
                        <AccentMark size={12} />
                        {contact.eyebrow}
                    </span>
                    <span className="contact-intro__time">
                        Jakarta, ID / <LocalTime showZone />
                    </span>
                </div>

                <div className="contact-intro__grid">
                    <Reveal>
                        <h1 className="contact-intro__title">{contact.title}</h1>
                    </Reveal>

                    <Reveal className="contact-intro__aside" delay={0.1}>
                        <p>{contact.intro}</p>
                        <div className="contact-intro__status">
                            <Status
                                label={site.availability.label}
                                detail={site.availability.detail}
                            />
                            <span>{site.availability.detail}</span>
                        </div>
                    </Reveal>
                </div>
            </header>

            <section className="contact-main shell" aria-label="Detail kontak dan formulir">
                <div className="contact-main__grid">
                    <aside className="contact-side">
                        <Reveal className="contact-side__block">
                            <span className="eyebrow">Email</span>
                            <a href={`mailto:${site.email}`} className="contact-side__email">
                                {site.email}
                            </a>
                            <button
                                type="button"
                                className="contact-side__copy"
                                onClick={copyEmail}
                                aria-live="polite"
                            >
                                {copied ? 'Tersalin' : 'Salin email'}
                                <span aria-hidden="true">{copied ? '✓' : '+'}</span>
                            </button>
                        </Reveal>

                        <Reveal className="contact-side__block" delay={0.05}>
                            <span className="eyebrow">Catatan</span>
                            <p className="contact-side__body">{contact.response}</p>
                            <p className="contact-side__body">{contact.availability}</p>
                        </Reveal>

                        <Reveal className="contact-side__block" delay={0.1}>
                            <span className="eyebrow">Tautan</span>
                            <div className="contact-side__socials">
                                {site.socials.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.url}
                                        className="contact-side__social"
                                        {...externalLinkProps(social.url)}
                                    >
                                        <span>{social.label}</span>
                                        <span>{social.handle}</span>
                                        <ArrowUpRight size={13} />
                                    </a>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal className="contact-side__foot" delay={0.15}>
                            <AccentMark size={18} />
                            <span>{site.location}</span>
                            <span>{site.coordinates}</span>
                        </Reveal>
                    </aside>

                    <Reveal className="contact-form-wrap" delay={0.08} amount={0.05}>
                        <ContactForm />
                    </Reveal>
                </div>
            </section>
        </Page>
    );
}
