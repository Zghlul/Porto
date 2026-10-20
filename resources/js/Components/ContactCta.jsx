import { Link } from '@inertiajs/react';
import { ArrowUpRight, AccentMark } from './Icons';
import Reveal from './Reveal';
import { home, site } from '../data/portfolio';

export default function ContactCta({
    label = home.contact.label,
    title = home.contact.title,
    body = home.contact.body,
    buttonLabel = home.contact.button,
}) {
    return (
        <section className="contact-cta" aria-labelledby="contact-cta-title">
            <div className="contact-cta__inner shell">
                <Reveal className="contact-cta__body">
                    <div className="contact-cta__topline">
                        <span className="eyebrow eyebrow--light">{label}</span>
                        <AccentMark size={30} className="contact-cta__star" />
                    </div>

                    <div className="contact-cta__grid">
                        <h2 id="contact-cta-title" className="contact-cta__title">
                            {title}
                        </h2>

                        <div className="contact-cta__aside">
                            <p>{body}</p>
                            <Link href="/contact" className="button button--paper">
                                {buttonLabel}
                                <ArrowUpRight size={16} />
                            </Link>
                            <a href={`mailto:${site.email}`} className="contact-cta__email">
                                Atau email langsung: {site.email}
                            </a>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
