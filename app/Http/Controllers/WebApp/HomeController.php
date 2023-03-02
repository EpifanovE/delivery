<?php

declare(strict_types=1);

namespace App\Http\Controllers\WebApp;

use App\Http\Resources\Product\ProductResource;
use App\Models\Bot\Bot;
use App\Models\Product\Product;

class HomeController
{
    public function view(Bot $bot)
    {
        return view('webapp', [
            'settings' => $bot->settings,
            'products' => ProductResource::collection(Product::query()->active()->ordered()->get()),
        ]);
    }
}
