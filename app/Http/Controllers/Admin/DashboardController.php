<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Project;
use App\Support\PortfolioSync;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Process;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'projects' => Project::count(),
                'published' => Project::where('published', true)->count(),
                'messages' => ContactMessage::count(),
                'unread' => ContactMessage::whereNull('read_at')->count(),
            ],
            'recentMessages' => ContactMessage::query()
                ->latest()
                ->limit(5)
                ->get(['id', 'name', 'email', 'project_type', 'created_at', 'read_at']),
            'projects' => Project::query()
                ->orderBy('order')
                ->get(['id', 'slug', 'title', 'kind', 'year', 'order', 'published']),
        ]);
    }

    /**
     * Export every published project to the bundled content file and rebuild
     * the public bundle. ponytail: shelling out to npm works because this is a
     * Vite SPA; swap for a queue job if the build ever outgrows a request.
     */
    public function publish(Request $request): RedirectResponse
    {
        $exported = PortfolioSync::exportJson();

        // On shared hosting (Hostinger, etc.), proc_open is disabled.
        // Data is already saved in DB and synced to portfolio.json.
        if (! function_exists('proc_open')) {
            return back()->with('success', "Terbit: {$exported} karya aktif di situs.");
        }

        // ponytail: node dies with a CSPRNG assertion when it inherits the
        // server's PATH (mingw bin). Hand it a clean env; npm.cmd by full path.
        $nodeDir = collect(['C:/Program Files/nodejs', 'C:/Program Files (x86)/nodejs'])
            ->first(fn (string $dir): bool => is_file($dir.'/npm.cmd'));

        $command = $nodeDir ? '"'.$nodeDir.'/npm.cmd" run build' : 'npm run build';

        $env = [
            'SystemRoot' => getenv('SystemRoot') ?: 'C:\WINDOWS',
            'windir' => getenv('windir') ?: 'C:\WINDOWS',
            'COMSPEC' => getenv('COMSPEC') ?: 'C:\WINDOWS\system32\cmd.exe',
            'PATHEXT' => getenv('PATHEXT') ?: '.COM;.EXE;.BAT;.CMD',
            'USERPROFILE' => getenv('USERPROFILE') ?: '',
            'APPDATA' => getenv('APPDATA') ?: '',
            'LOCALAPPDATA' => getenv('LOCALAPPDATA') ?: '',
            'TEMP' => getenv('TEMP') ?: base_path('storage/framework/cache'),
            'TMP' => getenv('TMP') ?: base_path('storage/framework/cache'),
            'PATH' => implode(';', array_filter([
                $nodeDir,
                'C:\WINDOWS\system32',
                'C:\WINDOWS',
            ])),
        ];

        try {
            $build = Process::path(base_path())
                ->env($env)
                ->timeout(180)
                ->run($command);
        } catch (Throwable $exception) {
            return back()->with('error', "Konten tersimpan ({$exported} karya) tapi build gagal: {$exception->getMessage()}");
        }

        if ($build->failed()) {
            return back()->with('error', 'Konten tersimpan, build gagal. '.trim($build->errorOutput()));
        }

        return back()->with('success', "Terbit: {$exported} karya masuk ke situs, aset dibangun ulang.");
    }
}
