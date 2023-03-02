import * as React from "react";
import {FC, useState,} from "react";
import moment from "moment";
import {Head, router, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import PageTitle from "../../Components/PageTitle";
import i18next from "i18next";
import TextInput from "../../Components/TextInput";
import {useTranslation} from "react-i18next";
import {Label, InputRow} from "../../Components/EditPage/EditPage";
import Container from "../../Components/Container";
import Card, {CardBody, } from "../../Components/Card";
import {OrderServerItem} from "../../types/orders";
import TextAreaInput from "../../Components/TextAreaInput";
import SelectInput from "../../Components/SelectInput";
import Button from "../../Components/Button";

type EditProps = {
    item: {
        data: OrderServerItem
    }
}

const Edit: FC<EditProps> = (props) => {

    const {t} = useTranslation();

    const {
        item,
    } = props;

    const {data, setData, errors, processing, put,} = useForm({
        status: item?.data?.status || '',
        notes: item?.data?.notes || '',
    });

    const getDetailValueAsString = (value: string | number | boolean): string => {

        if (typeof value == "boolean") {
            return value ? t('yes') : t('no');
        }

        return value + '';
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        e.preventDefault();
        put(route('orders.update', {order: item.data.id}));
    }

    return (
        <>
            <Head title={t('order') as string} />

            <div className="py-12">
                <form onSubmit={submit}>
                    <Container>
                        <div className={'flex justify-end'}>
                            <Button
                                variant={'primary'}
                                type={'submit'}
                                processing={processing}
                            >
                                {t('buttons.save')}
                            </Button>
                        </div>
                        <Card>
                            <CardBody>
                                <InputRow className={'mb-6 md:mb-3'}>
                                    <Label>
                                        ID
                                    </Label>
                                    <div className={'flex-1'}>
                                        <TextInput
                                            value={item.data.id + ''}
                                            readOnly={true}
                                            className={'w-full'}
                                        />
                                    </div>
                                </InputRow>

                                <InputRow className={'mb-6 md:mb-3'}>
                                    <Label>
                                        {t('product')}
                                    </Label>
                                    <div className={'flex-1'}>
                                        <TextInput
                                            value={item.data.product?.name || t('not_defined') as string}
                                            readOnly={true}
                                            className={'w-full'}
                                        />
                                    </div>
                                </InputRow>

                                <InputRow className={'mb-6 md:mb-3'}>
                                    <Label>
                                        {t('sum')}
                                    </Label>
                                    <div className={'flex-1'}>
                                        <TextInput
                                            value={item.data.total.toFixed(2) + ' ' + t('rub')}
                                            readOnly={true}
                                            className={'w-full'}
                                        />
                                    </div>
                                </InputRow>

                                <InputRow className={'mb-6 md:mb-3'}>
                                    <Label htmlFor={'status'}>
                                        {t('status')}
                                    </Label>
                                    <div className={'flex-1'}>
                                        <SelectInput
                                            value={data.status}
                                            handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => setData('status', e.target.value)}
                                            id={'type'}
                                            className={'w-full'}
                                            required
                                            disabled={processing}
                                        >
                                            <option value="pending">{t('statuses.pending', {context: 'order'})}</option>
                                            <option value="process">{t('statuses.process', {context: 'order'})}</option>
                                            <option value="cancel">{t('statuses.cancel', {context: 'order'})}</option>
                                            <option value="done">{t('statuses.done', {context: 'order'})}</option>
                                        </SelectInput>
                                    </div>
                                </InputRow>

                                <InputRow className={'mb-6 md:mb-3'}>
                                    <Label>
                                        {t('bot')}
                                    </Label>
                                    <div className={'flex-1'}>
                                        <TextInput
                                            value={!!item.data.bot ? item.data.bot.name : t('not_defined') as string}
                                            readOnly={true}
                                            className={'w-full'}
                                        />
                                    </div>
                                </InputRow>

                                <InputRow className={'mb-6 md:mb-3'}>
                                    <Label>
                                        {t('subscriber')}
                                    </Label>
                                    <div className={'flex-1'}>
                                        <TextInput
                                            value={!!item.data.subscriber ? item.data.subscriber.username + ' #' + item.data.subscriber.id : t('not_defined') as string}
                                            readOnly={true}
                                            className={'w-full'}
                                        />
                                    </div>
                                </InputRow>

                                <InputRow className={'mb-6 md:mb-3'}>
                                    <Label>
                                        {t('created_at', {context: 'male'})}
                                    </Label>
                                    <div className={'flex-1'}>
                                        <TextInput
                                            value={moment(item.data.created_at).format('DD-MM-YY HH:mm')}
                                            readOnly={true}
                                        />
                                    </div>
                                </InputRow>

                                <InputRow className={'mb-6 md:mb-3'}>
                                    <Label>
                                        {t('updated_at', {context: 'male'})}
                                    </Label>
                                    <div className={'flex-1'}>
                                        <TextInput
                                            value={moment(item.data.updated_at).format('DD-MM-YY HH:mm')}
                                            readOnly={true}
                                        />
                                    </div>
                                </InputRow>
                            </CardBody>
                        </Card>

                        {
                            (item.data.details && item.data.details.length > 0) &&
                            <Card>
                                <CardBody>
                                    {
                                        item.data.details.map((detail, index) => (
                                            <InputRow key={index}>
                                                <Label>
                                                    {detail.name}
                                                </Label>
                                                <div className={'flex-1'}>
                                                    <TextInput
                                                        value={getDetailValueAsString(detail.value)}
                                                        readOnly={true}
                                                        className={'w-full'}
                                                    />
                                                </div>
                                            </InputRow>
                                        ))
                                    }
                                </CardBody>
                            </Card>
                        }

                        <Card>
                            <CardBody>
                                <InputRow>
                                    <Label>
                                        {t('notes')}
                                    </Label>
                                    <div className={'flex-1'}>
                                        <TextAreaInput
                                            value={data.notes || ''}
                                            className={'w-full'}
                                            handleChange={e => setData('notes', e.target.value)}
                                        />
                                    </div>
                                </InputRow>
                            </CardBody>
                        </Card>

                    </Container>
                </form>
            </div>
        </>
    )
}

//@ts-ignore
Edit.layout = page => <AuthenticatedLayout
    children={page}
    {...page.props}
    header={<PageTitle>{i18next.t('order')}: {page.props.item.data.id}</PageTitle>}
/>

export default Edit;
