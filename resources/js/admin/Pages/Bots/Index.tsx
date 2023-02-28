import * as React from "react";
import {FC,} from "react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import {PageProps, ServerCollectionResponse,} from "../../types/general";
import PageTitle from "../../Components/PageTitle";
import i18next from "i18next";
import IndexPage, {SearchFilter} from "../../Components/IndexPage/IndexPage";
import {BotServerCollectionItem} from "../../types/bots";
import {useTranslation} from "react-i18next";
import {Head} from "@inertiajs/react";

type BotIndexProps = {
    items: ServerCollectionResponse<BotServerCollectionItem>
} & PageProps

const BotsIndex: FC<BotIndexProps> = (props) => {
    const {t} = useTranslation();

    return <>
        <Head title={t('bots') as string} />

        <IndexPage
            resource={'bots'}
            modelName={'bot'}
            items={props.items}
            columns={[
                {
                    resource: 'id',
                    label: 'ID',
                    sortable: true,
                },
                {
                    resource: 'name',
                    sortable: true
                },
                {
                    resource: 'type',
                    sortable: true,
                    itemRender: (item: BotServerCollectionItem) => {
                        return t(`bot_types.${item.type}`)
                    }
                },
            ]}
            Filters={SearchFilter}
            create={true}
        />
    </>
}

//@ts-ignore
BotsIndex.layout = page => <AuthenticatedLayout
    children={page}
    {...page.props}
    header={<PageTitle>{i18next.t('bots')}</PageTitle>}
/>

export default BotsIndex;
