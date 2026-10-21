import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

function stamp(iso) {
    return new Date(iso).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function Index({ messages }) {
    const [open, setOpen] = useState(null);

    const toggle = (message) => {
        const next = open === message.id ? null : message.id;
        setOpen(next);
        if (next && !message.read) {
            router.patch(`/admin/pesan/${message.id}/dibaca`, {}, { preserveScroll: true, preserveState: true });
        }
    };

    const unread = messages.data.filter((message) => !message.read).length;

    return (
        <AdminLayout eyebrow={`${messages.total} masukan`} title="Pesan">
            {messages.data.length === 0 ? (
                <section className="admin-panel admin-panel--flat">
                    <p className="admin-empty">Belum ada pesan dari formulir kontak.</p>
                </section>
            ) : (
                <section className="admin-panel admin-panel--flat">
                    <ul className="admin-messages">
                        {messages.data.map((message) => {
                            const expanded = open === message.id;

                            return (
                                <li key={message.id} className={`admin-message ${message.read ? '' : 'is-unread'}`}>
                                    <button
                                        type="button"
                                        className="admin-message__head"
                                        onClick={() => toggle(message)}
                                        aria-expanded={expanded}
                                    >
                                        <span className="admin-message__who">
                                            <strong>{message.name}</strong>
                                            <em>{message.email}</em>
                                        </span>
                                        <span className="admin-message__kind">{message.project_type}</span>
                                        <span className="admin-message__date">{stamp(message.created_at)}</span>
                                        <span className="admin-message__chevron" aria-hidden="true">
                                            {expanded ? '−' : '+'}
                                        </span>
                                    </button>

                                    {expanded && (
                                        <div className="admin-message__body">
                                            <dl className="admin-message__meta">
                                                <div>
                                                    <dt>Perusahaan</dt>
                                                    <dd>{message.company || '—'}</dd>
                                                </div>
                                                <div>
                                                    <dt>Anggaran</dt>
                                                    <dd>{message.budget || '—'}</dd>
                                                </div>
                                            </dl>

                                            <p className="admin-message__text">{message.message}</p>

                                            <div className="admin-message__actions">
                                                <a className="admin-btn" href={`mailto:${message.email}`}>
                                                    Balas lewat email
                                                </a>
                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn--quiet"
                                                    onClick={() =>
                                                        router.patch(
                                                            `/admin/pesan/${message.id}/${message.read ? 'belum' : 'dibaca'}`,
                                                            {},
                                                            { preserveScroll: true, preserveState: true },
                                                        )
                                                    }
                                                >
                                                    Tandai {message.read ? 'belum dibaca' : 'dibaca'}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="admin-btn admin-btn--danger"
                                                    onClick={() => {
                                                        if (window.confirm(`Hapus pesan dari ${message.name}?`)) {
                                                            router.delete(`/admin/pesan/${message.id}`, {
                                                                preserveScroll: true,
                                                            });
                                                        }
                                                    }}
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    {messages.links.length > 3 && (
                        <nav className="admin-pager" aria-label="Halaman pesan">
                            {messages.links.map((link, index) =>
                                link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`admin-pager__link ${link.active ? 'is-active' : ''}`}
                                        preserveScroll
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={index}
                                        className="admin-pager__link is-disabled"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ),
                            )}
                        </nav>
                    )}

                    {unread > 0 && (
                        <p className="admin-note">{unread} pesan belum dibaca di halaman ini.</p>
                    )}
                </section>
            )}
        </AdminLayout>
    );
}
