<?php

declare(strict_types=1);

namespace App\Http\Resources\Subscriber;

use Illuminate\Http\Resources\Json\JsonResource;

class SubscriberResourceCollectionItem extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'tid' => $this->tid,
            'first_name' => $this->first_name,
            'username' => $this->username,
            'is_blocked' => $this->is_blocked,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
