<?php

namespace App\Models\Order;

use App\Models\Bot\Bot;
use App\Models\Product\Product;
use App\Models\Subscriber\Subscriber;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'total',
        'product_id',
        'subscriber_id',
        'bot_id',
        'details',
        'status',
        'notes',
    ];

    protected $casts = [
        'details' => 'array',
        'status' => Status::class,
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function subscriber(): BelongsTo
    {
        return $this->belongsTo(Subscriber::class);
    }
    public function bot(): BelongsTo
    {
        return $this->belongsTo(Bot::class);
    }

    public function scopePending(Builder $query)
    {
        $query->where('status', Status::Pending);
    }

    public function scopeStatus(Builder $query, string $status)
    {
        $query
            ->where('status', $status);
    }

    public function scopeSearch(Builder $query, string $search)
    {
        $query
            ->where('id', $search)
            ->orWhereHas('product', function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%');
            });
    }

    public function scopeToday(Builder $query)
    {
        $query->whereDate('created_at', Carbon::today())->get();
    }

    public function scopeBot(Builder $query, ?int $botId = null)
    {
        if (!empty($botId)) {
            $query->where('bot_id', $botId);
        }
    }
}
