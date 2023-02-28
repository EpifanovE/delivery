<?php

declare(strict_types=1);

namespace App\Commands\Bot;

use App\Models\Bot\Bot;

class BotCreate
{
    public function handle(array $data): Bot
    {
        $bot = Bot::create($data);

        return $bot;
    }
}
