<?php

namespace Database\Seeders;

use App\Models\Subscriber\Subscriber;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscriberSeeder extends Seeder
{
    public function run()
    {
        Subscriber::factory()
            ->count(1500)
            ->create()
            ->each(function (Subscriber $subscriber) {
                $subscriber->bots()->attach(1);
            });
    }
}
