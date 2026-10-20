import { useEffect, useRef } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { ArrowDown, ArrowUpRight, AccentMark } from './Icons';
import { contact, site } from '../data/portfolio';

const initialForm = {
    name: '',
    email: '',
    project_type: '',
    budget: '',
    message: '',
    website: '',
};

export default function ContactForm() {
    const { flash } = usePage().props;
    const success = flash?.success;
    const successRef = useRef(null);
    const formRef = useRef(null);

    const form = useForm(initialForm);

    useEffect(() => {
        if (success) {
            window.requestAnimationFrame(() => successRef.current?.focus());
        }
    }, [success]);

    const update = (field) => (event) => {
        form.setData(field, event.target.value);
        if (form.errors[field]) {
            form.clearErrors(field);
        }
    };

    const submit = (event) => {
        event.preventDefault();

        form.post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset('name', 'email', 'project_type', 'budget', 'message', 'website');
            },
            onError: () => {
                window.requestAnimationFrame(() => {
                    const firstInvalid = formRef.current?.querySelector('[aria-invalid="true"]');
                    firstInvalid?.focus();
                });
            },
        });
    };

    if (success) {
        return (
            <div
                ref={successRef}
                className="form-success"
                role="status"
                tabIndex={-1}
                aria-live="polite"
            >
                <div className="form-success__mark">
                    <AccentMark size={46} />
                </div>
                <span className="eyebrow">Terkirim / diterima</span>
                <h2>Pesan diterima.</h2>
                <p>{success}</p>
                <p className="form-success__note">
                    Kalau lebih nyaman menulis langsung, email saya tetap{' '}
                    <a href={`mailto:${site.email}`} className="inline-link">
                        {site.email}
                    </a>
                    .
                </p>
                <div className="form-success__actions">
                    <Link href="/work" className="button button--ink">
                        Lihat karya
                        <ArrowUpRight size={15} />
                    </Link>
                    <span>Dibalas langsung, bukan bot.</span>
                </div>
            </div>
        );
    }

    return (
        <form ref={formRef} className="contact-form" onSubmit={submit} noValidate>
            <div className="contact-form__head">
                <span className="eyebrow">Cerita proyek</span>
                <span className="contact-form__required">* Wajib</span>
            </div>

            {form.hasErrors && (
                <div className="form-alert" role="alert">
                    Ada beberapa isian yang perlu dicek lagi. Detailnya ada di bawah.
                </div>
            )}

            <div className="form-row">
                <div className={`field ${form.errors.name ? 'field--error' : ''}`}>
                    <label htmlFor="contact-name">
                        Nama <span aria-hidden="true">*</span>
                    </label>
                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={form.data.name}
                        onChange={update('name')}
                        aria-invalid={form.errors.name ? 'true' : undefined}
                        aria-describedby={form.errors.name ? 'contact-name-error' : undefined}
                        placeholder="Nama Anda"
                        required
                    />
                    {form.errors.name && (
                        <span className="field__error" id="contact-name-error">
                            {form.errors.name}
                        </span>
                    )}
                </div>

                <div className={`field ${form.errors.email ? 'field--error' : ''}`}>
                    <label htmlFor="contact-email">
                        Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={form.data.email}
                        onChange={update('email')}
                        aria-invalid={form.errors.email ? 'true' : undefined}
                        aria-describedby={form.errors.email ? 'contact-email-error' : undefined}
                        placeholder="nama@email.com"
                        required
                    />
                    {form.errors.email && (
                        <span className="field__error" id="contact-email-error">
                            {form.errors.email}
                        </span>
                    )}
                </div>
            </div>

            <div className="form-row">
                <div className={`field ${form.errors.project_type ? 'field--error' : ''}`}>
                    <label htmlFor="contact-project">
                        Yang dibutuhkan <span aria-hidden="true">*</span>
                    </label>
                    <div className="select-wrap">
                        <select
                            id="contact-project"
                            name="project_type"
                            value={form.data.project_type}
                            onChange={update('project_type')}
                            aria-invalid={form.errors.project_type ? 'true' : undefined}
                            aria-describedby={
                                form.errors.project_type ? 'contact-project-error' : undefined
                            }
                            required
                        >
                            <option value="" disabled>
                                Pilih jenis proyek
                            </option>
                            {contact.projectTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <ArrowDown size={15} className="select-wrap__icon" />
                    </div>
                    {form.errors.project_type && (
                        <span className="field__error" id="contact-project-error">
                            {form.errors.project_type}
                        </span>
                    )}
                </div>

                <div className={`field ${form.errors.budget ? 'field--error' : ''}`}>
                    <label htmlFor="contact-budget">Perkiraan budget</label>
                    <div className="select-wrap">
                        <select
                            id="contact-budget"
                            name="budget"
                            value={form.data.budget}
                            onChange={update('budget')}
                            aria-invalid={form.errors.budget ? 'true' : undefined}
                        >
                            <option value="">Belum tahu</option>
                            {contact.budgets.map((budget) => (
                                <option key={budget} value={budget}>
                                    {budget}
                                </option>
                            ))}
                        </select>
                        <ArrowDown size={15} className="select-wrap__icon" />
                    </div>
                    {form.errors.budget && (
                        <span className="field__error">{form.errors.budget}</span>
                    )}
                </div>
            </div>

            <div className={`field field--message ${form.errors.message ? 'field--error' : ''}`}>
                <div className="field__label-row">
                    <label htmlFor="contact-message">
                        Cerita singkat <span aria-hidden="true">*</span>
                    </label>
                    <span className="field__count">{form.data.message.length} / 4000</span>
                </div>
                <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    value={form.data.message}
                    onChange={update('message')}
                    aria-invalid={form.errors.message ? 'true' : undefined}
                    aria-describedby={
                        form.errors.message ? 'contact-message-error' : 'contact-message-hint'
                    }
                    placeholder="Apa yang ingin dibuat, untuk siapa, dan bagian mana yang terasa paling sulit?"
                    maxLength={4000}
                    required
                />
                <span className="field__hint" id="contact-message-hint">
                    Beberapa kalimat cukup. Link juga boleh.
                </span>
                {form.errors.message && (
                    <span className="field__error" id="contact-message-error">
                        {form.errors.message}
                    </span>
                )}
            </div>

            <div className="form-trap" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex="-1"
                    autoComplete="off"
                    value={form.data.website}
                    onChange={update('website')}
                />
            </div>

            <div className="contact-form__foot">
                <p>{contact.privacy}</p>
                <button
                    type="submit"
                    className="button button--ink contact-form__submit"
                    disabled={form.processing}
                >
                    {form.processing ? (
                        <>
                            <span className="button__spinner" aria-hidden="true" />
                            Mengirim
                        </>
                    ) : (
                        <>
                            Kirim pesan
                            <ArrowUpRight size={16} />
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
