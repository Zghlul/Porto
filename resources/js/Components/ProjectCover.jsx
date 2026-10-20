import { AccentMark } from './Icons';

function Ice() {
    return (
        <div className="cover__scene karta">
            <div className="karta__top">
                <span className="karta__brand">
                    <AccentMark size={14} /> Indo Cahaya Express
                </span>
                <span className="karta__top-meta">PUBLIC SITE + OPS / 2026</span>
            </div>

            <svg className="karta__route" viewBox="0 0 800 600" preserveAspectRatio="none">
                <path
                    d="M118 455 C 208 420, 226 310, 344 318 S 530 250, 682 142"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeDasharray="4 7"
                />
                <circle cx="118" cy="455" r="5" fill="currentColor" />
                <circle cx="344" cy="318" r="5" fill="currentColor" />
                <circle cx="682" cy="142" r="5" fill="currentColor" />
                <circle cx="682" cy="142" r="12" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>

            <div className="karta__title">
                <span>Indo Cahaya</span>
                <span className="karta__title-emphasis">Express</span>
            </div>

            <div className="karta__count">
                <span className="cover-caption">Negara dalam tarif</span>
                <strong>27</strong>
                <span className="karta__delta">7 layanan, satu alur</span>
            </div>

            <div className="karta__panel">
                <div className="karta__panel-head">
                    <span>Kalkulator tarif</span>
                    <span>ID → WORLD</span>
                </div>
                <div className="karta__row karta__row--head">
                    <span>Rute</span>
                    <span>Berat</span>
                    <span>Layanan</span>
                </div>
                <div className="karta__row">
                    <span className="karta__code">CGK — LHR</span>
                    <span>12 kg</span>
                    <span className="karta__state">FAST UK</span>
                </div>
                <div className="karta__row">
                    <span className="karta__code">CGK — JFK</span>
                    <span>8 kg</span>
                    <span className="karta__state">US STD</span>
                </div>
                <div className="karta__row">
                    <span className="karta__code">CGK — SYD</span>
                    <span>5 kg</span>
                    <span className="karta__state karta__state--alert">REGULER</span>
                </div>
                <div className="karta__panel-foot">
                    <span>Estimasi tersimpan saat booking.</span>
                    <span>LIVE</span>
                </div>
            </div>

            <div className="karta__coords">6.2088° S / 106.8456° E</div>
            <div className="karta__rule" />
            <span className="karta__stamp">ICE / 2026</span>
        </div>
    );
}

function Motion() {
    return (
        <div className="cover__scene motion">
            <div className="motion__top">
                <span className="motion__brand">Jembatan Armco</span>
                <span className="cover-caption">Motion / 2025</span>
            </div>

            <div className="motion__title">
                <span>Jembatan</span>
                <span className="motion__title-accent">Armco</span>
            </div>

            <div className="motion__meta">
                <span>Pembangunan jembatan gantung</span>
                <span>02:37</span>
            </div>

            <div className="motion__still">
                <img
                    src="/images/armco-construction.jpg"
                    width="2000"
                    height="714"
                    alt=""
                    loading="lazy"
                />
                <span className="motion__play" aria-hidden="true">
                    <span />
                </span>
                <span className="motion__still-label">PEMBANGUNAN / 2025</span>
            </div>

            <div className="motion__timeline">
                <span className="motion__timeline-track" />
                <span className="motion__timeline-fill" />
                <span className="motion__timeline-time">00:00</span>
                <span className="motion__timeline-time">02:37</span>
            </div>

            <div className="motion__foot">
                <span>Editing / motion / color</span>
                <AccentMark size={30} className="motion__star" />
            </div>
        </div>
    );
}

function Portfolio() {
    return (
        <div className="cover__scene portfolio">
            <div className="portfolio__top">
                <span>Farel Zaghlul</span>
                <span className="cover-caption">Portofolio / 2026</span>
            </div>

            <div className="portfolio__type">
                <span>Farel</span>
                <span className="portfolio__type-dot">.</span>
            </div>

            <div className="portfolio__card">
                <div className="portfolio__card-top">
                    <span>Web developer</span>
                    <span>JKT / ID</span>
                </div>
                <div className="portfolio__card-body">
                    <span className="portfolio__card-kicker">Portofolio 2026</span>
                    <strong>
                        Membuat
                        <br />
                        yang bekerja.
                    </strong>
                    <div className="portfolio__swatches" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
                <div className="portfolio__card-foot">
                    <span>Laravel / React</span>
                    <span>05 halaman</span>
                </div>
            </div>

            <div className="portfolio__side">Inertia / Vite / CSS</div>
            <div className="portfolio__number">03</div>
            <div className="portfolio__foot">
                <span>Hitam / merah / biru</span>
                <span>2026</span>
            </div>
        </div>
    );
}

const scenes = {
    karta: Ice,
    motion: Motion,
    portfolio: Portfolio,
};

export default function ProjectCover({ project, className = '' }) {
    const Scene = scenes[project.cover] ?? Ice;

    return (
        <div
            className={`cover cover--${project.cover} ${className}`}
            style={{
                '--cover-bg': project.background,
                '--cover-fg': project.foreground,
                '--cover-accent': project.accent,
            }}
            role="img"
            aria-label={project.coverAlt}
        >
            <div className="cover__grid" aria-hidden="true" />
            <div aria-hidden="true" className="cover__content">
                <Scene />
            </div>
            <div className="cover__grain" aria-hidden="true" />
        </div>
    );
}
