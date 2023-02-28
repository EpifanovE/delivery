import React, { useRef } from 'react';
import InputError from '../../../Components/InputError';
import TextInput from '../../../Components/TextInput';
import { useForm } from '@inertiajs/react';
import Card, {CardBody, CardFooter, CardHeader, CardTitle} from "../../../Components/Card";
import {useTranslation} from "react-i18next";
import {FieldGroup, InputRow, Label} from "../../../Components/EditPage/EditPage";
import Button from "../../../Components/Button";

export default function UpdatePasswordForm() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const {t} = useTranslation();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <Card>
            <form onSubmit={updatePassword}>
                <CardHeader>
                    <CardTitle>
                        {t('password')}
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <InputRow>
                        <Label>
                            {t('current_password')}
                        </Label>
                        <FieldGroup>
                            <TextInput
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                handleChange={(e) => setData('current_password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                            />

                            <InputError message={errors.current_password} className="mt-2" />
                        </FieldGroup>
                    </InputRow>

                    <InputRow>
                        <Label>
                            {t('new_password')}
                        </Label>
                        <FieldGroup>
                            <TextInput
                                id="password"
                                ref={passwordInput}
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
                <CardFooter>
                    <Button
                        type={'submit'}
                        variant={'primary'}
                        processing={processing}
                    >
                        {t('buttons.save')}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
