<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Exceptions\DomainException;
use Closure;
use Illuminate\Http\Request;

class DemoMode
{
    public function handle(Request $request, Closure $next)
    {
        if (!config('app.demo')) {
            return $next($request);
        }

        if ($request->routeIs('login') || $request->routeIs('login.handle') || $request->routeIs('logout') || $request->routeIs('dashboard')) {
            return $next($request);
        }

        if ($request->user() && $request->user()->isSuper()) {
            return $next($request);
        }

        if (strtolower($request->method()) !== 'get') {
            throw new DomainException(__('messages.demo_mode'));
        }

        return $next($request);
    }
}
