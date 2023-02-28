<?php

namespace App\Services\Telegram\BotTypes;

use App\Models\Bot\Bot;

abstract class BotType
{
    protected Bot $bot;

    public function __construct(Bot $bot)
    {
        $this->bot = $bot;
    }

    abstract public function handle(): void;

    public function getBot(): Bot
    {
        return $this->bot;
    }
}
