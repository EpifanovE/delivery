import * as React from "react";
import {FC, useEffect} from "react";
import moment from "moment";
import {Head, router, useForm,} from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import PageTitle from "../../Components/PageTitle";
import i18next from "i18next";
import TextInput from "../../Components/TextInput";
import {useTranslation} from "react-i18next";
import {FieldGroup, InputRow, Label} from "../../Components/EditPage/EditPage";
import Container from "../../Components/Container";
import Card, {CardBody, CardHeader, CardTitle,} from "../../Components/Card";
import {BotServerItem} from "../../types/bots";
import InputError from "../../Components/InputError";
import Button from "../../Components/Button";
import SelectInput from "../../Components/SelectInput";
import DeliverySettings from "./Types/DeliverySettings";
import TextAreaInput from "../../Components/TextAreaInput";
import ImageControl from "../../Components/ImageControl";

type EditProps = {
    item?: {
        data: BotServerItem
    }
    types: Array<string>
}

const Edit: FC<EditProps> = (props) => {

    const {t} = useTranslation();

    const {
        item,
        types,
    } = props;

    const {data, setData, errors, processing, post,} = useForm({
        name: item?.data?.name || '',
        type: item?.data?.type || '',
        token: item?.data?.token || '',
        settings: item?.data?.settings || {}
    });

    useEffect(() => {
        if (!data.type && !!types.length) {
            setData('type', types[0]);
        }
    }, [types]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        e.preventDefault();

        if (item?.data.id) {
            router.post(
                route('bots.update', {bot: item.data.id}),
                {
                    ...data,
                    _method: 'put'
                },
                {
                    forceFormData: true,
                });

        } else {
            post(
                route('bots.store'),
                {
                    forceFormData: true,
                }
            );
        }
    };

    const setWebHook = () => {
        if (!item) return;
        router.post(route(`bots.setWebHook`, {bot: item.data.id}));
    }

    const removeWebHook = () => {
        if (!item) return;
        router.post(route(`bots.removeWebHook`, {bot: item.data.id}));
    }

    const changeSettings = (value: any) => {
        setData('settings', value);
    }

    const handleFileChange = (file?: File) => {
        setData('settings', {
            ...data.settings,
            image: file
        });
    }

    return (
        <>
            <Head title={t('bot') as string}/>

            <div className="py-12">
                <form onSubmit={submit}>
                    <Container>
                        <div className={'flex justify-end'}>
                            {
                                !!item?.data.token &&
                                <>
                                    {
                                        item?.data.webhook ? (
                                            <Button
                                                variant={'primaryOutline'}
                                                type={'button'}
                                                disabled={processing}
                                                onClick={removeWebHook}
                                                className={'mr-2'}
                                            >
                                                {t('buttons.remove_webhook')}
                                            </Button>
                                        ) : (
                                            <Button
                                                variant={'primaryOutline'}
                                                type={'button'}
                                                disabled={processing}
                                                onClick={setWebHook}
                                                className={'mr-2'}
                                            >
                                                {t('buttons.set_webhook')}
                                            </Button>
                                        )
                                    }
                                </>
                            }
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
                                {
                                    item?.data.id &&
                                    <InputRow>
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
                                }

                                <InputRow>
                                    <Label htmlFor={'name'}>
                                        {t('name')}
                                    </Label>
                                    <div className={'flex-1'}>
                                        <TextInput
                                            id={'name'}
                                            value={data.name}
                                            className={'w-full'}
                                            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                                            required
                                            disabled={processing}
                                        />
                                        <InputError className="mt-2" message={errors.name}/>
                                    </div>
                                </InputRow>

                                <InputRow>
                                    <Label htmlFor={'type'}>
                                        {t('type')}
                                    </Label>
                                    <div className={'flex-1'}>
                                        <SelectInput
                                            value={data.type}
                                            handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => setData('type', e.target.value)}
                                            id={'type'}
                                            className={'w-full'}
                                            required
                                            disabled={processing}
                                        >
                                            {
                                                types.map(type => (
                                                    <option value={type} key={type}>{t(`bot_types.${type}`)}</option>
                                                ))
                                            }
                                        </SelectInput>
                                        <InputError className="mt-2" message={errors.type}/>
                                    </div>
                                </InputRow>

                                <InputRow>
                                    <Label htmlFor={'token'}>
                                        {t('token')}
                                    </Label>
                                    <div className={'flex-1'}>
                                        <TextInput
                                            id={'token'}
                                            value={data.token}
                                            className={'w-full'}
                                            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('token', e.target.value)}

                                            disabled={processing}
                                        />
                                        <InputError className="mt-2" message={errors.token}/>
                                    </div>
                                </InputRow>

                                {
                                    item?.data.created_at &&
                                    <InputRow>
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
                                }

                                {
                                    item?.data.updated_at &&
                                    <InputRow>
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
                                }
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('start_message')}</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <InputRow>
                                    <Label htmlFor={'start_message'}>
                                        {t('message')}
                                    </Label>
                                    <FieldGroup>
                                        <TextAreaInput
                                            id={'start_message'}
                                            value={data.settings?.start_message || ''}
                                            className={'w-full'}
                                            handleChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('settings', {
                                                ...data.settings,
                                                start_message: e.target.value
                                            })}
                                            disabled={processing}
                                        />
                                    </FieldGroup>
                                </InputRow>
                                <InputRow>
                                    <Label>
                                        {t('image')}
                                    </Label>
                                    <FieldGroup>
                                        <ImageControl
                                            file={data.settings?.image}
                                            onChange={handleFileChange}
                                            imageUrl={item?.data?.image_url || undefined}
                                        />
                                    </FieldGroup>
                                </InputRow>
                            </CardBody>
                        </Card>

                        {
                            data.type === 'delivery' &&
                            <DeliverySettings value={data.settings} onChange={changeSettings}/>
                        }
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
    header={(
        <PageTitle>
            {
                page.props.item?.data.id ?
                    <>{i18next.t('bot')}: {page.props.item?.data?.id}</> :
                    <>{i18next.t('bot')}: {i18next.t('creation')}</>
            }

        </PageTitle>
    )}
/>

export default Edit;
