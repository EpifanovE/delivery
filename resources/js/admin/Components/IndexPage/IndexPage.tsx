import * as React from "react";
import {FC} from "react";
import useIndexPageState from "./useIndexPageState";
import Dropdown from "../Dropdown";
import FilterIcon from "../Icons/FilterIcon";
import Button from "../Button";
import Table, {Body, Head as THead, Td, Th, Tr} from "../Table";
import SortableTitle from "../SortableTitle";
import {Link,} from "@inertiajs/react";
import Pagination from "../Pagination";
import PerPage from "../PerPage";
import {HasClassName, ServerCollectionResponse} from "../../types/general";
import {useTranslation} from "react-i18next";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import InputError from "../InputError";
import PencilIcon from "../Icons/PencilIcon";
import TrashIcon from "../Icons/TrashIcon";
import Card, {CardBody, CardFooter, CardHeader} from "../Card";
import Container from "../Container";

export type FiltersProps = {
    filters: {[key: string]: any}
    onChange: (name: string, value: any) => void
    errors?: {[key: string]: string | undefined}
}

export type ColumnData = {
    resource: string
    label?: string
    itemRender?: (item: any) => React.ReactNode
    sortable?: boolean
}

export type ActionProps = {
    item: any
    resource: string
    modelName: string
    primaryKey: string
} & HasClassName

type ActionsRender = React.FC<ActionProps> | boolean

type IndexPageProps = {
    resource: string
    modelName: string
    primaryKeyName?: string
    items: ServerCollectionResponse<any>
    columns: ColumnData[]
    Actions?: ActionsRender
    Filters?: React.FC<FiltersProps>
    create?: boolean
}

export const EditAction = (props: ActionProps) => {
    const {t} = useTranslation();
    return <Link
        className={`text-indigo-600 hover:text-indigo-900 p-4 ${props.className}`}
        href={route(`${props.resource}.edit`, {[props.modelName]: props.item[props.primaryKey]})}
        title={t('buttons.edit') || ''}
    >
        <PencilIcon className={'fill-blue-700 w-4 h-4'} />
    </Link>
}

export const DeleteAction = (props: ActionProps) => {

    const {t} = useTranslation();

    return <Link
        as='button'
        className={`text-red-600 hover:text-red-900cursor-pointer p-4 ${props.className}`}
        href={route(`${props.resource}.destroy`, {[props.modelName]: props.item[props.primaryKey]})}
        method={'delete'}
        onBefore={() => confirm(t('messages.confirm') as string)}
        title={t('buttons.delete') || ''}
    >
        <TrashIcon className={'fill-red-700 w-4 h-4'} />
    </Link>
}

export const SearchFilter: FC<FiltersProps> = (props) => {
    const {t} = useTranslation();

    const {filters, onChange, errors} = props

    return (
        <div className='mb-4'>
            <div className='pl-4 pr-4'>
                <InputLabel forInput="search" value={t('search') as string}/>

                <TextInput
                    id="search"
                    name="s"
                    value={filters.s || ''}
                    className="mt-1 block w-full"
                    handleChange={e => onChange('s', e.target.value)}
                />

                {
                    errors?.s &&
                    <InputError message={errors.s} className="mt-2"/>
                }
            </div>
        </div>
    )
}

const IndexPage: FC<IndexPageProps> = (props) => {

    const {t} = useTranslation();

    const {
        resource,
        primaryKeyName = 'id',
        modelName,
        items,
        columns,
        Actions = true,
        Filters,
        create,
    } = props;

    const {
        sort,
        perPage,
        filters,
        filtersErrors,
        setPerPage,
        handleChangeSort,
        handleFiltersSubmit,
        handleFiltersReset,
        handleFiltersChange,
    } = useIndexPageState({resource});

    const getTitle = (item: ColumnData): React.ReactNode => {

        if (item.sortable) {
            return <SortableTitle
                title={item.label || t(item.resource)}
                code={item.resource}
                sort={sort}
                onClick={handleChangeSort}
            />
        }

        return item.label || t(item.resource)
    }

    return (
        <div className="py-12">
            <Container>
                <Card>
                    {
                        (!!Filters || !!create) &&
                        <CardHeader className={'pb-5 flex justify-between items-center'}>
                            {
                                !!create &&
                                <Button
                                    variant={'success'}
                                    href={route(`${resource}.create`)}
                                >
                                    {t('buttons.create')}
                                </Button>
                            }
                            {
                                !!Filters &&
                                <div className={'ml-auto'}>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button>
                                                <FilterIcon className='w-6 h-6 fill-slate-400' />
                                            </button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content className={'w-72'} closeOnClickInside={false}>
                                            <form className='pt-4 pb-4' onSubmit={handleFiltersSubmit}>

                                                {
                                                    !!Filters && <Filters filters={filters} onChange={handleFiltersChange} errors={filtersErrors} />
                                                }

                                                <div className='pl-4 pr-4'>
                                                    <Button
                                                        type={'submit'}
                                                        variant={'primary'}
                                                        className={'w-full mb-2'}
                                                    >
                                                        {t('buttons.submit')}
                                                    </Button>
                                                    <Button
                                                        variant={'primaryOutline'}
                                                        className={'w-full'}
                                                        onClick={handleFiltersReset}
                                                    >
                                                        {t('buttons.reset')}
                                                    </Button>
                                                </div>
                                            </form>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            }
                        </CardHeader>
                    }
                    <CardBody>
                        {
                            items.data.length > 0 ? (
                                <div className={'overflow-x-auto'}>
                                    <Table>
                                        <THead>
                                            <Tr className={'border-b'}>
                                                {
                                                    columns.map(column => (
                                                        <Th key={column.resource}>{getTitle(column)}</Th>
                                                    ))
                                                }
                                                {
                                                    Actions && <Th/>
                                                }
                                            </Tr>
                                        </THead>
                                        <Body>
                                            {
                                                items.data.map(item => (
                                                    <Tr className={`hover:bg-gray-50`} key={item.id}>
                                                        {
                                                            columns.map(column => (
                                                                <Td key={column.resource}>
                                                                    {column.itemRender ? column.itemRender(item) : item[column.resource]}
                                                                </Td>
                                                            ))
                                                        }
                                                        {
                                                            Actions && (
                                                                <Td className={'p-0'}>
                                                                    {
                                                                        typeof Actions !== 'boolean' ? <Actions {...{
                                                                            item,
                                                                            resource,
                                                                            modelName,
                                                                            primaryKey: primaryKeyName
                                                                        }} /> : (
                                                                            <div className='flex justify-end'>
                                                                                <EditAction
                                                                                    {...{
                                                                                        item,
                                                                                        resource,
                                                                                        modelName,
                                                                                        primaryKey: primaryKeyName
                                                                                    }}
                                                                                />
                                                                                <DeleteAction
                                                                                    {...{
                                                                                        item,
                                                                                        resource,
                                                                                        modelName,
                                                                                        primaryKey: primaryKeyName
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )
                                                                    }
                                                                </Td>
                                                            )
                                                        }
                                                    </Tr>
                                                ))
                                            }
                                        </Body>
                                    </Table>
                                </div>
                            ) : (
                                <div>{t('entries_not_found')}</div>
                            )

                        }
                    </CardBody>
                    {
                        (items?.meta?.links && items.meta.links.length > 3) &&
                        <CardFooter className={'flex justify-between flex-wrap'}>
                            <div className={'overflow-x-auto mb-3 lg:mb-0'}>
                                <Pagination links={items.meta.links}/>
                            </div>
                            <div>
                                <PerPage
                                    value={perPage || '10'}
                                    onChange={value => setPerPage(value)}
                                />
                            </div>
                        </CardFooter>
                    }
                </Card>
            </Container>
        </div>
    )
}

export default IndexPage;
