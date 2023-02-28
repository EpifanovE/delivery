import * as React from "react";
import {FC} from "react";
import {IconProps} from "../../types/general";

const FilterIcon: FC<IconProps> = (props) => {

    const {className} = props;

    return (
        <svg className={`${className ? ' ' + className : ''}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
            <path d="M10 18V16H14V18H10ZM6 13V11H18V13H6ZM3 8V6H21V8H3Z" />
        </svg>

    )
}

export default FilterIcon;
