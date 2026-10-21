<!DOCTYPE html>
<html lang="id">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#0A0B0D">
        <meta name="color-scheme" content="dark">

        <title>Farel Zaghlul — Web developer & motion designer</title>
        <meta
            name="description"
            content="Farel Zaghlul adalah web developer dan motion designer di Jakarta. Mahasiswa Sistem Informasi yang membangun website, antarmuka, dan visual."
            data-inertia="description"
        >
        <meta property="og:type" content="website" data-inertia="og:type">
        <meta property="og:site_name" content="Farel Zaghlul">
        <meta property="og:title" content="Farel Zaghlul — Web developer & motion designer" data-inertia="og:title">
        <meta
            property="og:description"
            content="Web developer dan motion designer di Jakarta. Website, antarmuka, dan visual yang bekerja."
            data-inertia="og:description"
        >
        <meta property="og:url" content="{{ url('/') }}" data-inertia="og:url">
        <meta property="og:image" content="{{ url('/og-image.png') }}" data-inertia="og:image">
        <meta property="og:image:width" content="1200" data-inertia="og:image:width">
        <meta property="og:image:height" content="630" data-inertia="og:image:height">
        <meta name="twitter:card" content="summary_large_image" data-inertia="twitter:card">
        <meta name="twitter:title" content="Farel Zaghlul — Web developer & motion designer" data-inertia="twitter:title">
        <meta
            name="twitter:description"
            content="Web developer dan motion designer di Jakarta. Website, antarmuka, dan visual yang bekerja."
            data-inertia="twitter:description"
        >
        <meta name="twitter:image" content="{{ url('/og-image.png') }}" data-inertia="twitter:image">

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="manifest" href="/site.webmanifest">

        @vite(['resources/js/app.jsx'])
        @inertiaHead
    </head>
    <body>
        @inertia

        <noscript>
            <main style="padding: 2.5rem 1.5rem; font-family: system-ui, -apple-system, sans-serif; max-width: 48rem; margin: 0 auto; color: #f2f1eb; background: #0a0b0d; line-height: 1.6;">
                <header style="border-bottom: 1px solid #222; padding-bottom: 1.5rem; margin-bottom: 2rem;">
                    <h1 style="font-size: 2rem; margin: 0 0 0.5rem 0;">Farel Zaghlul</h1>
                    <p style="margin: 0; color: #888;">Web developer & motion designer · Jakarta, Indonesia</p>
                    <p style="margin: 0.5rem 0 0 0;">Saya membangun website dan sistem dengan Laravel, merancang antarmuka, serta memproduksi visual dan motion graphics.</p>
                </header>

                <section style="margin-bottom: 2.5rem;">
                    <h2 style="font-size: 1.2rem; color: #ff4b3e; margin-bottom: 1rem;">Karya Pilihan</h2>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <li style="border-bottom: 1px solid #1a1a1a; padding: 0.8rem 0;">
                            <strong>Indo Cahaya Express</strong> (2026) — Web & sistem ekspedisi. Tarif, order, invoice, dan tracking.
                        </li>
                        <li style="border-bottom: 1px solid #1a1a1a; padding: 0.8rem 0;">
                            <strong>Jembatan Armco</strong> (2025) — Motion graphics & video konstruksi jembatan.
                        </li>
                        <li style="border-bottom: 1px solid #1a1a1a; padding: 0.8rem 0;">
                            <strong>Portofolio 2026</strong> (2026) — Website pribadi dengan Laravel, Inertia, dan React.
                        </li>
                    </ul>
                </section>

                <section style="margin-bottom: 2rem;">
                    <h2 style="font-size: 1.2rem; color: #ff4b3e; margin-bottom: 0.5rem;">Kontak</h2>
                    <p style="margin: 0;">Email: <a href="mailto:farelzaghlul@gmail.com" style="color: #7d95ff;">farelzaghlul@gmail.com</a> · GitHub: <a href="https://github.com/Zghlul" style="color: #7d95ff;">@Zghlul</a></p>
                </section>
            </main>
        </noscript>
    </body>
</html>
