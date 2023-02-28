import * as React from "react";
import {FC} from "react";
import {IconProps} from "../../types/general";

const BarsIcon: FC<IconProps> = (props) => {

    const {className} = props;

    return (
        <svg className={`${className ? ' ' + className : ''}`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
            <path d="M3 15H17V13H3V15ZM3 5V7H17V5H3ZM3 11H17V9H3V11Z" />
        </svg>
    )
}

export default BarsIcon;
