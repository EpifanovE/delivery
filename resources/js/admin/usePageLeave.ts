import {useEffect} from "react";
import {router} from "@inertiajs/react";
import {useTranslation} from "react-i18next";

const usePageLeave = (isDirty: boolean) => {
    const {t} = useTranslation();

    useEffect(() => {
        return router.on('before', (event) => {
            if (!isDirty) return true;

            return confirm(t('messages.confirm_page_leave') as string);
        })
    }, [isDirty]);
}

export default usePageLeave;
