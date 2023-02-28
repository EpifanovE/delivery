<?php

namespace Database\Seeders;

use App\Models\LogEvent\LogEvent;
use Illuminate\Database\Seeder;

class LogEventSeeder extends Seeder
{
    public function run()
    {
        LogEvent::factory()->count(500)->create();
    }
}
