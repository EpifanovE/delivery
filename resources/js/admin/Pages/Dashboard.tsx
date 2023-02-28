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
    subscribers: number
    new_subscribers: number
    visits: number,
    new_subscribers_chart: ChartData
    visits_chart: ChartData
}

export type Period = 'week' | 'month' | 'quarter' | 'year' | 'custom'

export type Detailing = 'day' | 'month'

const Dashboard: FC<DashboardProps> = (props) => {

    const {t} = useTranslation();

    const {
        subscribers,
        new_subscribers,
        visits,
        new_subscribers_chart,
        visits_chart,
    } = props;

    const {
        data: {period, detailing, from, to},
        setData,
        post,
        transform,
    } = useForm<{ [key: string]: any }>({
        period: 'week',
        detailing: 'day',
        from: null,
        to: moment(),
    });

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
                    className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-12 flex flex-wrap grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className='p-8 bg-red-300 w-full shadow rounded-sm text-gray-800'>
                        <p className='uppercase text-gray-600 font-semibold mb-2'>{t('subscribers')}</p>
                        <h2 className='text-5xl font-semibold mb-2'>
                            {subscribers}
                        </h2>
                        <p className='text-gray-600 lowercase'>{t('total')}</p>
                    </div>

                    <div className='p-8 bg-orange-300 w-full shadow rounded-sm text-gray-800 col-12 lg:col-4'>
                        <p className='uppercase text-gray-600 font-semibold mb-2'>{t('subscribers')}</p>
                        <h2 className='text-5xl font-semibold mb-2'>{new_subscribers}</h2>
                        <p className='text-gray-600 lowercase'>{t('for_today')}</p>
                    </div>

                    <div className='p-8 bg-green-300 w-full shadow rounded-sm text-gray-800 col-12 lg:col-4'>
                        <p className='uppercase text-gray-600 font-semibold mb-2'>{t('visits')}</p>
                        <h2 className='text-5xl font-semibold mb-2'>{visits}</h2>
                        <p className='text-gray-600 lowercase'>{t('for_today')}</p>
                    </div>

                </div>

                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-12">
                    <div
                        className="bg-white overflow-hidden shadow rounded-sm p-8 flex flex-col lg:flex-row wrap gap-8">
                        <div>
                            <Button
                                variant={period === 'week' ? 'primary' : 'primaryOutline'}
                                className='rounded-r-0 border-r-0'
                                onClick={() => handleChangePeriod('week')}
                            >
                                {t('week')}
                            </Button>
                            <Button
                                variant={period === 'month' ? 'primary' : 'primaryOutline'}
                                className='rounded-r-0 rounded-left-0 border-r-0'
                                onClick={() => handleChangePeriod('month')}
                            >
                                {t('month')}
                            </Button>
                            <Button
                                variant={period === 'quarter' ? 'primary' : 'primaryOutline'}
                                className='rounded-r-0 rounded-left-0 border-r-0'
                                onClick={() => handleChangePeriod('quarter')}
                            >
                                {t('quarter')}
                            </Button>
                            <Button
                                variant={period === 'year' ? 'primary' : 'primaryOutline'}
                                className='rounded-left-0'
                                onClick={() => handleChangePeriod('year')}
                            >
                                {t('year')}
                            </Button>
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
