import * as React from "react";
import {FC} from "react";
import {HasChildren} from "../types/general";
import TimesIcon from "./Icons/TimesIcon";
import Button from "./Button";

type MessageProps = {
    variant?: 'success' | 'error' | 'info'
    onClose?: () => void
} & HasChildren

const Message: FC<MessageProps> = (props) => {

    const {
        variant,
        children,
        onClose,
    } = props;

    const colors = {
        success: 'bg-green-200 border-green-300 text-green-800',
        error: 'bg-red-200 border-red-300 text-red-800',
        info: 'bg-blue-200 border-blue-300 text-blue-800',
    };

    const fillColors = {
        success: 'fill-green-800 hover:fill-green-600',
        error: 'fill-red-800 hover:fill-red-600',
        info: 'fill-blue-800 hover:fill-blue-600',
    }

    return (
        <div className={`p-4 rounded-sm border relative ${variant ? colors[variant] : ''} ${!!onClose ? ' pr-14' : '' }`}>
            {children}
            {
                onClose &&
                <Button className={`right-2 top-2 absolute border-0`} onClick={onClose}>
                    <TimesIcon className={`w-4 h-4 transition ease-out duration-300 ${variant ? fillColors[variant] : ''}`} />
                </Button>
            }
        </div>
    )
}

export default Message;
