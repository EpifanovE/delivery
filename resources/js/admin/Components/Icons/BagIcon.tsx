import * as React from "react";
import {FC} from "react";
import {IconProps} from "../../types/general";

const BagIcon: FC<IconProps> = (props) => {

    const {className} = props;

    return (
        <svg className={`${className ? ' ' + className : ''}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 14V8H7V4H17V8H22V14H18V12H16V14H8V12H6V14H2ZM9 8H15V6H9V8ZM2 20V15H6V16H8V15H16V16H18V15H22V20H2Z" />
        </svg>
    )
}

export default BagIcon;
