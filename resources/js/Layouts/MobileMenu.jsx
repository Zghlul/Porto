import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from '@inertiajs/react';
import Logo from '../Components/Logo';
import Status from '../Components/Status';
import LocalTime from '../Components/LocalTime';
import { ArrowUpRight, AccentMark, MenuIcon } from '../Components/Icons';
import { navigation, site } from '../data/portfolio';
import { externalLinkProps } from '../utils/links';

export default function MobileMenu({ open, onClose, triggerRef }) {
    const menuRef = useRef(null);
    const closeRef = useRef(null);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-is-open');

        const menu = menuRef.current;

        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== 'Tab' || !menu) {
                return;
            }

            const focusable = Array.from(
                menu.querySelectorAll(
                    'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
                ),
            ).filter((element) => element.getClientRects().length > 0);

            if (focusable.length === 0) {
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);
        const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            window.clearTimeout(focusTimer);
            document.body.style.overflow = previousOverflow;
            document.body.classList.remove('menu-is-open');
            triggerRef.current?.focus({ preventScroll: true });
        };
    }, [open, onClose, triggerRef]);

    return createPortal(
        <div
            id="site-menu"
            ref={menuRef}
            className={`site-menu ${open ? 'is-open' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Menu situs"
            aria-hidden={!open}
            inert={open ? undefined : true}
        >
            <div className="site-menu__grain" aria-hidden="true" />

            <div className="site-menu__top shell">
                <Logo inverted onClick={onClose} />
                <button
                    ref={closeRef}
                    type="button"
                    className="site-menu__close"
                    onClick={onClose}
                >
                    <span>Tutup</span>
                    <MenuIcon open />
                </button>
            </div>

            <div className="site-menu__body shell">
                <nav className="site-menu__nav" aria-label="Navigasi seluler">
                    {navigation.map((item, index) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="site-menu__link"
                            onClick={onClose}
                        >
                            <span className="site-menu__index">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="site-menu__label">{item.label}</span>
                            <ArrowUpRight size={30} className="site-menu__arrow" />
                        </Link>
                    ))}
                </nav>

                <aside className="site-menu__aside">
                    <div className="site-menu__aside-block">
                        <span className="eyebrow">Email</span>
                        <a href={`mailto:${site.email}`} className="site-menu__email">
                            {site.email}
                        </a>
                    </div>

                    <div className="site-menu__aside-block">
                        <span className="eyebrow">Tautan</span>
                        <div className="site-menu__socials">
                            {site.socials.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.url}
                                    className="site-menu__social"
                                    {...externalLinkProps(social.url)}
                                >
                                    {social.label}
                                    <ArrowUpRight size={13} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="site-menu__aside-block">
                        <AccentMark size={18} className="site-menu__star" />
                        <Status
                            label={site.availability.label}
                            detail={site.availability.detail}
                            className="site-menu__status"
                        />
                        <span className="site-menu__place">
                            {site.location} <LocalTime showZone />
                        </span>
                    </div>
                </aside>
            </div>

            <div className="site-menu__foot shell">
                <span>{site.footerNote}</span>
                <span>Portofolio, 2026</span>
            </div>
        </div>,
        document.body,
    );
}
