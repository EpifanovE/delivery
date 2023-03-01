<?php

namespace App\Models\LogEvent;

use App\Models\Bot\Bot;
use App\Models\Subscriber\Subscriber;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class LogEvent extends Model
{
    use HasFactory;

    public $timestamps = ["created_at"];

    const UPDATED_AT = null;

    protected $fillable = [
        "code",
        "payload",
        "subscriber_id",
        "bot_id",
        "created_at",
    ];

    protected $casts = [
        'code' => Code::class,
    ];

    public function subscriber(): BelongsTo
    {
        return $this->belongsTo(Subscriber::class);
    }

    public function bot(): BelongsTo
    {
        return $this->belongsTo(Bot::class);
    }

    public function scopeBot(Builder $query, ?int $botId = null)
    {
        if (!empty($botId)) {
            $query->where('bot_id', $botId);
        }
    }

    public function scopeCode(Builder $query, Code $code)
    {
        $query
            ->where('code', $code->value);
    }

    public function scopeToday(Builder $query)
    {
        $query->whereDate('created_at', Carbon::today())->get();
    }
}
