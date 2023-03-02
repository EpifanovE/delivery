<?php

declare(strict_types=1);

namespace App\Commands\Order;

use App\Models\Order\Order;

class OrderCreate
{
    public function handle(array $data): Order
    {

        $order = Order::create($data);

        return $order;
    }
}
