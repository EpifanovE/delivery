import * as React from "react";
import {FC,} from "react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import {PageProps, ServerCollectionResponse,} from "../../types/general";
import PageTitle from "../../Components/PageTitle";
import {SubscriberServerCollectionItem} from "../../types/subscribers";
import i18next from "i18next";
import IndexPage, {ActionProps, DeleteAction, EditAction, SearchFilter} from "../../Components/IndexPage/IndexPage";
import {useTranslation} from "react-i18next";
import {Head, Link} from "@inertiajs/react";
import BlockIcon from "../../Components/Icons/BlockIcon";

type SubscribersIndexProps = {
    items: ServerCollectionResponse<SubscriberServerCollectionItem>
} & PageProps

const BlockAction: FC<ActionProps> = (props) => {
    const {t} = useTranslation();

    const title = props.item.is_blocked ? t('buttons.unblock') : t('buttons.block');

    return <Link
        as='button'
        className={`text-red-600 hover:text-red-900cursor-pointer p-4 ${props.className}`}
        href={route(`subscribers.block`, {'subscriber': props.item[props.primaryKey]})}
        method={'post'}
        onBefore={() => confirm(t('messages.confirm') as string)}
        title={title || ''}
    >
        <BlockIcon className={`${props.item.is_blocked ? 'fill-orange-600' : 'fill-slate-500'} w-4 h-4`} />
    </Link>
}

const Actions: FC<ActionProps> = (props) => {
    return (
        <div className='flex justify-end'>
            <BlockAction {...props} />
            <EditAction {...props} />
            <DeleteAction {...props} />
        </div>
    )
}

const SubscribersIndex: FC<SubscribersIndexProps> = (props) => {
    const {t} = useTranslation();
    return <>
        <Head title={t('subscribers') as string} />
        <IndexPage
            resource={'subscribers'}
            modelName={'subscriber'}
            items={props.items}
            columns={[
                {
                    resource: 'id',
                    label: 'ID',
                    sortable: true,
                },
                {
                    resource: 'username',
                    sortable: true
                },
                {
                    resource: 'tid',
                    label: 'Telegram ID',
                    sortable: true
                },
            ]}
            Filters={SearchFilter}
            Actions={Actions}
        />
    </>
}

//@ts-ignore
SubscribersIndex.layout = page => <AuthenticatedLayout
    children={page}
    {...page.props}
    header={<PageTitle>{i18next.t('subscribers')}</PageTitle>}
/>

export default SubscribersIndex;
