import * as React from "react";
import {FC} from "react";
import {IconProps} from "../../types/general";

const MoneyIcon: FC<IconProps> = (props) => {

    const {className} = props;

    return (
        <svg className={`${className ? ' ' + className : ''}`} viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
            <path d="M23 7V20H4V18H21V7H23ZM19 16H1V4H19V16ZM13 10C13 8.34 11.66 7 10 7C8.34 7 7 8.34 7 10C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 10Z" />
        </svg>
    )
}

export default MoneyIcon;
