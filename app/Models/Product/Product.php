<?php

namespace App\Models\Product;

use App\Contracts\HasImage;
use App\Models\Attachment\Attachment;
use App\Models\Order\Order;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

class Product extends Model implements HasImage, Sortable
{
    use HasFactory, SortableTrait;

    protected $fillable = [
        'name',
        'price',
        'is_active',
        'description',
        'attributes',
        'order_column',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'attributes' => 'array',
    ];

    protected static function booted()
    {
        static::deleted(function ($service) {
            if (!empty($service->image)) {
                $service->image->delete();
            }
        });
    }

    public function getPriceAttribute($value)
    {
        return $value / 100;
    }

    public function setPriceAttribute($value)
    {
        $this->attributes['price'] = $value * 100;
    }

    public function image(): BelongsTo
    {
        return $this->belongsTo(Attachment::class, 'attachment_id');
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function scopeSearch(Builder $query, string $search)
    {
        $query
            ->where('id', $search)
            ->orWhere('name', 'like', '%' . $search . '%');
    }

    public function scopeActive(Builder $query)
    {
        $query
            ->where('is_active', true);
    }
}
