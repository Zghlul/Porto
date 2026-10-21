import { Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

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

export default function Index({ projects }) {
    return (
        <AdminLayout
            eyebrow={`${projects.length} karya`}
            title="Karya"
            actions={
                <Link href="/admin/karya/baru" className="admin-btn">
                    Karya baru
                </Link>
            }
        >
            <section className="admin-panel admin-panel--flat">
                {projects.length === 0 ? (
                    <p className="admin-empty">
                        Belum ada karya. Mulai dari <Link href="/admin/karya/baru">karya baru</Link>.
                    </p>
                ) : (
                    <ul className="admin-table">
                        {projects.map((project) => (
                            <li key={project.id} className="admin-table__row">
                                <span className="admin-table__index">
                                    {String(project.order).padStart(2, '0')}
                                </span>
                                <span
                                    className="admin-table__swatch"
                                    style={{ background: project.accent }}
                                    aria-hidden="true"
                                />
                                <span className="admin-table__main">
                                    <strong>{project.title}</strong>
                                    <em>/work/{project.slug}</em>
                                </span>
                                <span className="admin-table__kind">{project.kind}</span>
                                <span className="admin-table__year">{project.year}</span>
                                <span className={`admin-pill ${project.published ? 'is-live' : ''}`}>
                                    {project.published ? 'Tayang' : 'Draf'}
                                </span>
                                <span className="admin-table__meta">{stamp(project.updated_at)}</span>
                                <Link
                                    href={`/admin/karya/${project.id}/ubah`}
                                    className="admin-btn admin-btn--quiet"
                                >
                                    Ubah
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </AdminLayout>
    );
}
