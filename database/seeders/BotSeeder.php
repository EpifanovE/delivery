<?php

namespace Database\Seeders;

use App\Models\Bot\Bot;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Bot::factory()->count(1)->create([
            'name' => 'Первый бот',
            'type' => 'delivery',
            'token' => env('BOT_TOKEN'),
        ]);

        Bot::factory()->count(1)->create([
            'name' => 'Второй бот',
            'type' => 'delivery',
            'token' => 'token123',
        ]);
    }
}
