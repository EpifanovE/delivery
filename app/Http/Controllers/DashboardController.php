<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\DashboardRequest;
use App\Models\LogEvent\Code;
use App\Models\LogEvent\LogEvent;
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

        return Inertia::render('Dashboard', [
            'subscribers' => Subscriber::query()->count(),
            'new_subscribers' => Subscriber::query()->today()->count(),
            'visits' => LogEvent::query()->today()->code(Code::Visit)->count(),
            'new_subscribers_chart' => $this->chartService->newSubscribersChart($from, $to, $detailing),
            'visits_chart' => $this->chartService->visitsChart($from, $to, $detailing),
        ]);
    }


}
