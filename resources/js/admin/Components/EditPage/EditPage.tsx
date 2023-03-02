import * as React from "react";
import {FC} from "react";

export const Label: FC<React.HTMLProps<HTMLLabelElement>> = ({children, htmlFor, className}) => {
    return (
        <label className={`md:w-48 mt-1 mb-2 md:mb-0 w-full flex-grow-1${className ? ' ' + className : ''}`} htmlFor={htmlFor}>
            {children}
        </label>
    )
}

export const InputRow: FC<React.HTMLProps<HTMLDivElement>> = ({children, className}) => {
    return (
        <div className={`flex flex-wrap md:flex-nowrap min-h-[42px]${className ? ' ' + className : ''}`}>
            {children}
        </div>
    )
}

export const FieldGroup: FC<React.HTMLProps<HTMLDivElement>> = ({children}) => {
    return (
        <div className={`flex-1`}>
            {children}
        </div>
    )
}
