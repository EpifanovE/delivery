<?php

namespace App\Models\Bot;

use App\Exceptions\DomainException;
use App\Models\Subscriber\Subscriber;
use App\Services\Telegram\BotTypes\BotType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property string $token
 * @property string $type
 */
class Bot extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'token',
        'webhook',
        'settings',
    ];

    protected $casts = [
        'settings' => 'array'
    ];

    protected ?BotType $typeObject = null;

    public function handle()
    {
        $this->getTypeObject()->handle();
    }

    public function getCommandsList(): array
    {
        return $this->getTypeObject()->getCommandsList();
    }

    protected function getTypeObject(): BotType
    {
        if (is_null($this->typeObject)) {
            $typeClasses = config('telegram.bot_types');

            if (!isset($typeClasses[$this->type])) {
                throw new DomainException("Bot type with name {$this->type} not found.");
            }

            $this->typeObject = new $typeClasses[$this->type]($this);
        }

        return $this->typeObject;
    }

    public function subscribers(): BelongsToMany
    {
        return $this->belongsToMany(Subscriber::class);
    }

    public function getWebHookUrl(): string
    {
        return trim(config('telegram.host'), '/'). '/telegram-api/' . $this->token;
    }
}
