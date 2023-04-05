import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/react';
import {FC, useEffect,} from "react";
import * as React from "react";
import PageTitle from '../Components/PageTitle';
import i18next from "i18next";
import Button from "../Components/Button";
import {useTranslation} from "react-i18next";
import SelectInput from "../Components/SelectInput";
import TextInput from "../Components/TextInput";
import moment, {Moment} from "moment";
import {useForm} from "@inertiajs/react";
import { useSpring, animated } from '@react-spring/web';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {BotServerCollectionItem} from "../types/bots";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type ChartData = {
    labels: string[]
    values: number[]
}

type DashboardProps = {
    auth?: any
    errors?: any
    bots: {
        data: BotServerCollectionItem[]
    }
    orders_today: number,
    subscribers: number
    new_subscribers: number
    visits: number,
    orders_chart: ChartData
    new_subscribers_chart: ChartData
    visits_chart: ChartData
}

export type Period = 'week' | 'month' | 'quarter' | 'year' | 'custom'

export type Detailing = 'day' | 'month'

const Dashboard: FC<DashboardProps> = (props) => {

    const {t} = useTranslation();

    const {
        bots,
        orders_today,
        subscribers,
        new_subscribers,
        visits,
        orders_chart,
        new_subscribers_chart,
        visits_chart,
    } = props;

    const {
        data: {bot, period, detailing, from, to},
        setData,
        post,
        transform,
    } = useForm<{ [key: string]: any }>({
        bot: '',
        period: 'week',
        detailing: 'day',
        from: null,
        to: moment(),
    });

    const ordersProps = useSpring({ val: orders_today, from: { val: 0 }, config: {duration: 300} });
    const subscribersProps = useSpring({ val: subscribers, from: { val: 0 }, config: {duration: 300} });
    const newSubscribersProps = useSpring({ val: new_subscribers, from: { val: 0 }, config: {duration: 300} });
    const visitsProps = useSpring({ val: visits, from: { val: 0 }, config: {duration: 300} });

    useEffect(() => {

        if (!period) return;

        if (period === 'week') {
            setData({
                to,
                period,
                from: moment().subtract(7, 'days'),
                detailing: 'day'
            });
        }

        if (period === 'month') {
            setData({
                to,
                period,
                from: moment().subtract(1, 'months'),
                detailing: 'day'
            });
        }

        if (period === 'quarter') {
            setData('from', moment().subtract(3, 'months'));
        }

        if (period === 'year') {
            setData('from', moment().subtract(1, 'years'));
        }


    }, [period]);

    transform((data) => {
        return {
            bot,
            detailing,
            from: data.from.format('YYYY-MM-DD'),
            to: data.to.format('YYYY-MM-DD'),
        }
    });

    const handleChangePeriod = (period: Period) => {
        setData('period', period);
    }

    const handleDetailingChange = (detailing: Detailing) => {
        setData('detailing', detailing);
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!!e.target.value) {
            setData('period', null);
        }

        switch (e.target.name) {
            case 'from':
                setData('from', e.target.value ? moment(e.target.value) : null);
                break;
            case 'to':
                setData('to', e.target.value ? moment(e.target.value) : null);
                break;
        }
    }

    const periodMoreThanMonth = (): boolean => {
        if (from === null || to === null) return true;

        const diff = to?.diff(from, 'days');

        return !!diff && diff > 31;
    }

    const handleApplyClick = () => {
        post(route(`dashboard`));
    }

    const getChartOptions = (title: string) => {
        return {
            responsive: true,
            aspectRatio: 2.5,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: title,
                },
            },
        };
    }

    return (
        <>
            <Head title={t('dashboard') as string}/>

            <div className="py-12">
                <div
                    className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-12 flex flex-wrap grid grid-cols-1 lg:grid-cols-4 gap-8">

                    <div className='p-8 bg-blue-300 w-full shadow rounded-sm text-gray-800 col-12 lg:col-4'>
                        <p className='uppercase text-gray-600 font-semibold mb-2'>{t('orders')}</p>
                        <h2 className='text-5xl font-semibold mb-2'>
                            <animated.div>
                                {ordersProps.val.interpolate(val => Math.floor(val))}
                            </animated.div>
                        </h2>
                        <p className='text-gray-600 lowercase'>{t('for_today')}</p>
                    </div>

                    <div className='p-8 bg-red-300 w-full shadow rounded-sm text-gray-800'>
                        <p className='uppercase text-gray-600 font-semibold mb-2'>{t('subscribers')}</p>
                        <h2 className='text-5xl font-semibold mb-2'>
                            <animated.div>
                                {subscribersProps.val.interpolate(val => Math.floor(val))}
                            </animated.div>
                        </h2>
                        <p className='text-gray-600 lowercase'>{t('total')}</p>
                    </div>

                    <div className='p-8 bg-orange-300 w-full shadow rounded-sm text-gray-800 col-12 lg:col-4'>
                        <p className='uppercase text-gray-600 font-semibold mb-2'>{t('subscribers')}</p>
                        <h2 className='text-5xl font-semibold mb-2'>
                            <animated.div>
                                {newSubscribersProps.val.interpolate(val => Math.floor(val))}
                            </animated.div>
                        </h2>
                        <p className='text-gray-600 lowercase'>{t('for_today')}</p>
                    </div>

                    <div className='p-8 bg-green-300 w-full shadow rounded-sm text-gray-800 col-12 lg:col-4'>
                        <p className='uppercase text-gray-600 font-semibold mb-2'>{t('visits')}</p>
                        <h2 className='text-5xl font-semibold mb-2'>
                            <animated.div>
                                {visitsProps.val.interpolate(val => Math.floor(val))}
                            </animated.div>
                        </h2>
                        <p className='text-gray-600 lowercase'>{t('for_today')}</p>
                    </div>

                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-12">
                    <div
                        className="bg-white overflow-hidden shadow rounded-sm p-8 flex flex-col lg:flex-row flex-wrap gap-4">

                        <div>
                            <SelectInput
                                value={bot}
                                handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => setData('bot', e.target.value)}
                                defaultValue={bot}
                            >
                                <option value="">{t('all_bots')}</option>
                                {
                                    bots && bots.data.map(bot => <option value={bot.id} key={bot.id}>{bot.name}</option>)
                                }
                            </SelectInput>
                        </div>

                        <div>

                            <SelectInput
                                value={period}
                                handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChangePeriod(e.target.value as Period)}
                                defaultValue={period}
                            >
                                <option value="">{t('custom_period')}</option>
                                <option value="week">{t('week')}</option>
                                <option value="month">{t('month')}</option>
                                <option value="quarter">{t('quarter')}</option>
                                <option value="year">{t('year')}</option>
                            </SelectInput>

                        </div>

                        <div className='flex gap-2'>
                            <div className='flex gap-2 items-center'>
                                <label htmlFor='date_from'>{t('date_from')}</label>
                                <TextInput
                                    id={'date_from'}
                                    value={!!from ? (from as Moment).format('YYYY-MM-DD') : ''}
                                    handleChange={handleDateChange}
                                    type='date'
                                    name={'from'}
                                    disabled={period !== ''}
                                />
                            </div>

                            <div className='flex gap-2 items-center'>
                                <label htmlFor='date_to'>{t('date_to')}</label>
                                <TextInput
                                    id={'date_to'}
                                    value={!!to ? (to as Moment).format('YYYY-MM-DD') : ''}
                                    handleChange={handleDateChange}
                                    type='date'
                                    name={'to'}
                                    disabled={period !== ''}
                                />
                            </div>
                        </div>

                        <SelectInput
                            value={detailing}
                            handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleDetailingChange(e.target.value as Detailing)}
                            defaultValue={detailing}
                        >
                            <option value="day">{t('detailing')}: {t('day')}</option>
                            <option
                                value="month"
                                disabled={!periodMoreThanMonth()}
                            >
                                {t('detailing')}: {t('month')}
                            </option>
                        </SelectInput>

                        <Button
                            variant={'primary'}
                            onClick={handleApplyClick}
                        >
                            {t('buttons.apply')}
                        </Button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-12">
                    <div className="bg-white overflow-hidden shadow rounded-sm p-3 lg:p-8 flex gap-8">
                        <Line
                            options={getChartOptions(t('orders'))}
                            data={{
                                labels: orders_chart.labels,
                                datasets: [
                                    {
                                        data: orders_chart.values,
                                        borderColor: '#27ae60',
                                        backgroundColor: '#27ae60',
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-12">
                    <div className="bg-white overflow-hidden shadow rounded-sm p-3 lg:p-8 flex gap-8">
                        <Line
                            options={getChartOptions(t('new_subscribers'))}
                            data={{
                                labels: new_subscribers_chart.labels,
                                datasets: [
                                    {
                                        data: new_subscribers_chart.values,
                                        borderColor: '#2980b9',
                                        backgroundColor: '#2980b9',
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow rounded-sm p-3 lg:p-8 flex gap-8">
                        <Line
                            options={getChartOptions(t('visits'))}
                            data={{
                                labels: visits_chart.labels,
                                datasets: [
                                    {
                                        data: visits_chart.values,
                                        borderColor: '#e74c3c',
                                        backgroundColor: '#e74c3c',
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

//@ts-ignore
Dashboard.layout = page => <AuthenticatedLayout
    children={page}
    {...page.props}
    header={<PageTitle>{i18next.t('dashboard')}</PageTitle>}
/>

export default Dashboard;
