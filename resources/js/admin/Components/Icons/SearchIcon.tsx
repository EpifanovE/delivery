import * as React from "react";
import {FC} from "react";
import {IconProps} from "../../types/general";

const SearchIcon: FC<IconProps> = (props) => {

    const {className} = props;

    return (
        <svg className={`${className ? ' ' + className : ''}`} viewBox="0 0 16 17" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
                <path d="M15.7812 14.3344L12.6656 11.2188C12.525 11.0781 12.3344 11 12.1344 11H11.625C12.4875 9.89688 13 8.50937 13 7C13 3.40937 10.0906 0.5 6.5 0.5C2.90937 0.5 0 3.40937 0 7C0 10.5906 2.90937 13.5 6.5 13.5C8.00937 13.5 9.39688 12.9875 10.5 12.125V12.6344C10.5 12.8344 10.5781 13.025 10.7188 13.1656L13.8344 16.2812C14.1281 16.575 14.6031 16.575 14.8938 16.2812L15.7781 15.3969C16.0719 15.1031 16.0719 14.6281 15.7812 14.3344ZM6.5 11C4.29063 11 2.5 9.2125 2.5 7C2.5 4.79063 4.2875 3 6.5 3C8.70938 3 10.5 4.7875 10.5 7C10.5 9.20938 8.7125 11 6.5 11Z" />
            </g>
            <defs>
                <clipPath id="clip0">
                    <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
                </clipPath>
            </defs>
        </svg>
    )
}

export default SearchIcon;
