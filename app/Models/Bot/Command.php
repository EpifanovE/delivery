<?php

declare(strict_types=1);

namespace App\Models\Bot;

use App\Models\Subscriber\Subscriber;
use App\Services\Telegram\BotTypes\BotType;
use Request;

abstract class Command  extends \Telegram\Bot\Commands\Command
{
    protected BotType $botType;

    protected ?Subscriber $subscriber = null;

    public function __construct(BotType $botType)
    {
        $this->botType = $botType;
        $this->subscriber = Request::get('subscriber');
    }
}
