<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Bot\Bot;
use App\Models\Subscriber\Subscriber;

class TelegramController
{
    public function handle(string $token)
    {
        /**
         * @var Bot $bot
         */
        $bot = Bot::where('token', $token)->firstOrFail();

        /**
         * @var Subscriber $subscriber
         */
        $subscriber = \Request::get('subscriber');

        $subscriber->bots()->syncWithoutDetaching([$bot->id]);

        $bot->handle();
    }
}
