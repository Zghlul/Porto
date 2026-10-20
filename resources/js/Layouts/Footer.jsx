import { Link } from '@inertiajs/react';
import Logo from '../Components/Logo';
import LocalTime from '../Components/LocalTime';
import Status from '../Components/Status';
import { ArrowUpRight, AccentMark } from '../Components/Icons';
import { navigation, site } from '../data/portfolio';
import { externalLinkProps } from '../utils/links';

export default function Footer() {
    const year = new Date().getFullYear();
    const [firstName, ...rest] = site.name.split(' ');
    const lastName = rest.join(' ');

    const backToTop = () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    };

    return (
        <footer className="site-footer">
            <div className="site-footer__grain" aria-hidden="true" />
            <div className="site-footer__inner shell">
                <div className="site-footer__lead">
                    <span className="eyebrow eyebrow--light">Mulai dari sini</span>
                    <a className="site-footer__email" href={`mailto:${site.email}`}>
                        {site.email}
                        <ArrowUpRight size={30} />
                    </a>
                    <p className="site-footer__note">
                        Saya membaca setiap pesan yang masuk, biasanya dibalas dalam dua hari kerja.
                    </p>
                </div>

                <div className="site-footer__columns">
                    <div className="site-footer__column">
                        <span className="site-footer__label">Halaman</span>
                        <nav aria-label="Navigasi footer">
                            {navigation.map((item) => (
                                <Link key={item.href} href={item.href} className="site-footer__link">
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="site-footer__column">
                        <span className="site-footer__label">Tautan</span>
                        {site.socials.map((social) => (
                            <a
                                key={social.label}
                                href={social.url}
                                className="site-footer__link"
                                {...externalLinkProps(social.url)}
                            >
                                {social.label}
                                <ArrowUpRight size={12} />
                            </a>
                        ))}
                    </div>

                    <div className="site-footer__column">
                        <span className="site-footer__label">Lokasi</span>
                        <span className="site-footer__text">{site.location}</span>
                        <span className="site-footer__text">
                            <LocalTime showZone />
                        </span>
                        <Status
                            label="Terbuka untuk proyek"
                            detail={site.availability.detail}
                            className="site-footer__status"
                        />
                    </div>
                </div>

                <div className="site-footer__wordmark" aria-hidden="true">
                    <span>{firstName}</span>
                    <span className="site-footer__wordmark-serif">{lastName}</span>
                    <AccentMark size={54} className="site-footer__wordmark-star" />
                </div>

                <div className="site-footer__bottom">
                    <Logo inverted />
                    <span className="site-footer__copyright">
                        © {year} {site.name}. Portofolio pribadi.
                    </span>
                    <span className="site-footer__colophon">
                        Laravel + React. Huruf Gloock dan Plus Jakarta Sans.
                    </span>
                    <button type="button" className="site-footer__top" onClick={backToTop}>
                        Kembali ke atas
                        <span aria-hidden="true">↑</span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
