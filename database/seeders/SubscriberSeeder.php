<?php

namespace Database\Seeders;

use App\Models\LogEvent\Code;
use App\Models\LogEvent\LogEvent;
use App\Models\Subscriber\Subscriber;
use Illuminate\Database\Seeder;

class SubscriberSeeder extends Seeder
{
    public function run()
    {
        Subscriber::factory()
            ->count(1500)
            ->create()
            ->each(function (Subscriber $subscriber) {

                $botIds = [1, 2];

                $bots = random_int(0, 2);

                if ($bots === 1) {
                    unset($botIds[1]);
                }

                if ($bots === 2) {
                    unset($botIds[0]);
                }

                $subscriber->bots()->sync($botIds);

                foreach ($botIds as $botId) {
                    LogEvent::factory()->count(1)->create([
                        'code' => Code::Start,
                        'bot_id' => $botId,
                        'subscriber_id' => $subscriber->id,
                        'created_at' => $subscriber->created_at,
                    ]);
                }
            });
    }
}
