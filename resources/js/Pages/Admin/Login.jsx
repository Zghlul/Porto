import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { site } from '../../data/portfolio';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    const submit = (event) => {
        event.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="admin-login">
            <Head title="Masuk — Panel karya" />

            <div className="admin-login__card">
                <header className="admin-login__head">
                    <span className="admin-login__mark" aria-hidden="true">Z</span>
                    <div>
                        <h1>Panel karya</h1>
                        <p>{site.name} · {site.shortRole}</p>
                    </div>
                </header>

                <form onSubmit={submit} noValidate>
                    <label className="admin-field">
                        <span className="admin-field__label">Email</span>
                        <input
                            className="admin-input"
                            type="email"
                            name="email"
                            autoComplete="username"
                            autoFocus
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <span className="admin-field__error">{errors.email}</span>}
                    </label>

                    <label className="admin-field">
                        <span className="admin-field__label">Kata sandi</span>
                        <input
                            className="admin-input"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && <span className="admin-field__error">{errors.password}</span>}
                    </label>

                    <label className="admin-switch admin-switch--tight">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span>
                            <strong>Tetap masuk</strong>
                        </span>
                    </label>

                    <button
                        type="submit"
                        className="admin-btn admin-btn--solid admin-btn--block"
                        disabled={processing}
                    >
                        {processing ? 'Memeriksa…' : 'Masuk'}
                    </button>
                </form>

                <a className="admin-login__back" href="/">← Kembali ke situs</a>
            </div>
        </div>
    );
}
