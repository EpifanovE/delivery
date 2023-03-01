<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Models\Bot\Bot;
use App\Models\LogEvent\Code;
use App\Models\LogEvent\LogEvent;
use App\Models\Subscriber\Subscriber;
use Closure;
use Illuminate\Http\Request;

class TelegramSubscriber
{
    public function handle(Request $request, Closure $next)
    {
        $message = $request->get('message');

        if (empty($message) || empty($message['from']) || empty($message['from']['id'])) {
            return $next($request);
        }

        $subscriberId = $message['from']['id'];
        $from = $message['from'];

        $subscriber = Subscriber::where('tid', $subscriberId)->first();
        $bot = Bot::where('token', $request->route('token'))->firstOrFail();

        if (empty($subscriber)) {
            $subscriber = Subscriber::create([
                'tid' => $subscriberId,
                'first_name' => $from['first_name'],
                'last_name' => $from['last_name'],
                'username' => $from['username'],
                'language_code' => $from['language_code'],
                'is_bot' => $from['is_bot'],
                'is_premium' => $from['is_premium'] ?? false,
                'added_to_attachment_menu' => $from['added_to_attachment_menu'] ?? false,
                'is_blocked' => false,
            ]);

            if (config('telegram.enable_analytics')) {
                LogEvent::create([
                    'code' => Code::Start,
                    'subscriber_id' => $subscriber->id,
                    'bot_id' => $bot->id,
                ]);
            }

        } else {
            $subscriber->fill([
                'first_name' => $from['first_name'],
                'last_name' => $from['last_name'],
                'username' => $from['username'],
                'language_code' => $from['language_code'],
                'is_bot' => $from['is_bot'],
                'is_premium' => $from['is_premium'] ?? false,
                'added_to_attachment_menu' => $from['added_to_attachment_menu'] ?? false,
            ]);
            $subscriber->save();
        }

        $request->attributes->add(['subscriber' => $subscriber]);
        $request->attributes->add(['bot' => $bot]);

        return $next($request);
    }
}
