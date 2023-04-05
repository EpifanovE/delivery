import * as React from "react";
import {FC, HTMLProps} from "react";

export type ButtonProps = {

} & HTMLProps<HTMLButtonElement>

const Button: FC<ButtonProps> = (props) => {

    const {
        children,
        className,
    } = props;

    return (
        <button
            className={`
            inline-flex items-center justify-center px-4 py-3 border font-semibold text-xs rounded-sm uppercase tracking-widest transition ease-in-out duration-150
            ${className ? ' ' + className : ''}
            `}
        >
            {children}
        </button>
    )
}

export default Button;
