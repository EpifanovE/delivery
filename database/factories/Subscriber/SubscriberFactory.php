<?php

namespace Database\Factories\Subscriber;

use App\Models\Subscriber\Subscriber;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscriber\Subscriber>
 */
class SubscriberFactory extends Factory
{
    protected $model = Subscriber::class;

    public function definition()
    {
        $date = $this->faker->dateTimeBetween("-18 months", now());
        return [
            "tid" => $this->faker->numberBetween(100, 999),
            "first_name" => $this->faker->name,
            "last_name" => $this->faker->lastName,
            "username" => $this->faker->userName,
            "language_code" => "ru",
            "is_blocked" => false,
            "is_bot" => false,
            "is_premium" => false,
            "added_to_attachment_menu" => false,
            "created_at" => $date,
            "updated_at" => $date,
        ];
    }

    public function subMonths(int $number)
    {
        return $this->state(function (array $attributes) use ($number) {

            $month = Carbon::now()->subMonths($number);
            $start = $month->startOfMonth()->toString();
            $end = $month->endOfMonth()->toString();

            if ($number === 0) {
                $end = Carbon::now()->toString();
            }

            return [
                "created_at" => $this->faker->dateTimeBetween($start, $end)
            ];
        });
    }

    public function subDays(int $number)
    {
        return $this->state(function (array $attributes) use ($number) {

            $day = Carbon::now()->subDays($number);

            return [
                "created_at" => $day,
            ];
        });
    }

    public function createdAt(string $start, string $end = null)
    {
        $created_at = !empty($end) ?
            $this->faker->dateTimeBetween($start, $end) : $start;

        return $this->state(function (array $attributes) use ($created_at) {
            return [
                "created_at" => $created_at,
            ];
        });
    }
}
