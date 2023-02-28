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

type UsersIndexProps = {
    items: ServerCollectionResponse<UserServerItem>
} & PageProps

const UsersIndex: FC<UsersIndexProps> = (props) => {
    const {t} = useTranslation();

    return <>
        <Head title={t('users') as string} />

        <IndexPage
            resource={'users'}
            modelName={'user'}
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
                    label: t('name', {context: 'human'}) as string
                },
                {
                    resource: 'email',
                    sortable: true,
                },
            ]}
            Filters={SearchFilter}
            create={true}
        />
    </>
}

//@ts-ignore
UsersIndex.layout = page => <AuthenticatedLayout
    children={page}
    {...page.props}
    header={<PageTitle>{i18next.t('users')}</PageTitle>}
/>

export default UsersIndex;
