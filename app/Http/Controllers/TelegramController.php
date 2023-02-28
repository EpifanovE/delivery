<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Bot\Bot;

class TelegramController
{
    public function handle(string $token)
    {
        /**
         * @var Bot $bot
         */
        $bot = Bot::where('token', $token)->firstOrFail();
        $bot->handle();
    }
}
