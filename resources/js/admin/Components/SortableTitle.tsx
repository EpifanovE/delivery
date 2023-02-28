import * as React from "react";
import {FC} from "react";
import {SortData} from "../types/general";
import ArrowDownIcon from "./Icons/ArrowDownIcon";
import ArrowUpIcon from "./Icons/ArrowUpIcon";

type SortableTitleProps = {
    code: string
    title: string
    sort?: SortData
    onClick: (sort: SortData) => void
}

const SortableTitle: FC<SortableTitleProps> = (props) => {

    const {
        code,
        title,
        sort,
        onClick,
    } = props;

    const handleClick = () => {
        if (sort?.orderBy !== code) {
            onClick({orderBy: code, order: 'desc'});
            return;
        }

        if (sort?.order === 'desc') {
            onClick({orderBy: code, order: 'asc'});
        } else {
            onClick({orderBy: code, order: 'desc'});
        }
    }

    return (
        <span className='flex items-center cursor-pointer' onClick={handleClick}>
            <span className='mr-2 select-none'>
                {title}
            </span>
            {
                (code === sort?.orderBy && sort.order === 'desc') &&
                <ArrowDownIcon className={'w-4 h-4'}/>
            }
            {
                (code === sort?.orderBy && sort.order === 'asc') &&
                <ArrowUpIcon className={'w-4 h-4'}/>
            }
            {
                code !== sort?.orderBy &&
                <span className='inline-block w-4' />
            }
        </span>
    )
}

export default SortableTitle;
