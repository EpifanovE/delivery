<?php

declare(strict_types=1);

namespace App\Models\Bot;

use App\Services\Telegram\BotTypes\BotType;

abstract class Command  extends \Telegram\Bot\Commands\Command
{
    protected BotType $botType;

    public function __construct(BotType $botType)
    {
        $this->botType = $botType;
    }
}
