<?php

declare(strict_types=1);

namespace App\Commands\Order;

use App\Models\Order\Order;

class OrderUpdate
{
    public function handle(Order $order, array $data): Order
    {
        $order->fill($data);
        $order->save();

        return $order;
    }
}
