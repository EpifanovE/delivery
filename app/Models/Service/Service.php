<?php

namespace App\Models\Service;

use App\Contracts\HasImage;
use App\Models\Attachment\Attachment;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\EloquentSortable\Sortable;
use Spatie\EloquentSortable\SortableTrait;

class Service extends Model implements HasImage, Sortable
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