<?php

declare(strict_types=1);

namespace App\Services\Telegram\BotTypes\DeliveryType;

use App\Models\Bot\Bot;
use App\Services\Telegram\BotTypes\BotType;
use App\Services\Telegram\BotTypes\DeliveryType\Commands\StartCommand;
use Telegram\Bot\Api;

class DeliveryType extends BotType
{
    protected Api $api;

    public function __construct(Bot $bot)
    {
        parent::__construct($bot);
        $this->api = new Api($bot->token);
        $this->api->addCommands($this->getCommands());
    }

    public function handle(): void
    {
        $this->api->commandsHandler(true);
    }

    public function getCommandsList(): array
    {
        return [
            [
                'command' => '/start',
                'description' => 'Начало работы с ботом.',
            ],
        ];
    }

    protected function getCommands(): array
    {
        return [
            new StartCommand($this),
        ];
    }
}
