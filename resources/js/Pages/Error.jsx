import { Link } from '@inertiajs/react';
import Seo from '../Components/Seo';
import Page from '../Components/Page';
import Reveal from '../Components/Reveal';
import { ArrowLeft, ArrowUpRight, AccentMark } from '../Components/Icons';

export default function ErrorPage({ status = 404 }) {
    return (
        <Page className="error-page">
            <Seo
                title={status === 404 ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan'}
                description="Halaman ini tidak ditemukan. Kembali ke karya atau hubungi Farel Zaghlul."
                path="/"
            >
                <meta head-key="robots" name="robots" content="noindex" />
            </Seo>

            <section className="error-hero shell">
                <div className="error-hero__meta">
                    <span className="eyebrow">
                        <AccentMark size={12} />
                        Error / {status}
                    </span>
                    <span className="eyebrow">Salah belok</span>
                </div>

                <Reveal className="error-hero__body">
                    <div className="error-hero__number" aria-hidden="true">
                        {status}
                    </div>
                    <div className="error-hero__copy">
                        <h1>Halaman ini tidak ada di peta.</h1>
                        <p>
                            Mungkin sudah dipindahkan, atau memang belum pernah dibuat. Masih ada
                            karya dan halaman lain yang bisa dibuka.
                        </p>
                        <div className="error-hero__actions">
                            <Link href="/work" className="button button--ink">
                                Lihat karya
                                <ArrowUpRight size={15} />
                            </Link>
                            <Link href="/" className="text-link">
                                <ArrowLeft size={14} />
                                Kembali ke beranda
                            </Link>
                        </div>
                    </div>
                </Reveal>

                <div className="error-hero__footer">
                    <span>404 / Tidak ditemukan</span>
                    <span>{status === 404 ? 'Farel Zaghlul' : 'Coba lagi sebentar'}</span>
                </div>
            </section>
        </Page>
    );
}
