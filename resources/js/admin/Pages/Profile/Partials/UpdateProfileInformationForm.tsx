import InputError from '../../../Components/InputError';
import TextInput from '../../../Components/TextInput';
import {Link, useForm, usePage} from '@inertiajs/react';
import React, {FC} from "react";
import {User} from "../../../types/general";
import Card, {CardBody, CardFooter, CardHeader, CardTitle} from "../../../Components/Card";
import {useTranslation} from "react-i18next";
import Button from "../../../Components/Button";
import {FieldGroup, InputRow, Label} from "../../../Components/EditPage/EditPage";

type UpdateProfileInformationProps = {
    mustVerifyEmail?: boolean
    status?: string
    className?: string
}

const UpdateProfileInformation: FC<UpdateProfileInformationProps> = ({ mustVerifyEmail, status, className }) => {

    //@ts-ignore
    const user = usePage().props.auth.user.data as User;

    const {t} = useTranslation();

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <Card>
            <form onSubmit={submit}>
                <CardHeader>
                    <CardTitle>
                        {t('profile_information')}
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div>
                        <InputRow>
                            <Label>
                                {t('name', {context: 'human'})}
                            </Label>

                            <FieldGroup>
                                <TextInput
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                                    required
                                    isFocused
                                    autoComplete="name"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </FieldGroup>
                        </InputRow>
                    </div>

                    <div>
                        <InputRow>
                            <Label>
                                {t('email')}
                            </Label>

                            <FieldGroup>
                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    handleChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="email"
                                />

                                <InputError className="mt-2" message={errors.email} />

                                 {mustVerifyEmail && user.email_verified_at === null && (
                                     <div>
                                         <p className="text-sm mt-2 text-gray-800">
                                             {t('messages.email_is_unverified')}
                                             <Link
                                                 href={route('verification.send')}
                                                 method={'post'}
                                                 as="button"
                                                 className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                             >
                                                 {t('messages.resent_verification_email')}
                                             </Link>
                                         </p>

                                         {status === 'verification-link-sent' && (
                                             <div className="mt-2 font-medium text-sm text-green-600">
                                                 {t('messages.verification_link_has_been_sent')}
                                             </div>
                                         )}
                                     </div>
                                 )}
                            </FieldGroup>

                        </InputRow>
                    </div>
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

export default UpdateProfileInformation;
