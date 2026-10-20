import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import Logo from '../Components/Logo';
import MobileMenu from './MobileMenu';
import Status from '../Components/Status';
import LocalTime from '../Components/LocalTime';
import { MenuIcon } from '../Components/Icons';
import { navigation, site } from '../data/portfolio';

export default function Header() {
    const { url } = usePage();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const triggerRef = useRef(null);
    const path = url.split('?')[0];

    const closeMenu = useCallback(() => setMenuOpen(false), []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [url]);

    useEffect(() => {
        if (!menuOpen) {
            return undefined;
        }

        const media = window.matchMedia('(min-width: 1024px)');
        const closeAtDesktop = () => {
            if (media.matches) {
                setMenuOpen(false);
            }
        };

        media.addEventListener('change', closeAtDesktop);

        return () => media.removeEventListener('change', closeAtDesktop);
    }, [menuOpen]);

    return (
        <>
            <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
                <div className="site-header__inner shell">
                    <Logo onClick={closeMenu} />

                    <nav className="site-nav" aria-label="Navigasi utama">
                        {navigation.map((item, index) => {
                            const active =
                                item.href === '/work' ? path.startsWith('/work') : path === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`site-nav__link ${active ? 'is-active' : ''}`}
                                    aria-current={active ? 'page' : undefined}
                                >
                                    <span className="site-nav__number">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="site-header__meta">
                        <Status
                            label="Terbuka untuk proyek"
                            detail={site.availability.detail}
                            className="site-header__status"
                        />
                        <span className="site-header__time">
                            JKT <LocalTime />
                        </span>
                    </div>

                    <button
                        ref={triggerRef}
                        type="button"
                        className={`menu-trigger ${menuOpen ? 'is-open' : ''}`}
                        aria-expanded={menuOpen}
                        aria-controls="site-menu"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <span>{menuOpen ? 'Tutup' : 'Menu'}</span>
                        <MenuIcon open={menuOpen} />
                    </button>
                </div>
            </header>

            <MobileMenu
                open={menuOpen}
                onClose={closeMenu}
                triggerRef={triggerRef}
            />
        </>
    );
}
