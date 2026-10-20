import { useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import Header from './Header';
import Footer from './Footer';

const pageNames = {
    Home: 'Beranda',
    Work: 'Karya',
    Project: 'Studi kasus',
    About: 'Tentang',
    Contact: 'Kontak',
    Error: 'Halaman tidak ditemukan',
};

export default function AppLayout({ children }) {
    const { url, component } = usePage();
    const initial = useRef(true);
    const announcement = useRef(null);
    const label = pageNames[component] ?? 'Page';

    useEffect(() => {
        if (initial.current) {
            initial.current = false;
            return;
        }

        if (announcement.current) {
            announcement.current.textContent = `Halaman ${label} dimuat`;
        }
    }, [url, label]);

    return (
        <div className="site" id="top">
            <a className="skip-link" href="#main">
                Langsung ke konten
            </a>

            <Header />

            <main id="main" className="site-main">
                {children}
            </main>

            <Footer />

            <div className="grain" aria-hidden="true" />
            <div ref={announcement} className="sr-only" aria-live="polite" aria-atomic="true" />
        </div>
    );
}
