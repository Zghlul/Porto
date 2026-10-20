<?php

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

Route::fallback(function () {
    return Inertia::render('Error', ['status' => 404])
        ->toResponse(request())
        ->setStatusCode(404);
});
