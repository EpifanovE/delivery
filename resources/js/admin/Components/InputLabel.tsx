import {HasChildren} from "../types/general";
import {FC} from "react";

type InputLabelProps = {
    forInput?: string
    value?: string
    className?: string
} & HasChildren

const InputLabel: FC<InputLabelProps> = ({ forInput, value, className, children }) => {
    return (
        <label htmlFor={forInput} className={`block font-medium text-sm text-gray-700 ` + className}>
            {value ? value : children}
        </label>
    );
}

export default InputLabel;
