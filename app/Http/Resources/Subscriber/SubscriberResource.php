<?php

declare(strict_types=1);

namespace App\Http\Resources\Subscriber;

use App\Http\Resources\Bot\BotCollectionResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SubscriberResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'tid' => $this->tid,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'username' => $this->username,
            'language_code' => $this->language_code,
            'is_premium' => $this->is_premium,
            'added_to_attachment_menu' => $this->added_to_attachment_menu,
            'is_blocked' => $this->is_blocked,
            'is_bot' => $this->is_bot,
            'bots' => BotCollectionResource::collection($this->bots),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
