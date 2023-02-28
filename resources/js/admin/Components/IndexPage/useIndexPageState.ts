import React, {useEffect, useState} from "react";
import {SortData} from "../../types/general";
import {router, useForm} from "@inertiajs/react";

type IndexPageStateParams = {
    resource: string
}

const useIndexPageState = (params: IndexPageStateParams) => {

    const {
        resource,
    } = params;

    const [sort, setSort] = useState<SortData>();
    const [perPage, setPerPage] = useState<string>();

    const {data: filters, setData: setFilters, get, processing: filtersProcessing, errors: filtersErrors, reset} = useForm<{[key: string]: any}>();

    useEffect(() => {
        if (!!sort) return;

        const orderBy = route().params.orderBy;
        const order = route().params.order;

        if (!orderBy || !order) return;

        setSort({
            order, orderBy
        });
    }, [])

    useEffect(() => {
        if (!!perPage) return;

        const queryPerPage = route().params.per_page;

        if (!queryPerPage) return;

        if (!['10', '25', '50'].includes(queryPerPage)) {
            setPerPage('10');
            return;
        }

        setPerPage(queryPerPage);
    }, []);

    useEffect(() => {

        if (!sort) return;

        router.get(route(`${resource}.index`), {
            ...route().params,
            orderBy: sort.orderBy,
            order: sort.order
        }, {preserveState: true});
    }, [sort]);

    useEffect(() => {

        if (!perPage) return;

        router.get(route(`${resource}.index`), {
            ...route().params,
            per_page: perPage,
        }, {preserveState: true});
    }, [perPage]);

    const handleChangeSort = (sort: SortData) => {
        setSort(sort);
    }

    const handleFiltersSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        get(route(`${resource}.index`));
    }

    const handleFiltersReset = () => {
        reset();
    }

    const handleFiltersChange = (name: string, value: any) => {
        setFilters(name, value)
    }

    return {
        sort,
        perPage,
        filters,
        setFilters,
        filtersErrors,
        setPerPage,
        handleChangeSort,
        handleFiltersSubmit,
        handleFiltersReset,
        handleFiltersChange,
        reset: handleFiltersReset
    }
}

export default useIndexPageState;
