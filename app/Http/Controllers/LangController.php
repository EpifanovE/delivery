<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;

class LangController
{
    public function view(string $langCode)
    {
        return response()->json(Lang::get('app', [], $langCode));
    }
}
