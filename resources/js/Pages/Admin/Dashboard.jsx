import { Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

function stamp(iso) {
    if (!iso) {
        return '—';
    }
    return new Date(iso).toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });
}

const stats = [
    { key: 'projects', label: 'Karya tersimpan' },
    { key: 'published', label: 'Tayang di situs' },
    { key: 'messages', label: 'Pesan masuk' },
    { key: 'unread', label: 'Belum dibaca' },
];

export default function Dashboard({ stats: numbers, recentMessages, projects }) {
    const drafts = projects.filter((project) => !project.published);

    return (
        <AdminLayout
            eyebrow="Ringkasan"
            title="Semua karya, satu meja."
            actions={
                <Link href="/admin/karya/baru" className="admin-btn">
                    Karya baru
                </Link>
            }
        >
            <section className="admin-stats" aria-label="Angka ringkas">
                {stats.map((stat) => (
                    <div className="admin-stat" key={stat.key}>
                        <span className="admin-stat__label">{stat.label}</span>
                        <strong className="admin-stat__value">{numbers[stat.key]}</strong>
                    </div>
                ))}
            </section>

            <div className="admin-columns">
                <section className="admin-panel">
                    <header className="admin-panel__head">
                        <h2>Karya terbaru diubah</h2>
                        <Link href="/admin/karya" className="admin-linklike">Kelola</Link>
                    </header>

                    {projects.length === 0 ? (
                        <p className="admin-empty">
                            Belum ada karya. Mulai dari <Link href="/admin/karya/baru">karya baru</Link>.
                        </p>
                    ) : (
                        <ul className="admin-list">
                            {projects.slice(0, 6).map((project) => (
                                <li key={project.id}>
                                    <Link href={`/admin/karya/${project.id}/ubah`} className="admin-row">
                                        <span className="admin-row__index">
                                            {String(project.order).padStart(2, '0')}
                                        </span>
                                        <span className="admin-row__main">
                                            <strong>{project.title}</strong>
                                            <em>{project.kind || 'Tanpa kategori'}</em>
                                        </span>
                                        <span className={`admin-pill ${project.published ? 'is-live' : ''}`}>
                                            {project.published ? 'Tayang' : 'Draf'}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {drafts.length > 0 && (
                        <p className="admin-note">
                            {drafts.length} karya masih draf. Tekan “Terbitkan ke situs” setelah selesai.
                        </p>
                    )}
                </section>

                <section className="admin-panel">
                    <header className="admin-panel__head">
                        <h2>Pesan masuk</h2>
                        <Link href="/admin/pesan" className="admin-linklike">Semua pesan</Link>
                    </header>

                    {recentMessages.length === 0 ? (
                        <p className="admin-empty">Belum ada pesan dari formulir kontak.</p>
                    ) : (
                        <ul className="admin-list">
                            {recentMessages.map((message) => (
                                <li key={message.id}>
                                    <Link href="/admin/pesan" className="admin-row">
                                        <span className="admin-row__main">
                                            <strong>{message.name}</strong>
                                            <em>{message.project_type}</em>
                                        </span>
                                        <span className="admin-row__meta">{stamp(message.created_at)}</span>
                                        {!message.read_at && <span className="admin-pill is-new">Baru</span>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>

            <section className="admin-panel admin-panel--flat">
                <h2 className="admin-panel__title">Cara kerjanya</h2>
                <ol className="admin-steps">
                    <li>Simpan karya di sini. Datanya masuk database, bukan file JSON.</li>
                    <li>Tekan “Terbitkan ke situs”: data ditulis ke <code>resources/data/portfolio.json</code>, lalu aset Vite dibangun ulang.</li>
                    <li>Muat ulang situs publik. Karya baru muncul di halaman Karya dan arsip.</li>
                </ol>
            </section>
        </AdminLayout>
    );
}
