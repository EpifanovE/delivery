import React, { useEffect } from 'react';
import Checkbox from '../../Components/Checkbox';
import GuestLayout from '../../Layouts/GuestLayout';
import InputError from '../../Components/InputError';
import InputLabel from '../../Components/InputLabel';
import PrimaryButton from '../../Components/PrimaryButton';
import TextInput from '../../Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import {useTranslation} from "react-i18next";

export default function Login({ status, canResetPassword }) {

    const {t} = useTranslation();

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        setData(e.target.name, e.target.type === 'checkbox' ? e.target.checked : e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title={t('login')} />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={handleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password" value={t('password') as string} />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={handleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} onChange={handleChange} />
                        <span className="ml-2 text-sm text-gray-600">{t('remember_me') as string}</span>
                    </label>
                </div>

                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {t('forgot_your_password') as string}
                        </Link>
                    )}

                    <PrimaryButton className="ml-4" processing={processing}>
                        {t('login') as string}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
