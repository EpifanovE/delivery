import * as React from "react";
import {FC} from "react";
import Button, {ButtonProps} from "./Button";

const ButtonPrimary: FC<ButtonProps> = ({children}) => {
    return <Button className={'bg-red-800 border-red-800 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-900'}>{children}</Button>
}

export default ButtonPrimary
