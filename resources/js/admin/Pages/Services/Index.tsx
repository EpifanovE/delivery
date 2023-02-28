import * as React from "react";
import {FC,} from "react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import {PageProps, ServerCollectionResponse,} from "../../types/general";
import PageTitle from "../../Components/PageTitle";
import i18next from "i18next";
import IndexPage, {SearchFilter} from "../../Components/IndexPage/IndexPage";
import {useTranslation} from "react-i18next";
import {Head} from "@inertiajs/react";
import {UserServerItem} from "../../types/users";
import {ServiceServerCollectionItem} from "../../types/services";

type ServicesIndexProps = {
    items: ServerCollectionResponse<ServiceServerCollectionItem>
} & PageProps

const ServicesIndex: FC<ServicesIndexProps> = (props) => {
    const {t} = useTranslation();

    return <>
        <Head title={t('services') as string} />

        <IndexPage
            resource={'services'}
            modelName={'service'}
            items={props.items}
            columns={[
                {
                    resource: 'id',
                    label: 'ID',
                    sortable: true,
                },
                {
                    resource: 'name',
                    sortable: true,
                    label: t('name') as string
                },
                {
                    resource: 'is_active',
                    sortable: true,
                    label: t('is_active_service') as string,
                    itemRender: (item: ServiceServerCollectionItem) => {
                        return item.is_active ? <span className={'text-green-600'}>{t('yes')}</span> : <span className={'text-red-600'}>{t('no')}</span>
                    }
                },
                {
                    resource: 'order_column',
                    sortable: true,
                    label: t('sort_order') as string
                },
            ]}
            Filters={SearchFilter}
            create={true}
        />
    </>
}

//@ts-ignore
ServicesIndex.layout = page => <AuthenticatedLayout
    children={page}
    {...page.props}
    header={<PageTitle>{i18next.t('services')}</PageTitle>}
/>

export default ServicesIndex;
