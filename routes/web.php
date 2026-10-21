<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\ContactController;
use App\Support\Portfolio;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Home'))->name('home');

Route::get('/work', fn () => Inertia::render('Work'))->name('work.index');

Route::get('/work/{project}', function (string $project) {
    abort_unless(Portfolio::project($project), 404);

    return Inertia::render('Project', ['slug' => $project]);
})->where('project', '[a-z0-9-]+')->name('work.show');

Route::get('/about', fn () => Inertia::render('About'))->name('about');

Route::get('/contact', fn () => Inertia::render('Contact'))->name('contact');

Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:6,1')
    ->name('contact.store');

Route::get('/sitemap.xml', function () {
    $paths = [
        '/',
        '/work',
        '/about',
        '/contact',
        ...array_map(
            fn (array $project): string => '/work/'.$project['slug'],
            Portfolio::projects()
        ),
    ];

    $urls = array_map(fn (string $path): string => url($path), $paths);

    return response()
        ->view('sitemap', ['urls' => $urls])
        ->header('Content-Type', 'application/xml; charset=UTF-8');
})->name('sitemap');

Route::get('/robots.txt', function () {
    return response(
        "User-agent: *\nAllow: /\n\nSitemap: ".url('/sitemap.xml')."\n"
    )->header('Content-Type', 'text/plain; charset=UTF-8');
})->name('robots');

/* Dashboard ---------------------------------------------------------------- */

Route::prefix('admin')->group(function (): void {
    Route::middleware('guest')->group(function (): void {
        Route::get('login', [AuthController::class, 'create'])->name('admin.login');
        Route::post('login', [AuthController::class, 'store'])->middleware('throttle:5,1');
    });

    Route::middleware('auth')->group(function (): void {
        Route::post('logout', [AuthController::class, 'destroy'])->name('admin.logout');

        Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');
        Route::post('publish', [DashboardController::class, 'publish'])->name('admin.publish');

        Route::get('karya', [ProjectController::class, 'index'])->name('admin.projects.index');
        Route::get('karya/baru', [ProjectController::class, 'create'])->name('admin.projects.create');
        Route::post('karya', [ProjectController::class, 'store'])->name('admin.projects.store');
        Route::get('karya/{project}/ubah', [ProjectController::class, 'edit'])->name('admin.projects.edit');
        Route::put('karya/{project}', [ProjectController::class, 'update'])->name('admin.projects.update');
        Route::delete('karya/{project}', [ProjectController::class, 'destroy'])->name('admin.projects.destroy');

        Route::get('pesan', [MessageController::class, 'index'])->name('admin.messages.index');
        Route::patch('pesan/{message}/dibaca', [MessageController::class, 'read'])->name('admin.messages.read');
        Route::patch('pesan/{message}/belum', [MessageController::class, 'unread'])->name('admin.messages.unread');
        Route::delete('pesan/{message}', [MessageController::class, 'destroy'])->name('admin.messages.destroy');
    });
});

Route::fallback(function () {
    return Inertia::render('Error', ['status' => 404])
        ->toResponse(request())
        ->setStatusCode(404);
});
