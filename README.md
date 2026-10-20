# Farel Zaghlul — Portfolio

Website portofolio pribadi Farel Zaghlul. Dibangun dengan Laravel 12, Inertia, React 19, dan CSS custom. Seluruh halaman dirender lewat React (JavaScript murni, tanpa TypeScript), sementara Laravel menangani routing, validasi form, penyimpanan pesan, dan sitemap.

Desainnya memakai tiga warna sebagai sistem: hitam untuk ruang, merah untuk penanda, biru untuk bagian yang perlu berhenti dan dibaca. Visual proyek dibuat khusus dengan tipografi, CSS, dan SVG, bukan template atau gambar stok.

## Fitur

- Beranda, indeks karya, tiga studi kasus, tentang, kontak, dan halaman 404.
- Konten terpusat di satu file JSON.
- Form kontak dengan validasi server, honeypot, rate limit, penyimpanan database, dan notifikasi email.
- Navigasi Inertia tanpa full page reload, transisi halaman, dan animasi reveal yang menghormati `prefers-reduced-motion`.
- Menu seluler dengan focus trap, penutupan lewat Escape, dan pengembalian fokus.
- Meta title/description per halaman, canonical, Open Graph/Twitter card, JSON-LD Person, sitemap, dan robots.
- Layout responsif dari 360px sampai desktop lebar.
- Audit aksesibilitas otomatis (WCAG 2 AA) bersih untuk halaman utama, karya, tentang, kontak, dan studi kasus.

## Stack

- Laravel 12 / PHP 8.2+
- Inertia.js v3
- React 19 + Vite 6
- CSS custom (tanpa Tailwind/UI kit)
- Motion untuk React (animasi)
- SQLite secara lokal (MySQL/PostgreSQL bisa dipakai di produksi)
- Font lokal: Gloock, Plus Jakarta Sans, IBM Plex Mono

## Menjalankan secara lokal

Prasyarat: PHP 8.2+, Composer, Node.js 20+, dan SQLite.

```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
npm run build
php artisan serve --host=127.0.0.1 --port=8000
```

Buka `http://127.0.0.1:8000`.

Untuk pengembangan front end:

```bash
npm run dev
```

Jalankan `php artisan serve` di terminal lain. `composer run dev` juga tersedia untuk menjalankan server, queue, log viewer, dan Vite sekaligus.

## Mengubah konten

Semua copy dan data portofolio ada di:

```
resources/data/portfolio.json
```

Yang ada di dalamnya:

- `site`: nama, peran, lokasi, email, URL domain, status ketersediaan, sosial.
- `home`: hero, karya, statement, kemampuan, teaser tentang, kartu "Sekarang".
- `about`: bio, fakta, prinsip, pengalaman, perangkat, aktivitas di luar layar.
- `contact`: copy halaman kontak, pilihan jenis proyek, dan rentang budget.
- `projects`: studi kasus lengkap. Setiap proyek punya `slug`, `order`, isi studi kasus, dan `nextSlug`.
- `archive`: pekerjaan kecil yang tampil di bagian arsip halaman Karya.

Hal yang perlu dicek saat mengganti data:

1. `site.url` harus domain produksi. Saat ini diisi `https://farelzaghlul.com` sebagai placeholder; canonical dan gambar OG mengikuti nilai ini.
2. `site.email` saat ini `farelzaghlul@gmail.com` (diambil dari portofolio lama). Pastikan alamat ini aktif.
3. `cover` pada proyek harus salah satu dari `karta` (sistem web ICE), `motion`, atau `portfolio`.
4. `nextSlug` harus menunjuk ke slug proyek yang ada. Halaman studi kasus akan menampilkan proyek berikutnya secara otomatis.
5. Beranda sengaja menampilkan tiga proyek pertama + kartu "Sekarang". Proyek tambahan tetap muncul di halaman Karya.

Foto profil ada di `public/images/farel-portrait.jpg` dan memakai foto terbaru Farel di pantai. Foto ini diberi treatment biru/duotone lewat CSS; tidak perlu diedit ulang kalau hanya ingin mengganti file dengan rasio potret yang serupa. Teks alternatif foto diatur lewat `site.portraitAlt` di `portfolio.json`.

Logo adalah monogram Z berhuruf Gloock. Mark tampil di `resources/js/Components/Logo.jsx`, dengan gaya di `resources/css/layout.css`. Aset ikon ada di `public/favicon.ico`, `public/favicon-32.png`, `public/apple-touch-icon.png`, dan `public/icons/`.

### Warna dan tipografi

- Token warna utama: `resources/css/base.css` (`--paper`, `--ink`, `--accent`, `--blue`, dan seterusnya).
- Override permukaan gelap dan aksen: `resources/css/theme.css`.
- Komponen halaman: `resources/css/pages/`.
- Visual sampul proyek: `resources/css/covers.css` dan `resources/js/Components/ProjectCover.jsx`.

## Kontak dan email

Pesan disimpan di tabel `contact_messages`. Untuk membaca pesan terbaru:

```bash
php artisan tinker
```

```php
App\Models\ContactMessage::latest()->take(10)->get(['name', 'email', 'project_type', 'message', 'created_at']);
```

Notifikasi email dikirim ke alamat di `site.email`. Atur pengiriman email lewat `.env`:

```dotenv
MAIL_MAILER=smtp
MAIL_HOST=...
MAIL_PORT=587
MAIL_USERNAME=...
MAIL_PASSWORD=...
MAIL_FROM_ADDRESS="farelzaghlul@gmail.com"
```

Di lingkungan lokal, `MAIL_MAILER=log` sudah cukup; isi email akan masuk ke `storage/logs/laravel.log`.

Form dibatasi enam pengiriman per menit per IP. Ada honeypot tersembunyi untuk bot. Validasi dilakukan di server, dengan pesan error dalam bahasa Indonesia.

## Halaman dan route

| Route | Halaman |
| --- | --- |
| `/` | Beranda |
| `/work` | Indeks karya + arsip |
| `/work/{slug}` | Studi kasus dinamis |
| `/about` | Tentang |
| `/contact` | Kontak + form |
| `/sitemap.xml` | Sitemap |
| `*` | Halaman 404 kustom |

## Pengujian

```bash
php artisan test
```

Test mencakup seluruh route halaman, 404, sitemap, validasi kontak, honeypot, batas panjang pesan, dan penyimpanan pesan. Database test memakai SQLite in-memory (lihat `phpunit.xml`).

Pemeriksaan lint PHP:

```bash
vendor/bin/pint --test
```

## Sebelum deploy

1. Ubah `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL`, serta kredensial database dan mail di `.env`.
2. Ganti `site.url` di `resources/data/portfolio.json` dengan domain final.
3. Sesuaikan foto, email, dan tautan sosial.
4. Jalankan:

```bash
npm run build
php artisan migrate --force
php artisan optimize
```

5. Pastikan folder `storage` dan `bootstrap/cache` dapat ditulis oleh web server.
6. Generate ulang `public/og-image.png` dan ikon bila nama, foto, logo, atau warna brand berubah.

## Struktur singkat

```
app/
  Http/Controllers/ContactController.php
  Models/ContactMessage.php
  Support/Portfolio.php          # membaca resources/data/portfolio.json
resources/
  data/portfolio.json            # sumber konten
  css/                           # sistem visual
  js/
    Components/                  # UI, form, sampul proyek
    Layouts/                     # header, menu, footer, layout
    Pages/                       # Home, Work, Project, About, Contact, Error
    app.jsx                      # entry Inertia React
  views/app.blade.php            # shell HTML + meta awal
routes/web.php
```

## Catatan konten

Materi tentang Farel, Indo Cahaya Express, Jembatan Armco, BULLY, RAKERNAS, dan ASTRO disusun dari catatan pribadi di Obsidian serta detail proyek yang tersedia. NIM, nomor telepon, dan data pribadi lain yang tidak relevan untuk portofolio tidak ditampilkan. Angka pada studi kasus adalah cakupan sistem, bukan klaim metrik bisnis yang tidak terverifikasi.

Jika ada data yang sudah berubah, paling aman mengedit `portfolio.json` terlebih dahulu sebelum menyentuh komponen.
