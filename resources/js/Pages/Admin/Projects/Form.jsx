import { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import ProjectCover from '../../../Components/ProjectCover';

const empty = {
    title: '',
    kind: '',
    client: '',
    year: new Date().getFullYear().toString(),
    role: '',
    duration: '',
    team: '',
    scope: '',
    external: '',
    summary: '',
    card_line: '',
    cover: 'karta',
    cover_alt: '',
    background: '#08101F',
    foreground: '#F2F1EB',
    accent: '#FF4B3E',
    order: 1,
    published: false,
    stack: '',
    overview: '',
    problem_heading: '',
    problem_body: '',
    approach: [],
    outcome_title: '',
    outcome_body: '',
    reflection: '',
    next_slug: '',
    regenerate_slug: false,
};

const coverNames = {
    karta: 'Peta & rute (sistem)',
    motion: 'Frame video (motion)',
    portfolio: 'Grid tipografi (situs)',
};

function Field({ label, hint, error, children }) {
    return (
        <label className="admin-field">
            <span className="admin-field__label">
                {label}
                {hint && <em>{hint}</em>}
            </span>
            {children}
            {error && <span className="admin-field__error">{error}</span>}
        </label>
    );
}

export default function Form({ project, covers }) {
    const editing = Boolean(project);

    const initial = editing
        ? {
              ...empty,
              ...project,
              problem_heading: project.problem?.heading ?? '',
              problem_body: (project.problem?.body ?? []).join('\n\n'),
              overview: (project.overview ?? []).join('\n\n'),
              approach: project.approach ?? [],
              outcome_title: project.outcome?.title ?? '',
              outcome_body: project.outcome?.body ?? '',
              stack: (project.stack ?? []).join(', '),
              external: project.external ?? '',
              next_slug: project.next_slug ?? '',
          }
        : empty;

    const { data, setData, post, put, processing, errors } = useForm(initial);
    const [preview, setPreview] = useState(null);

    const submit = (event) => {
        event.preventDefault();
        if (editing) {
            put(`/admin/karya/${project.id}`, { preserveScroll: true });
            return;
        }
        post('/admin/karya');
    };

    const addStep = () => setData('approach', [...data.approach, { title: '', body: '' }]);
    const removeStep = (index) =>
        setData('approach', data.approach.filter((_, i) => i !== index));
    const setStep = (index, key, value) =>
        setData(
            'approach',
            data.approach.map((step, i) => (i === index ? { ...step, [key]: value } : step)),
        );

    const remove = () => {
        if (! window.confirm(`Hapus "${project.title}"? Karya hilang dari dashboard setelah Terbitkan.`)) {
            return;
        }
        router.delete(`/admin/karya/${project.id}`);
    };

    const coverPreview = {
        slug: project?.slug ?? 'pratinjau',
        cover: data.cover,
        coverAlt: data.cover_alt,
        background: data.background,
        foreground: data.foreground,
        accent: data.accent,
    };

    return (
        <AdminLayout
            eyebrow={editing ? `/work/${project.slug}` : 'Karya baru'}
            title={editing ? 'Ubah karya' : 'Karya baru'}
            actions={
                <>
                    <Link href="/admin/karya" className="admin-btn admin-btn--quiet">
                        Batal
                    </Link>
                    {editing && (
                        <button type="button" className="admin-btn admin-btn--danger" onClick={remove}>
                            Hapus
                        </button>
                    )}
                </>
            }
        >
            <Head title={editing ? `Ubah ${project.title}` : 'Karya baru'} />

            <form className="admin-form" onSubmit={submit} noValidate>
                <div className="admin-form__grid">
                    <div className="admin-form__col">
                        <section className="admin-panel">
                            <h2 className="admin-panel__title">Identitas</h2>

                            <Field label="Judul" error={errors.title}>
                                <input
                                    className="admin-input"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                    maxLength={120}
                                />
                            </Field>

                            <div className="admin-form__pair">
                                <Field label="Jenis" hint="Web, motion, dsb." error={errors.kind}>
                                    <input
                                        className="admin-input"
                                        value={data.kind}
                                        onChange={(e) => setData('kind', e.target.value)}
                                    />
                                </Field>
                                <Field label="Tahun" error={errors.year}>
                                    <input
                                        className="admin-input"
                                        value={data.year}
                                        onChange={(e) => setData('year', e.target.value)}
                                        maxLength={12}
                                    />
                                </Field>
                            </div>

                            <div className="admin-form__pair">
                                <Field label="Klien" error={errors.client}>
                                    <input
                                        className="admin-input"
                                        value={data.client}
                                        onChange={(e) => setData('client', e.target.value)}
                                    />
                                </Field>
                                <Field label="Peran" error={errors.role}>
                                    <input
                                        className="admin-input"
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                    />
                                </Field>
                            </div>

                            <div className="admin-form__pair">
                                <Field label="Durasi" error={errors.duration}>
                                    <input
                                        className="admin-input"
                                        value={data.duration}
                                        onChange={(e) => setData('duration', e.target.value)}
                                    />
                                </Field>
                                <Field label="Tim" error={errors.team}>
                                    <input
                                        className="admin-input"
                                        value={data.team}
                                        onChange={(e) => setData('team', e.target.value)}
                                    />
                                </Field>
                            </div>

                            <Field label="Cakupan" error={errors.scope}>
                                <input
                                    className="admin-input"
                                    value={data.scope}
                                    onChange={(e) => setData('scope', e.target.value)}
                                />
                            </Field>

                            <Field label="Tautan luar" hint="Opsional, harus URL utuh" error={errors.external}>
                                <input
                                    className="admin-input"
                                    type="url"
                                    placeholder="https://"
                                    value={data.external}
                                    onChange={(e) => setData('external', e.target.value)}
                                />
                            </Field>

                            <Field label="Tumpukan" hint="Pisahkan dengan koma" error={errors.stack}>
                                <input
                                    className="admin-input"
                                    placeholder="Laravel, MySQL, React"
                                    value={data.stack}
                                    onChange={(e) => setData('stack', e.target.value)}
                                />
                            </Field>
                        </section>

                        <section className="admin-panel">
                            <h2 className="admin-panel__title">Cerita</h2>

                            <Field label="Ringkasan" hint="1–2 kalimat, dipakai di meta" error={errors.summary}>
                                <textarea
                                    className="admin-textarea"
                                    rows={3}
                                    maxLength={600}
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
                                />
                            </Field>

                            <Field label="Baris kartu" hint="Satu kalimat pendek di daftar karya" error={errors.card_line}>
                                <input
                                    className="admin-input"
                                    maxLength={255}
                                    value={data.card_line}
                                    onChange={(e) => setData('card_line', e.target.value)}
                                />
                            </Field>

                            <Field label="Ikhtisar" hint="Pisahkan paragraf dengan baris kosong" error={errors.overview}>
                                <textarea
                                    className="admin-textarea"
                                    rows={5}
                                    value={data.overview}
                                    onChange={(e) => setData('overview', e.target.value)}
                                />
                            </Field>

                            <Field label="Judul masalah" error={errors.problem_heading}>
                                <input
                                    className="admin-input"
                                    value={data.problem_heading}
                                    onChange={(e) => setData('problem_heading', e.target.value)}
                                />
                            </Field>

                            <Field label="Isi masalah" hint="Baris kosong = paragraf baru" error={errors.problem_body}>
                                <textarea
                                    className="admin-textarea"
                                    rows={4}
                                    value={data.problem_body}
                                    onChange={(e) => setData('problem_body', e.target.value)}
                                />
                            </Field>
                        </section>

                        <section className="admin-panel">
                            <header className="admin-panel__head">
                                <h2 className="admin-panel__title">Pendekatan</h2>
                                <button type="button" className="admin-linklike" onClick={addStep}>
                                    + Langkah
                                </button>
                            </header>

                            {data.approach.length === 0 && (
                                <p className="admin-empty">Belum ada langkah. Tambah kalau perlu.</p>
                            )}

                            {data.approach.map((step, index) => (
                                <div className="admin-step" key={index}>
                                    <span className="admin-step__number">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div className="admin-step__fields">
                                        <input
                                            className="admin-input"
                                            placeholder="Judul langkah"
                                            value={step.title}
                                            onChange={(e) => setStep(index, 'title', e.target.value)}
                                        />
                                        <textarea
                                            className="admin-textarea"
                                            rows={2}
                                            placeholder="Penjelasan singkat"
                                            value={step.body}
                                            onChange={(e) => setStep(index, 'body', e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        className="admin-step__remove"
                                        onClick={() => removeStep(index)}
                                        aria-label={`Hapus langkah ${index + 1}`}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}

                            <Field label="Judul hasil" error={errors.outcome_title}>
                                <input
                                    className="admin-input"
                                    value={data.outcome_title}
                                    onChange={(e) => setData('outcome_title', e.target.value)}
                                />
                            </Field>

                            <Field label="Isi hasil" error={errors.outcome_body}>
                                <textarea
                                    className="admin-textarea"
                                    rows={3}
                                    value={data.outcome_body}
                                    onChange={(e) => setData('outcome_body', e.target.value)}
                                />
                            </Field>

                            <Field label="Catatan penutup" error={errors.reflection}>
                                <textarea
                                    className="admin-textarea"
                                    rows={3}
                                    value={data.reflection}
                                    onChange={(e) => setData('reflection', e.target.value)}
                                />
                            </Field>
                        </section>
                    </div>

                    <div className="admin-form__col admin-form__col--side">
                        <section className="admin-panel">
                            <h2 className="admin-panel__title">Terbit</h2>

                            <div className="admin-form__pair">
                                <Field label="Urutan" error={errors.order}>
                                    <input
                                        className="admin-input"
                                        type="number"
                                        min={0}
                                        max={999}
                                        value={data.order}
                                        onChange={(e) => setData('order', e.target.value)}
                                    />
                                </Field>
                                <Field label="Karya berikutnya" hint="Slug" error={errors.next_slug}>
                                    <input
                                        className="admin-input"
                                        value={data.next_slug}
                                        onChange={(e) => setData('next_slug', e.target.value)}
                                    />
                                </Field>
                            </div>

                            <label className="admin-switch">
                                <input
                                    type="checkbox"
                                    checked={data.published}
                                    onChange={(e) => setData('published', e.target.checked)}
                                />
                                <span>
                                    <strong>Tayangkan di situs</strong>
                                    <em>Kalau mati, karya hanya tersimpan sebagai draf.</em>
                                </span>
                            </label>

                            {editing && (
                                <label className="admin-switch">
                                    <input
                                        type="checkbox"
                                        checked={data.regenerate_slug}
                                        onChange={(e) => setData('regenerate_slug', e.target.checked)}
                                    />
                                    <span>
                                        <strong>Buat ulang slug dari judul</strong>
                                        <em>URL lama berhenti bekerja. Jangan dicentang untuk karya yang sudah dibagikan.</em>
                                    </span>
                                </label>
                            )}

                            <button type="submit" className="admin-btn admin-btn--solid admin-btn--block" disabled={processing}>
                                {processing ? 'Menyimpan…' : editing ? 'Simpan perubahan' : 'Simpan karya'}
                            </button>

                            <p className="admin-note">
                                Simpan dulu, lalu “Terbitkan ke situs” di kanan atas agar publik ikut berubah.
                            </p>
                        </section>

                        <section className="admin-panel">
                            <h2 className="admin-panel__title">Sampul</h2>

                            <div className="admin-cover-preview">
                                <ProjectCover project={coverPreview} />
                            </div>
                            <p className="admin-note">Pratinjau memakai adegan asli situs, bukan gambar.</p>

                            <Field label="Adegan" error={errors.cover}>
                                <select
                                    className="admin-input"
                                    value={data.cover}
                                    onChange={(e) => setData('cover', e.target.value)}
                                >
                                    {covers.map((cover) => (
                                        <option key={cover} value={cover}>
                                            {coverNames[cover] ?? cover}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field label="Teks alternatif" hint="Untuk pembaca layar" error={errors.cover_alt}>
                                <textarea
                                    className="admin-textarea"
                                    rows={2}
                                    value={data.cover_alt}
                                    onChange={(e) => setData('cover_alt', e.target.value)}
                                />
                            </Field>

                            <div className="admin-colors">
                                {[
                                    ['background', 'Latar', errors.background],
                                    ['foreground', 'Teks', errors.foreground],
                                    ['accent', 'Aksen', errors.accent],
                                ].map(([key, label, error]) => (
                                    <label className="admin-color" key={key}>
                                        <span>{label}</span>
                                        <input
                                            type="color"
                                            value={data[key]}
                                            onChange={(e) => setData(key, e.target.value.toUpperCase())}
                                        />
                                        <input
                                            className="admin-input admin-input--mono"
                                            value={data[key]}
                                            onChange={(e) => setData(key, e.target.value)}
                                        />
                                        {error && <em className="admin-field__error">{error}</em>}
                                    </label>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {Object.keys(errors).length > 0 && (
                    <p className="admin-alert">Ada isian yang belum benar. Periksa bagian bertanda.</p>
                )}
            </form>
        </AdminLayout>
    );
}
