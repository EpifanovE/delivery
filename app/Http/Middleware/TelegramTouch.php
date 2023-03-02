<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\LogEvent\Code;
use App\Models\LogEvent\LogEvent;
use Closure;
use Illuminate\Http\Request;

class TelegramTouch
{
    public function handle(Request $request, Closure $next)
    {
        if (!config('telegram.enable_analytics')) {
            return $next($request);
        }

        $subscriber = $request->get('subscriber');
        $bot = $request->get('bot');

        $logEvent = LogEvent::where('subscriber_id', $subscriber->id)
            ->where('bot_id', $bot->id)
            ->where('code', Code::Visit->value)
            ->today()
            ->first();

        if (empty($logEvent)) {
            LogEvent::create([
                'code' => Code::Visit,
                'bot_id' => $bot->id,
                'subscriber_id' => $subscriber->id,
            ]);
        }

        return $next($request);
    }
}
