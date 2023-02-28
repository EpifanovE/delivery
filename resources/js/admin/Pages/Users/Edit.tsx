import * as React from "react";
import {FC, } from "react";
import moment from "moment";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import PageTitle from "../../Components/PageTitle";
import i18next from "i18next";
import TextInput from "../../Components/TextInput";
import {useTranslation} from "react-i18next";
import {Label, InputRow, FieldGroup} from "../../Components/EditPage/EditPage";
import Container from "../../Components/Container";
import Card, {CardBody, CardHeader, CardTitle,} from "../../Components/Card";
import {Head, useForm} from "@inertiajs/react";
import InputError from "../../Components/InputError";
import Button from "../../Components/Button";
import {UserServerItem} from "../../types/users";
import Checkbox from "../../Components/Checkbox";

type EditProps = {
    item?: {
        data: UserServerItem
    }
}

const Edit: FC<EditProps> = (props) => {

    const {t} = useTranslation();

    const {
        item,
    } = props;


    const {data, setData, errors, processing, put, post } = useForm({
        name: item?.data?.name || '',
        email: item?.data?.email || '',
        is_super: item?.data?.is_super || false,
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (item?.data.id) {
            put(route('users.update', {user: item.data.id}));
        } else {
            post(route('users.store'));
        }
    };

    return (
        <>
            <Head title={t('user') as string} />

            <div className="py-12">
                <form onSubmit={submit}>
                    <Container>
                        <div className={'flex justify-end px-6 sm:px-0'}>
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
                                        {t('name', {context: 'human'})}
                                    </Label>
                                    <FieldGroup>
                                        <TextInput
                                            id={'name'}
                                            value={data.name}
                                            className={'w-full'}
                                            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                                            required
                                            disabled={processing}
                                        />
                                        <InputError className="mt-2" message={errors.name} />
                                    </FieldGroup>
                                </InputRow>

                                <InputRow>
                                    <Label htmlFor={'email'}>
                                        {t('email')}
                                    </Label>
                                    <FieldGroup>
                                        <TextInput
                                            id={'email'}
                                            value={data.email}
                                            className={'w-full'}
                                            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('email', e.target.value)}
                                            required
                                            disabled={processing}
                                        />
                                        <InputError className="mt-2" message={errors.email} />
                                    </FieldGroup>
                                </InputRow>

                                <InputRow>
                                    <Label htmlFor={'super_admin'}>
                                        {t('super_admin')}
                                    </Label>
                                    <FieldGroup>
                                        <Checkbox
                                            id={'super_admin'}
                                            name="is_super"
                                            checked={data.is_super}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('is_super', e.target.checked)}
                                        />
                                        <InputError className="mt-2" message={errors.email} />
                                    </FieldGroup>
                                </InputRow>

                                {
                                    item?.data.created_at &&
                                    <InputRow>
                                        <Label>
                                            {t('created_at', {context: 'male'})}
                                        </Label>
                                        <FieldGroup>
                                            <TextInput
                                                value={moment(item.data.created_at).format('DD-MM-YY HH:mm')}
                                                readOnly={true}
                                            />
                                        </FieldGroup>
                                    </InputRow>
                                }

                                {
                                    item?.data.updated_at &&
                                    <InputRow>
                                        <Label>
                                            {t('updated_at', {context: 'male'})}
                                        </Label>
                                        <FieldGroup>
                                            <TextInput
                                                value={moment(item.data.updated_at).format('DD-MM-YY HH:mm')}
                                                readOnly={true}
                                            />
                                        </FieldGroup>
                                    </InputRow>
                                }
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {t('password')}
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <InputRow>
                                    <Label>
                                        {t('new_password')}
                                    </Label>
                                    <FieldGroup>
                                        <TextInput
                                            id="password"
                                            value={data.password}
                                            handleChange={(e) => setData('password', e.target.value)}
                                            type="password"
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                        />

                                        <InputError message={errors.password} className="mt-2" />
                                    </FieldGroup>
                                </InputRow>

                                <InputRow>
                                    <Label>
                                        {t('confirm_password')}
                                    </Label>
                                    <FieldGroup>
                                        <TextInput
                                            id="password_confirmation"
                                            value={data.password_confirmation}
                                            handleChange={(e) => setData('password_confirmation', e.target.value)}
                                            type="password"
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                        />

                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </FieldGroup>
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
    header={(
        <PageTitle>
            {
                page.props.item?.data.id ?
                <>{i18next.t('user')}: {page.props.item?.data?.id}</> :
                <>{i18next.t('user')}: {i18next.t('creation')}</>
            }

        </PageTitle>
    )}
/>

export default Edit;
