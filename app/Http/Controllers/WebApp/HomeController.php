<?php

declare(strict_types=1);

namespace App\Http\Controllers\WebApp;

use App\Http\Resources\Service\ServiceResource;
use App\Models\Bot\Bot;
use App\Models\Service\Service;

class HomeController
{
    public function view(Bot $bot)
    {
        return view('webapp', [
            'settings' => $bot->settings,
            'services' => ServiceResource::collection(Service::query()->active()->ordered()->get()),
        ]);
    }
}
