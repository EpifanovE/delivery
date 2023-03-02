<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class TelegramBlock
{
    public function handle(Request $request, Closure $next)
    {
        $subscriber = $request->get('subscriber');

        if ($subscriber->is_blocked) {
            return response()->json(['blocked']);
        }

        return $next($request);
    }
}
