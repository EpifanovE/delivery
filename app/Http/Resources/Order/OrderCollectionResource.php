<?php

declare(strict_types=1);

namespace App\Http\Resources\Order;

use App\Http\Resources\Bot\BotCollectionResource;
use App\Http\Resources\Product\ProductCollectionResource;
use App\Http\Resources\Subscriber\SubscriberResourceCollectionItem;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderCollectionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'total' => $this->total,
            'product' => !empty($this->product) ? new ProductCollectionResource($this->product) : null,
            'subscriber' => !empty($this->subscriber) ? new SubscriberResourceCollectionItem($this->subscriber) : null,
            'bot' => !empty($this->bot) ? new BotCollectionResource($this->bot) : null,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
