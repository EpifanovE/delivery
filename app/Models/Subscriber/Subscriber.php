<?php

namespace App\Models\Subscriber;

use App\Models\Bot\Bot;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;

class Subscriber extends Model
{
    use HasFactory;

    protected $fillable = [
        'tid',
        'first_name',
        'last_name',
        'username',
        'language_code',
        'is_premium',
        'added_to_attachment_menu',
        'is_blocked',
        'is_bot',
    ];

    protected $casts = [
        'is_premium' => 'boolean',
        'added_to_attachment_menu' => 'boolean',
        'is_blocked' => 'boolean',
        'is_bot' => 'boolean',
    ];

    public function bots(): BelongsToMany
    {
        return $this->belongsToMany(Bot::class);
    }

    public function toggleBlock(): void
    {
        $this->is_blocked = !$this->is_blocked;
        $this->save();
    }

    public function scopeBot(Builder $query, ?int $botId = null)
    {
        if (!empty($botId)) {
            $query->whereHas('bots', function(Builder $query) use ($botId) {
                $query->where('id', $botId);
            });
        }
    }

    public function scopeSearch(Builder $query, string $search)
    {
        $query
            ->where('id', $search)
            ->orWhere('tid', $search)
            ->orWhere('first_name', 'like', '%' . $search . '%')
            ->orWhere('last_name','like', '%' . $search . '%')
            ->orWhere('username','like', '%' . $search . '%');
    }

    public function scopeToday(Builder $query)
    {
        $query->whereDate('created_at', Carbon::today())->get();
    }
}
