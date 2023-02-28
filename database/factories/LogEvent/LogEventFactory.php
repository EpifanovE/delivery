<?php

namespace Database\Factories\LogEvent;

use App\Models\LogEvent\Code;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LogEvent\LogEvent>
 */
class LogEventFactory extends Factory
{
    public function definition()
    {
        $date = $this->faker->dateTimeBetween("-1 month", now());

        return [
            'code' => Code::Visit,
            'subscriber_id' => $this->faker->numberBetween(1, 50),
            'created_at' => $date,
        ];
    }
}
