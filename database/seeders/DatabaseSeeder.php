<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         \App\Models\User\User::factory(10)->create();

         \App\Models\User\User::factory()->create([
             'name' => 'Евгений Епифанов',
             'email' => 'workeev@gmail.com',
             'is_super' => true,
         ]);

         $this->call(BotSeeder::class);
         $this->call(SubscriberSeeder::class);
         $this->call(LogEventSeeder::class);
    }
}
