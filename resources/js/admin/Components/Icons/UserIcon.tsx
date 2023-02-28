import * as React from "react";
import {FC} from "react";
import {IconProps} from "../../types/general";

const UserIcon: FC<IconProps> = (props) => {

    const {className} = props;

    return (
        <svg className={`${className ? ' ' + className : ''}`} viewBox="3 4 34 32" xmlns="http://www.w3.org/2000/svg" >
            <path d="M25.9625 15.8413C25.9625 15.8413 27.025 11.3441 25.9625 9.81945C24.9 8.29732 24.4775 7.28257 22.1413 6.5561C19.805 5.82964 20.6563 5.97442 18.9575 6.04873C17.2575 6.12304 15.8425 7.06476 15.8425 7.57342C15.8425 7.57342 14.78 7.64517 14.3575 8.08079C13.9325 8.51642 13.225 10.5459 13.225 11.0533C13.225 11.5607 13.5788 14.9739 13.9325 15.6978L13.5113 15.8439C13.1563 20.0502 14.9238 20.5589 14.9238 20.5589C15.5613 24.4769 16.1988 22.8088 16.1988 23.8235C16.1988 24.8383 15.5613 24.4769 15.5613 24.4769C15.5613 24.4769 14.9963 26.0721 13.5813 26.6525C12.1663 27.2316 4.31126 30.3502 3.67251 31.0036C3.03251 31.6571 3.10501 34.7039 3.10501 34.7039H36.7888C36.7888 34.7039 36.8638 31.6584 36.2238 31.0036C35.5863 30.3502 27.73 27.2316 26.315 26.6525C24.9 26.0721 24.335 24.4769 24.335 24.4769C24.335 24.4769 23.6975 24.8383 23.6975 23.8235C23.6975 22.8088 24.335 24.4769 24.9725 20.5589C24.9725 20.5589 26.7388 20.0502 26.385 15.8439H25.96L25.9625 15.8413Z" />
        </svg>
    )
}

export default UserIcon;
