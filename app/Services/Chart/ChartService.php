<?php

declare(strict_types=1);

namespace App\Services\Chart;

use App\Models\LogEvent\Code;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

/**
 * Формирование графиков
 */
class ChartService
{
    /**
     * Формат даты для дней
     */
    const DATE_FORMAT = 'd-m-Y';

    /**
     * Формат даты для месяцев
     */
    const MONTHS_FORMAT = 'M. Y';

    /**
     * Формирование графика заказов
     *
     * @param Carbon $from Начало интервала
     * @param Carbon $to Конец интервала
     * @param string $detailing Детализация: day, month
     * @return array
     */
    public function ordersChart(Carbon $from, Carbon $to, string $detailing = 'day', ?int $botId = null): array
    {
        $query = DB::table('orders');

        if (!empty($botId)) {
            $query->where('bot_id', $botId);
        }

        return $this->createChartData($query, $from, $to, $detailing);
    }

    /**
     * Формирование графика новых подписчиков
     *
     * @param Carbon $from Начало интервала
     * @param Carbon $to Конец интервала
     * @param string $detailing Детализация: day, month
     * @return array
     */
    public function newSubscribersChart(Carbon $from, Carbon $to, string $detailing = 'day', ?int $botId = null): array
    {
        $query = DB::table('log_events')
            ->where('code', Code::Start->value);

        if (!empty($botId)) {
            $query->where('bot_id', $botId);
        }

        return $this->createChartData($query, $from, $to, $detailing);
    }

    /**
     * Формирование графика уникальных посетителей
     *
     * @param Carbon $from Начало интервала
     * @param Carbon $to Конец интервала
     * @param string $detailing Детализация: day, month
     * @return array
     */
    public function visitsChart(Carbon $from, Carbon $to, string $detailing = 'day', ?int $botId = null): array
    {
        $query = DB::table('log_events')
            ->where('code', Code::Visit->value);

        if (!empty($botId)) {
            $query->where('bot_id', $botId);
        }


        return $this->createChartData($query, $from, $to, $detailing);
    }

    /**
     * Формирование данных для графика
     *
     * @param Builder $builder Начальный запрос
     * @param Carbon $from Начало интервала
     * @param Carbon $to Конец интервала
     * @param string $detailing Детализация: day, month
     * @return array
     */
    private function createChartData(Builder $builder, Carbon $from, Carbon $to, string $detailing = 'day'): array
    {
        $builder->whereBetween('created_at', [$from, $to]);

        if ($detailing === 'day') {
            $builder
                ->select(DB::raw('COUNT(*) as count, DATE(created_at) as created'))
                ->groupBy(DB::raw('DATE(created_at)'))
                ->orderBy('created');
        } else {
            $builder
                ->select(DB::raw('COUNT(*) as count, MONTH(created_at) as month, YEAR(created_at) as year'))
                ->groupBy(DB::raw('YEAR(created_at), MONTH(created_at)'))
                ->orderBy(DB::raw('year, month'));
        }

        $res = $builder->get()->toArray();

        $labels = $detailing === 'day' ? $this->datesArray($from, $to) : $this->monthsArray($from, $to);

        return [
            'labels' => $labels,
            'values' => array_values($detailing === 'day' ? $this->daysValue($labels, $res) : $this->monthsValue($labels, $res)),
        ];
    }

    /**
     * Привязка полученных из БД данных к массиву дней в заданном промежутке
     *
     * Если для указанного дня не найдено результатов в выгрузке, то устанавливается 0
     *
     * @param array $labels Метки дней в заданном формате
     * @param array $queryResult Результаты выгрузки из БД
     * @return array
     */
    private function daysValue(array $labels, array $queryResult): array
    {
        $values = [];

        foreach ($labels as $label) {
            $values[$label] = 0;
        }

        foreach ($queryResult as $dayValue) {
            $formatDate = Carbon::parse($dayValue->created)->format(self::DATE_FORMAT);
            $values[$formatDate] = $dayValue->count;
        }

        return $values;
    }

    /**
     * Привязка полученных из БД данных к массиву месяцев в заданном промежутке
     *
     * Если для указанного месяца не найдено результатов в выгрузке, то устанавливается 0
     *
     * @param array $labels Метки дней в заданном формате
     * @param array $queryResult Результаты выгрузки из БД
     * @return array
     */
    private function monthsValue(array $labels, array $queryResult): array
    {
        $values = [];

        foreach ($labels as $label) {
            $values[$label] = 0;
        }

        foreach ($queryResult as $monthValue) {
            $formatDate = Carbon::createFromFormat('m-Y', $monthValue->month . '-' . $monthValue->year)->translatedFormat(self::MONTHS_FORMAT);
            $values[$formatDate] = $monthValue->count;
        }

        return $values;
    }

    /**
     * Построение дней месяцев в заданном промежутке
     *
     * @param Carbon $from
     * @param Carbon $to
     * @return array
     */
    private function datesArray(Carbon $from, Carbon $to): array
    {
        $start = $from->toImmutable();
        $end = $to->toImmutable();

        $array = [
            $start->format(self::DATE_FORMAT),
        ];

        for ($i = 1; $i < $start->diffInDays($end); $i++) {
            $array[] = $start->addDays($i)->format(self::DATE_FORMAT);
        }

        $array[] = $end->format(self::DATE_FORMAT);

        return $array;
    }

    /**
     * Построение массива месяцев в заданном промежутке
     *
     * @param Carbon $from
     * @param Carbon $to
     * @return array
     */
    private function monthsArray(Carbon $from, Carbon $to)
    {
        $start = $from->toImmutable();
        $end = $to->toImmutable();

        $diff = $start->startOfMonth()->diffInMonths($end->startOfMonth());

        $array = [];

        for ($i = 0; $i <= $diff; $i++) {
            $array[] = $start->addMonthsNoOverflow($i)->translatedFormat(self::MONTHS_FORMAT);
        }

        return $array;
    }
}
