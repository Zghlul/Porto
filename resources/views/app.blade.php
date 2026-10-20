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
            <div style="padding: 2rem; font-family: sans-serif; max-width: 40rem; margin: 0 auto;">
                <h1>Farel Zaghlul</h1>
                <p>
                    Situs ini membutuhkan JavaScript. Anda bisa menghubungi saya langsung di
                    <a href="mailto:farelzaghlul@gmail.com">farelzaghlul@gmail.com</a>.
                </p>
            </div>
        </noscript>
    </body>
</html>
