import * as React from "react";
import {FC,} from "react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import {PageProps, ServerCollectionResponse,} from "../../types/general";
import PageTitle from "../../Components/PageTitle";
import i18next from "i18next";
import IndexPage, {FiltersProps, SearchFilter} from "../../Components/IndexPage/IndexPage";
import {useTranslation} from "react-i18next";
import {Head, } from "@inertiajs/react";
import {OrderServerCollectionItem} from "../../types/orders";
import moment from "moment/moment";
import InputLabel from "../../Components/InputLabel";
import TextInput from "../../Components/TextInput";
import InputError from "../../Components/InputError";
import SelectInput from "../../Components/SelectInput";

type OrdersIndexProps = {
    items: ServerCollectionResponse<OrderServerCollectionItem>
} & PageProps

export const orderStatusClasses = (status: string): string => {
    const classes = {
        pending: 'bg-red-700',
        process: 'bg-amber-600',
        cancel: 'bg-slate-500',
        done: 'bg-green-800',
    }

    //@ts-ignore
    return classes[status] || '';
}

export const OrderStatus = ({status, className}: {status: string, className?: string}) => {

    const {t} = useTranslation();

    return (
        <span
            className={`px-2 rounded-sm text-sm text-gray-50 ${orderStatusClasses(status)}${className ? ' ' + className : ''}`}
        >
            {t(`statuses.${status}`, {context: 'order'})}
        </span>
    )
}

export const Filters: FC<FiltersProps> = (props) => {
    const {t} = useTranslation();

    const {filters, onChange, errors} = props

    return (
        <div className='mb-4'>
            <div className='pl-4 pr-4 mb-3'>
                <InputLabel forInput="search" value={t('search') as string}/>

                <TextInput
                    id="search"
                    name="s"
                    value={filters.s || ''}
                    className="mt-1 block w-full"
                    handleChange={e => onChange('s', e.target.value)}
                />

                {
                    errors?.s &&
                    <InputError message={errors.s} className="mt-2"/>
                }
            </div>

            <div className='pl-4 pr-4'>
                <InputLabel forInput="search" value={t('status') as string}/>

                <SelectInput
                    value={filters.status}
                    handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange('status', e.target.value)}
                    id={'status'}
                    className={'w-full'}
                >
                    <option value="">{t('no')}</option>
                    <option value="pending">{t('statuses.pending', {context: 'order'})}</option>
                    <option value="process">{t('statuses.process', {context: 'order'})}</option>
                    <option value="cancel">{t('statuses.cancel', {context: 'order'})}</option>
                    <option value="done">{t('statuses.done', {context: 'order'})}</option>
                </SelectInput>

                {
                    errors?.s &&
                    <InputError message={errors.status} className="mt-2"/>
                }
            </div>
        </div>
    )
}

const OrdersIndex: FC<OrdersIndexProps> = (props) => {
    const {t} = useTranslation();
    return <>
        <Head title={t('orders') as string} />
        <IndexPage
            resource={'orders'}
            modelName={'order'}
            items={props.items}
            columns={[
                {
                    resource: 'id',
                    label: 'ID',
                    sortable: true,
                },
                {
                    resource: 'product',
                    label: t('product') as string,
                    itemRender: (item: OrderServerCollectionItem) => (<>{item.product?.name}</>)
                },
                {
                    resource: 'total',
                    label: t('sum') as string,
                    itemRender: (item: OrderServerCollectionItem) => (<>{item.total.toFixed(2)} {t('rub')}</>),
                    sortable: true,
                },
                {
                    resource: 'status',
                    label: t('status') as string,
                    itemRender: (item: OrderServerCollectionItem) => <OrderStatus status={item.status} />,
                    sortable: true,
                },
                {
                    resource: 'created_at',
                    label: t('created_at', {context: 'male'}) as string,
                    sortable: true,
                    itemRender: (item: OrderServerCollectionItem) => <>{moment(item.created_at).format('DD-MM-YY HH:mm')}</>,
                },
            ]}
            Filters={Filters}
            // Actions={Actions}
        />
    </>
}

//@ts-ignore
OrdersIndex.layout = page => <AuthenticatedLayout
    children={page}
    {...page.props}
    header={<PageTitle>{i18next.t('orders')}</PageTitle>}
/>

export default OrdersIndex;
