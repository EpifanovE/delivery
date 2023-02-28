<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\Subscriber\Subscriber;
use Closure;
use Illuminate\Http\Request;

class TelegramSubscriberMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        return $next($request);
    }
}
