import * as React from "react";
import {FC} from "react";
import {HasChildren} from "../types/general";

const PageTitle: FC<HasChildren> = ({children}) => {
    return <h2 className="font-semibold text-xl text-gray-800 leading-tight">{children}</h2>
}

export default PageTitle;
