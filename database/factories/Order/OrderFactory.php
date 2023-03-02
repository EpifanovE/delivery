<?php

namespace Database\Factories\Order;

use App\Models\Order\Status;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order\Order>
 */
class OrderFactory extends Factory
{
    public function definition()
    {
        $date = $this->faker->dateTimeBetween('-7 days');

        return [
            "total" => $this->faker->numberBetween(2000, 5000),
            "product_id" => $this->faker->numberBetween(1,6),
            "subscriber_id" => $this->faker->numberBetween(1,50),
            'bot_id' => $this->faker->randomElement([1,2]),
            "details" => [],
            'status' => $this->faker->randomElement([Status::Pending, Status::Process, Status::Done]),
            'created_at' => $date,
            'updated_at' => $date,
        ];
    }
}
