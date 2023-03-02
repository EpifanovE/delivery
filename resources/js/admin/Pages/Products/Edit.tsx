import * as React from "react";
import {FC, useEffect,} from "react";
import moment from "moment";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import PageTitle from "../../Components/PageTitle";
import i18next from "i18next";
import TextInput from "../../Components/TextInput";
import {useTranslation} from "react-i18next";
import {Label, InputRow, FieldGroup} from "../../Components/EditPage/EditPage";
import Container from "../../Components/Container";
import Card, {CardBody, CardFooter, CardHeader, CardTitle,} from "../../Components/Card";
import {Head, useForm,} from "@inertiajs/react";
import InputError from "../../Components/InputError";
import Button from "../../Components/Button";
import Checkbox from "../../Components/Checkbox";
import ImageControl from "../../Components/ImageControl";
import {router} from '@inertiajs/react'
import TimesIcon from "../../Components/Icons/TimesIcon";
import TextAreaInput from "../../Components/TextAreaInput";
import {ProductServerItem, ProductAttribute} from "../../../common/types/products";

type EditProps = {
    item?: {
        data: ProductServerItem
    }
}

type ProductForm = {
    name: string
    description: string
    price: string
    is_active: boolean
    image?: string | File | null
    attributes: ProductAttribute[]
    order_column: string
}

const Edit: FC<EditProps> = (props) => {

    const {t} = useTranslation();

    const {
        item,
    } = props;

    const {data, setData, errors, processing, post} = useForm<ProductForm>({
        name: item?.data?.name || '',
        description: item?.data?.description || '',
        price: item?.data?.price.toString() || '',
        is_active: item?.data?.is_active || false,
        image: !!item?.data?.image ? item.data.image.url : null,
        order_column: item?.data?.order_column.toString() || '',
        attributes: item?.data?.attributes || []
    });

    useEffect(() => {
        if (item?.data?.order_column) {
            setData('order_column', item.data.order_column.toString())
        }
    }, [item?.data?.order_column])

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (item?.data.id) {
            router.post(
                route('products.update', {product: item.data.id}),
                {
                    ...data,
                    _method: 'put'
                },
                {
                    forceFormData: true,
                });

        } else {
            post(
                route('products.store'),
                {
                    forceFormData: true,
                }
            );
        }
    };

    const handleFileChange = (file?: File) => {
        setData('image', file || null);
    }

    const handleAttrChange = (changeIndex: number, fieldName: string, value: string) => {
        setData('attributes', data.attributes.map((attr, index) => {
            if (changeIndex !== index) return attr;

            return {
                ...attr,
                [fieldName]: value,
            }
        }))
    }

    const handleAddAttrClick = () => {
        setData('attributes', [...data.attributes, {name: '', value: ''}]);
    }

    const handleAttrRemoveClick = (removeIndex: number) => {
        setData('attributes', data.attributes.filter((_, index) => index !== removeIndex));
    }

    return (
        <>
            <Head title={t('product') as string}/>

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
                                    <InputRow className={'mb-6 md:mb-3'}>
                                        <Label>
                                            ID
                                        </Label>
                                        <div className={'flex-1'}>
                                            <TextInput
                                                value={item.data.id || ''}
                                                readOnly={true}
                                                className={'w-full'}
                                            />
                                        </div>
                                    </InputRow>
                                }

                                <InputRow className={'mb-6 md:mb-3'}>
                                    <Label htmlFor={'name'}>
                                        {t('name')}
                                    </Label>
                                    <FieldGroup>
                                        <TextInput
                                            id={'name'}
                                            value={data.name || ''}
                                            className={'w-full'}
                                            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                                            required
                                            disabled={processing}
                                        />
                                        <InputError className="mt-2" message={errors.name}/>
                                    </FieldGroup>
                                </InputRow>

                                <InputRow className={'mb-6 md:mb-3'}>
                                    <Label htmlFor={'description'}>
                                        {t('description')}
                                    </Label>
                                    <FieldGroup>
                                        <TextAreaInput
                                            id={'description'}
                                            value={data.description || ''}
                                            className={'w-full'}
                                            handleChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
                                            disabled={processing}
                                        />
                                        <InputError className="mt-2" message={errors.description}/>
                                    </FieldGroup>
                                </InputRow>

                                <InputRow className={'mb-6 md:mb-3'}>
                                    <Label htmlFor={'price'}>
                                        {t('price')}
                                    </Label>
                                    <FieldGroup>
                                        <TextInput
                                            id={'price'}
                                            value={data.price || ''}
                                            className={'w-full'}
                                            handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('price', e.target.value)}
                                            required
                                            disabled={processing}
                                            type={'number'}
                                            step={1}
                                            min={0}
                                        />
                                        <InputError className="mt-2" message={errors.price}/>
                                    </FieldGroup>
                                </InputRow>

                                <InputRow className={'mb-6 md:mb-3'}>
                                    <Label htmlFor={'is_active'}>
                                        {t('is_active', {context: 'product'})}
                                    </Label>
                                    <FieldGroup>
                                        <Checkbox
                                            id={'is_active'}
                                            name="is_active"
                                            checked={data.is_active}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('is_active', e.target.checked)}
                                        />
                                        <InputError className="mt-2" message={errors.is_active}/>
                                    </FieldGroup>
                                </InputRow>

                                {
                                    !!item?.data?.id &&
                                    <InputRow className={'mb-6 md:mb-3'}>
                                        <Label htmlFor={'order_column'}>
                                            {t('sort_order')}
                                        </Label>
                                        <FieldGroup>
                                            <TextInput
                                                id={'order_column'}
                                                value={data.order_column || ''}
                                                className={'w-full'}
                                                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('order_column', e.target.value)}
                                                disabled={processing}
                                                type={'number'}
                                                step={1}
                                                min={0}
                                            />
                                            <InputError className="mt-2" message={errors.price}/>
                                        </FieldGroup>
                                    </InputRow>
                                }

                                {
                                    item?.data.created_at &&
                                    <InputRow className={'mb-6 md:mb-3'}>
                                        <Label>
                                            {t('created_at')}
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
                                    <InputRow className={'mb-6 md:mb-3'}>
                                        <Label>
                                            {t('updated_at')}
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
                            <CardBody>
                                <ImageControl
                                    file={data.image}
                                    onChange={handleFileChange}
                                    imageUrl={item?.data?.image?.full_url}
                                />
                            </CardBody>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t('attributes')}</CardTitle>
                            </CardHeader>
                            <CardBody>
                                {
                                    data.attributes.map((attribute, index) => (
                                        <div className={'flex gap-2 mb-3 last:mb-0'} key={index}>
                                            <div className={'flex gap-2 flex-wrap grow'}>

                                                    <TextInput
                                                        value={attribute.name || ''}
                                                        placeholder={t('name') as string}
                                                        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAttrChange(index, 'name', e.target.value)}
                                                        className={'w-full lg:w-auto'}
                                                    />

                                                    <TextInput
                                                        value={attribute.value || ''}
                                                        placeholder={t('value') as string}
                                                        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAttrChange(index, 'value', e.target.value)}
                                                        className={'w-full lg:w-auto grow'}
                                                    />
                                            </div>
                                            <Button
                                                variant={'primaryOutline'}
                                                type={'button'}
                                                processing={processing}
                                                onClick={() => handleAttrRemoveClick(index)}
                                                title={t('buttons.delete') as string}
                                            >
                                                <TimesIcon className={'w-4 h-4'} />
                                            </Button>
                                        </div>
                                    ))
                                }
                            </CardBody>
                            <CardFooter>
                                <Button
                                    variant={'primary'}
                                    type={'button'}
                                    processing={processing}
                                    onClick={handleAddAttrClick}
                                >
                                    {t('buttons.add')}
                                </Button>
                            </CardFooter>
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
                    <>{i18next.t('product')}: {page.props.item?.data?.id}</> :
                    <>{i18next.t('product')}: {i18next.t('creation')}</>
            }

        </PageTitle>
    )}
/>

export default Edit;
