import * as React from "react";
import {FC} from "react";
import Button, {ButtonProps} from "./Button";
import ButtonPrimary from "./ButtonPrimary";

const ButtonSecondary: FC<ButtonProps> = ({children}) => {
    return <Button className={'bg-slate-700 border-slate-700 text-white hover:bg-slate-600 focus:bg-slate-600 active:bg-slate-800'}>{children}</Button>
}

export default ButtonSecondary
