import * as React from "react";
import {FC} from "react";
import {IconProps} from "../../types/general";

const UploadIcon: FC<IconProps> = (props) => {

    const {className} = props;

    return (
        <svg className={`${className ? ' ' + className : ''}`} viewBox="0 0 24 24">
            <path d="M11 20H6.5C4.98333 20 3.68767 19.475 2.613 18.425C1.53767 17.375 1 16.0917 1 14.575C1 13.275 1.39167 12.1167 2.175 11.1C2.95833 10.0833 3.98333 9.43333 5.25 9.15C5.66667 7.61667 6.5 6.375 7.75 5.425C9 4.475 10.4167 4 12 4C13.95 4 15.604 4.679 16.962 6.037C18.3207 7.39567 19 9.05 19 11C20.15 11.1333 21.1043 11.629 21.863 12.487C22.621 13.3457 23 14.35 23 15.5C23 16.75 22.5627 17.8127 21.688 18.688C20.8127 19.5627 19.75 20 18.5 20H13V12.85L14.6 14.4L16 13L12 9L8 13L9.4 14.4L11 12.85V20Z" />
        </svg>
    )
}

export default UploadIcon;
