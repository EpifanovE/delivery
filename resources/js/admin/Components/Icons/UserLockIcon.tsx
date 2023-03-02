import * as React from "react";
import {FC} from "react";
import {IconProps} from "../../types/general";

const UserLockIcon: FC<IconProps> = (props) => {

    const {className} = props;

    return (
        <svg className={`${className ? ' ' + className : ''}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 18C18.4167 18 18.7707 17.854 19.062 17.562C19.354 17.2707 19.5 16.9167 19.5 16.5C19.5 16.0833 19.354 15.7293 19.062 15.438C18.7707 15.146 18.4167 15 18 15C17.5833 15 17.2293 15.146 16.938 15.438C16.646 15.7293 16.5 16.0833 16.5 16.5C16.5 16.9167 16.646 17.2707 16.938 17.562C17.2293 17.854 17.5833 18 18 18ZM18 21C18.5167 21 18.9877 20.879 19.413 20.637C19.8377 20.3957 20.1917 20.075 20.475 19.675C20.1083 19.4583 19.7167 19.2917 19.3 19.175C18.8833 19.0583 18.45 19 18 19C17.55 19 17.1167 19.0583 16.7 19.175C16.2833 19.2917 15.8917 19.4583 15.525 19.675C15.8083 20.075 16.1627 20.3957 16.588 20.637C17.0127 20.879 17.4833 21 18 21ZM9 8H15V6C15 5.16667 14.7083 4.45833 14.125 3.875C13.5417 3.29167 12.8333 3 12 3C11.1667 3 10.4583 3.29167 9.875 3.875C9.29167 4.45833 9 5.16667 9 6V8ZM18 23C16.6167 23 15.4377 22.5127 14.463 21.538C13.4877 20.5627 13 19.3833 13 18C13 16.6167 13.4877 15.4373 14.463 14.462C15.4377 13.4873 16.6167 13 18 13C19.3833 13 20.5627 13.4873 21.538 14.462C22.5127 15.4373 23 16.6167 23 18C23 19.3833 22.5127 20.5627 21.538 21.538C20.5627 22.5127 19.3833 23 18 23ZM4 22V8H7V6C7 4.61667 7.48767 3.43733 8.463 2.462C9.43767 1.48733 10.6167 1 12 1C13.3833 1 14.5627 1.48733 15.538 2.462C16.5127 3.43733 17 4.61667 17 6V8H20V11.3C19.6667 11.1833 19.3333 11.104 19 11.062C18.6667 11.0207 18.3333 11 18 11C16.05 11 14.396 11.679 13.038 13.037C11.6793 14.3957 11 16.05 11 18C11 18.7167 11.1127 19.4123 11.338 20.087C11.5627 20.7623 11.8667 21.4 12.25 22H4Z" />
        </svg>
    )
}

export default UserLockIcon;
