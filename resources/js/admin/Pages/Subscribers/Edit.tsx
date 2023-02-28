import * as React from "react";
import {FC,} from "react";
import moment from "moment";
import {Head, router} from "@inertiajs/react";
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import PageTitle from "../../Components/PageTitle";
import i18next from "i18next";
import TextInput from "../../Components/TextInput";
import {useTranslation} from "react-i18next";
import Button from "../../Components/Button";
import {Label, InputRow} from "../../Components/EditPage/EditPage";
import {SubscriberServerItem} from "../../types/subscribers";
import Container from "../../Components/Container";
import Card, {CardBody, CardHeader, CardTitle} from "../../Components/Card";
import Table, {Head as THead, Td, Th, Tr, Body} from "../../Components/Table";

type EditProps = {
    item: {
        data: SubscriberServerItem
    }
}

const Edit: FC<EditProps> = (props) => {

    const {t} = useTranslation();

    const {
        item,
    } = props;

    const handleBlockClick = () => {
        router.post(route(`subscribers.block`, {subscriber: item.data.id}));
    }

    return (
        <>
            <Head title={t('subscriber') as string} />

            <div className="py-12">
                <Container>

                    <Card>
                        <CardBody>
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

                            <InputRow>
                                <Label>
                                    Telegram ID
                                </Label>
                                <div className={'flex-1'}>
                                    <TextInput
                                        value={item.data.tid}
                                        readOnly={true}
                                        className={'w-full'}
                                    />
                                </div>
                            </InputRow>

                            <InputRow>
                                <Label>
                                    {t('username')}
                                </Label>
                                <div className={'flex-1'}>
                                    <TextInput
                                        value={item.data.username}
                                        readOnly={true}
                                        className={'w-full'}
                                    />
                                </div>
                            </InputRow>

                            <InputRow>
                                <Label>
                                    {t('first_name')}
                                </Label>
                                <div className={'flex-1'}>
                                    <TextInput
                                        value={item.data.first_name}
                                        readOnly={true}
                                        className={'w-full'}
                                    />
                                </div>
                            </InputRow>

                            <InputRow>
                                <Label>
                                    {t('last_name')}
                                </Label>
                                <div className={'flex-1'}>
                                    <TextInput
                                        value={item.data.last_name}
                                        readOnly={true}
                                        className={'w-full'}
                                    />
                                </div>
                            </InputRow>

                            <InputRow>
                                <Label>
                                    {t('language_code')}
                                </Label>
                                <div className={'flex-1'}>
                                    <TextInput
                                        value={item.data.language_code}
                                        readOnly={true}
                                        className={'w-full'}
                                    />
                                </div>
                            </InputRow>

                            <InputRow>
                                <Label>
                                    {t('is_premium')}
                                </Label>
                                <div className={'flex-1'}>
                                    <TextInput
                                        value={item.data.is_premium ? t('yes') as string : t('no') as string}
                                        readOnly={true}
                                    />
                                </div>
                            </InputRow>

                            <InputRow>
                                <Label>
                                    {t('is_bot')}
                                </Label>
                                <div className={'flex-1'}>
                                    <TextInput
                                        value={item.data.is_bot ? t('yes') as string : t('no') as string}
                                        readOnly={true}
                                    />
                                </div>
                            </InputRow>

                            <InputRow>
                                <Label>
                                    {t('is_blocked')}
                                </Label>
                                <div className={'mr-2 mb-2 md:mb-0'}>
                                    <TextInput
                                        value={item.data.is_blocked ? t('yes') as string : t('no') as string}
                                        readOnly={true}
                                    />
                                </div>
                                <Button variant={item.data.is_blocked ? 'warning' : 'primaryOutline'} onClick={handleBlockClick}>
                                    {item.data.is_blocked ? t('buttons.unblock') : t('buttons.block')}
                                </Button>
                            </InputRow>

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
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{t('bots')}</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Table>
                                <THead>
                                    <Tr>
                                        <Th>ID</Th>
                                        <Th>{t('name')}</Th>
                                    </Tr>
                                </THead>
                                <Body>
                                    {
                                        item.data.bots?.map(bot => (
                                            <Tr key={bot.id}>
                                                <Td>{bot.id}</Td>
                                                <Td>{bot.name}</Td>
                                            </Tr>
                                        ))
                                    }
                                </Body>
                            </Table>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    )
}

//@ts-ignore
Edit.layout = page => <AuthenticatedLayout
    children={page}
    {...page.props}
    header={<PageTitle>{i18next.t('subscriber')}: {page.props.item.data.id}</PageTitle>}
/>

export default Edit;
