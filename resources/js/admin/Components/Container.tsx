import * as React from "react";
import {FC} from "react";

type ContainerProps = {} & React.HTMLProps<HTMLDivElement>

const Container: FC<ContainerProps> = (props) => {
    const {children, className} = props;

    return <div className={`mx-auto sm:px-6 lg:px-8 space-y-6${className ? ' ' + className : ''}`}>
        {children}
    </div>
}

export default Container;
