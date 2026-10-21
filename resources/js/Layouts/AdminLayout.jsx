import { useEffect, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { site } from '../data/portfolio';

const items = [
    { label: 'Ringkasan', href: '/admin', match: (url) => url === '/admin' },
    { label: 'Karya', href: '/admin/karya', match: (url) => url.startsWith('/admin/karya') },
    { label: 'Pesan', href: '/admin/pesan', match: (url) => url.startsWith('/admin/pesan') },
];

function Flash() {
    const { flash } = usePage().props;
    const [dismissed, setDismissed] = useState(null);

    useEffect(() => {
        setDismissed(null);
        if (!flash?.success && !flash?.error) {
            return undefined;
        }
        const timer = setTimeout(() => setDismissed(flash.success ?? flash.error), 6000);
        return () => clearTimeout(timer);
    }, [flash?.success, flash?.error]);

    const tone = flash?.error ? 'error' : 'success';
    const text = flash?.error ?? flash?.success;

    if (!text || dismissed === text) {
        return null;
    }

    return (
        <div className={`admin-flash admin-flash--${tone}`} role="status">
            <span>{text}</span>
            <button type="button" onClick={() => setDismissed(text)} aria-label="Tutup notifikasi">
                ×
            </button>
        </div>
    );
}

export default function AdminLayout({ children, title, eyebrow, actions }) {
    const { url, props } = usePage();
    const path = url.split('?')[0];
    const [publishing, setPublishing] = useState(false);
    const user = props.auth?.user;

    const publish = () => {
        if (publishing) {
            return;
        }
        setPublishing(true);
        router.post(
            '/admin/publish',
            {},
            { preserveScroll: true, onFinish: () => setPublishing(false) },
        );
    };

    return (
        <div className="admin">
            <aside className="admin-rail">
                <Link href="/admin" className="admin-rail__brand">
                    <span className="admin-rail__mark" aria-hidden="true">Z</span>
                    <span>
                        <strong>{site.name}</strong>
                        <em>Panel karya</em>
                    </span>
                </Link>

                <nav className="admin-nav" aria-label="Navigasi dashboard">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`admin-nav__link ${item.match(path) ? 'is-active' : ''}`}
                            aria-current={item.match(path) ? 'page' : undefined}
                        >
                            <span className="admin-nav__dot" aria-hidden="true" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="admin-rail__foot">
                    <a className="admin-rail__site" href="/" target="_blank" rel="noreferrer">
                        Lihat situs
                        <span aria-hidden="true">↗</span>
                    </a>
                    {user && (
                        <div className="admin-who">
                            <span className="admin-who__mail">{user.email}</span>
                            <button
                                type="button"
                                className="admin-linklike"
                                onClick={() => router.post('/admin/logout')}
                            >
                                Keluar
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            <div className="admin-body">
                <header className="admin-head">
                    <div className="admin-head__text">
                        {eyebrow && <span className="admin-eyebrow">{eyebrow}</span>}
                        <h1 className="admin-title">{title}</h1>
                    </div>
                    <div className="admin-head__actions">
                        {actions}
                        <button
                            type="button"
                            className="admin-btn admin-btn--solid"
                            onClick={publish}
                            disabled={publishing}
                        >
                            {publishing ? 'Membangun…' : 'Terbitkan ke situs'}
                        </button>
                    </div>
                </header>

                <Flash />

                <main className="admin-main">{children}</main>
            </div>
        </div>
    );
}
