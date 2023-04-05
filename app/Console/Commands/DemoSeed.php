<?php

namespace App\Console\Commands;

use App\Commands\User\UserCreate;
use App\Models\LogEvent\Code;
use App\Models\LogEvent\LogEvent;
use App\Models\Order\Order;
use App\Models\Subscriber\Subscriber;
use Carbon\Carbon;
use Illuminate\Console\Command;

class DemoSeed extends Command
{
    protected $signature = 'app:seed';

    protected $description = 'Demo seed';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        if (!config('app.demo')) {
            return;
        }

        $subscribersCount = random_int(3,9);
        Subscriber::factory()->count($subscribersCount)->create([
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ])->each(function (Subscriber $subscriber) {
            LogEvent::factory()->count(1)->create([
                'code' => Code::Start,
                'bot_id' => 1,
                'subscriber_id' => $subscriber->id,
                'created_at' => $subscriber->created_at,
            ]);
        });

        $eventsCount = random_int(9,19);
        LogEvent::factory()->count($eventsCount)->create([
            'code' => Code::Visit,
            'created_at' => Carbon::now(),
        ]);

        $ordersCount = random_int(2,7);
        Order::factory()->count($ordersCount)->create([
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
