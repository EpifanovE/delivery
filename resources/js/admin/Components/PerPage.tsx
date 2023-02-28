import * as React from "react";
import {FC} from "react";
import {useTranslation} from "react-i18next";

type PerPageProps = {
    value: string
    onChange: (value: string) => void
}

const PerPage: FC<PerPageProps> = ({value, onChange}) => {

    const {t} = useTranslation();

    return (
        <div className='flex items-center'>
            <span className={'mr-2'}>{t('per_page')}</span>
            <select
                name="per_page"
                value={value}
                onChange={e => onChange(e.target.value)}
                className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-sm shadow-sm '}
            >
                <option value={'10'}>10</option>
                <option value={'25'}>25</option>
                <option value={'50'}>50</option>
            </select>
        </div>
    );
}

export default PerPage;
