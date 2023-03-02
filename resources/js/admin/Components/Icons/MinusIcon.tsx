import * as React from "react";
import {FC} from "react";
import {IconProps} from "../../types/general";

const MinusIcon: FC<IconProps> = (props) => {

    const {className} = props;

    return (
        <svg className={`${className ? ' ' + className : ''}`} viewBox="4 4 16 16"  xmlns="http://www.w3.org/2000/svg">
            <path d="M5 11H19V13H5V11Z" />
        </svg>
    )
}

export default MinusIcon;
