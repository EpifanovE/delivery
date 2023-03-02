<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\DashboardRequest;
use App\Http\Resources\Bot\BotCollectionResource;
use App\Models\Bot\Bot;
use App\Models\LogEvent\Code;
use App\Models\LogEvent\LogEvent;
use App\Models\Order\Order;
use App\Models\Subscriber\Subscriber;
use App\Services\Chart\ChartService;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{

    private ChartService $chartService;

    public function __construct(ChartService $chartService)
    {
        $this->chartService = $chartService;
    }

    public function index(DashboardRequest $request)
    {
        $data = $request->validated();

        $from = !empty($data['from']) ? Carbon::parse($data['from'])->startOfDay() : Carbon::now()->subDays(7)->startOfDay();
        $to = !empty($data['to']) ? Carbon::parse($data['to'])->endOfDay() : Carbon::now()->endOfDay();
        $detailing = $data['detailing'] ?? 'day';
        $botId = !empty($data['bot']) ? (int)$data['bot'] : null;

        return Inertia::render('Dashboard', [
            'bots' => BotCollectionResource::collection(Bot::all()),
            'orders_today' => Order::query()->today()->count(),
            'subscribers' => Subscriber::query()->bot($botId)->count(),
            'new_subscribers' => Subscriber::query()->today()->bot($botId)->count(),
            'visits' => LogEvent::query()->today()->code(Code::Visit)->bot($botId)->count(),
            'orders_chart' => $this->chartService->ordersChart($from, $to, $detailing, $botId),
            'new_subscribers_chart' => $this->chartService->newSubscribersChart($from, $to, $detailing, $botId),
            'visits_chart' => $this->chartService->visitsChart($from, $to, $detailing, $botId),
        ]);
    }


}
