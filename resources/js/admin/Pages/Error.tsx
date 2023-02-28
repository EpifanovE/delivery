import * as React from "react";
import GuestLayout from "../Layouts/GuestLayout";
import {useTranslation} from "react-i18next";

export default function ErrorPage({ status }: {status: number}) {

    const {t} = useTranslation();

    return (
        <GuestLayout>
            <div>
                <h1 className={'font-bold text-lg'}>{t(`errors.${status}_title`)}</h1>
                <div>{t(`errors.${status}_text`)}</div>
            </div>
        </GuestLayout>
    )
}
