import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import {User} from "../../types/general";
import {FC} from "react";
import * as React from "react";
import PageTitle from '../../Components/PageTitle';
import Container from "../../Components/Container";
import {useTranslation} from "react-i18next";
import i18next from "i18next";

type EditProps = {
    auth?: {
        user?: User
    }
    mustVerifyEmail?: boolean
    status?: string
}

const Edit: FC<EditProps> = ({ mustVerifyEmail, status }) => {

    const {t} = useTranslation();

    return (
        <>
            <Head title={t('profile') as string} />

            <div className="py-12">
                <Container>
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />

                    <UpdatePasswordForm />
                </Container>
            </div>

        </>
    );
}

//@ts-ignore
Edit.layout = page => <AuthenticatedLayout
    children={page}
    {...page.props}
    header={<PageTitle>{i18next.t('profile')}</PageTitle>}
/>

export default Edit
