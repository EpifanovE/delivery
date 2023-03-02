import * as React from "react";
import {FC} from "react";

type SelectInputProps = {

} & React.HTMLProps<HTMLSelectElement>

const SelectInput: FC<SelectInputProps> = (props) => {

    const {
        className,
        children,
        onChange,
        label,
        id,
        name
    } = props;

    return (
        <div className={className}>
            {
                label &&
                <label
                    htmlFor={id}
                    className={'block mb-2'}
                >
                    {label}
                </label>
            }
            <select
                id={id}
                name={name}
                onChange={onChange}
                className={'w-full bg-tg-theme-bg-color text-tg-theme-text-color rounded-sm'}
            >
                {children}
            </select>
        </div>
    )
}

export default SelectInput;
