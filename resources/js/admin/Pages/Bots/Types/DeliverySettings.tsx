import * as React from "react";
import {FC} from "react";
import {DeliveryBotSettings} from "../../../types/bots";
import Card, {CardBody} from "../../../Components/Card";
import {InputRow, Label} from "../../../Components/EditPage/EditPage";
import TextInput from "../../../Components/TextInput";
import InputError from "../../../Components/InputError";
import {useTranslation} from "react-i18next";

type DeliverySettingsProps = {
    value: DeliveryBotSettings
    onChange: (value: DeliveryBotSettings) => void
    disabled?: boolean
    errors?: {[key: string] : string}
}

const DeliverySettings: FC<DeliverySettingsProps> = ({value, onChange, disabled, errors}) => {

    const {t} = useTranslation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...value,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Card>
            <CardBody>
                <InputRow className={'mb-6 md:mb-3'}>
                    <Label htmlFor={'workers_max_count'}>
                        {t('workers_max_count')}
                    </Label>
                    <div className={'flex-1'}>
                        <TextInput
                            id={'workers_max_count'}
                            name={'workers_max_count'}
                            value={value.workers_max_count?.toString() || ''}
                            className={'w-full'}
                            handleChange={handleChange}
                            disabled={disabled}
                            type={'number'}
                            min={0}
                            step={1}
                        />
                        <InputError className="mt-2" message={errors?.workers_max_count} />
                    </div>
                </InputRow>

                <InputRow className={'mb-6 md:mb-3'}>
                    <Label htmlFor={'workers_price'}>
                        {t('workers_price')}
                    </Label>
                    <div className={'flex-1'}>
                        <TextInput
                            id={'workers_price'}
                            name={'workers_price'}
                            value={value.workers_price?.toString() || ''}
                            className={'w-full'}
                            handleChange={handleChange}
                            disabled={disabled}
                            type={'number'}
                            min={0}
                            step={1}
                        />
                        <InputError className="mt-2" message={errors?.workers_price} />
                    </div>
                </InputRow>

                <InputRow className={'mb-6 md:mb-3'}>
                    <Label htmlFor={'workers_min_hours'}>
                        {t('workers_min_hours')}
                    </Label>
                    <div className={'flex-1'}>
                        <TextInput
                            id={'workers_min_hours'}
                            name={'workers_min_hours'}
                            value={value.workers_min_hours?.toString() || ''}
                            className={'w-full'}
                            handleChange={handleChange}
                            disabled={disabled}
                            type={'number'}
                            min={0}
                            step={1}
                        />
                        <InputError className="mt-2" message={errors?.workers_min_hours} />
                    </div>
                </InputRow>

                <InputRow className={'mb-6 md:mb-3'}>
                    <Label htmlFor={'workers_max_hours'}>
                        {t('workers_max_hours')}
                    </Label>
                    <div className={'flex-1'}>
                        <TextInput
                            id={'workers_max_hours'}
                            name={'workers_max_hours'}
                            value={value.workers_max_hours?.toString() || ''}
                            className={'w-full'}
                            handleChange={handleChange}
                            disabled={disabled}
                            type={'number'}
                            min={0}
                            step={1}
                        />
                        <InputError className="mt-2" message={errors?.workers_max_hours} />
                    </div>
                </InputRow>

                <InputRow className={'mb-6 md:mb-3'}>
                    <Label htmlFor={'rent_min'}>
                        {t('rent_min')}
                    </Label>
                    <div className={'flex-1'}>
                        <TextInput
                            id={'rent_min'}
                            name={'rent_min'}
                            value={value.rent_min?.toString() || ''}
                            className={'w-full'}
                            handleChange={handleChange}
                            disabled={disabled}
                            type={'number'}
                            min={0}
                            step={1}
                        />
                        <InputError className="mt-2" message={errors?.rent_min} />
                    </div>
                </InputRow>

                <InputRow>
                    <Label htmlFor={'rent_max'}>
                        {t('rent_max')}
                    </Label>
                    <div className={'flex-1'}>
                        <TextInput
                            id={'rent_max'}
                            name={'rent_max'}
                            value={value.rent_max?.toString() || ''}
                            className={'w-full'}
                            handleChange={handleChange}
                            disabled={disabled}
                            type={'number'}
                            min={0}
                            step={1}
                        />
                        <InputError className="mt-2" message={errors?.rent_max} />
                    </div>
                </InputRow>
            </CardBody>
        </Card>
    )
}

export default DeliverySettings;
