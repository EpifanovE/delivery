import * as React from "react";
import {FC} from "react";

type CardProps = {} & React.HTMLProps<HTMLDivElement>

const Card: FC<CardProps> = (props) => {
    const {children, className} = props;

    return <div className={`bg-white shadow sm:rounded-sm${className ? ' ' + className : ''}`}>
        {children}
    </div>
}

export default Card;

type CardBodyProps = {} & React.HTMLProps<HTMLDivElement>

export const CardBody: FC<CardBodyProps> = (props) => {
    const {children, className} = props;

    return <div className={`p-6 border-b last:border-0${className ? ' ' + className : ''}`}>
        {children}
    </div>
}

type CardHeaderProps = {} & React.HTMLProps<HTMLDivElement>

export const CardHeader: FC<CardHeaderProps> = (props) => {
    const {children, className} = props;

    return <div className={`p-6 border-b last:border-0${className ? ' ' + className : ''}`}>
        {children}
    </div>
}

type CardFooterProps = {} & React.HTMLProps<HTMLDivElement>

export const CardFooter: FC<CardFooterProps> = (props) => {
    const {children, className} = props;

    return <div className={`p-6${className ? ' ' + className : ''}`}>
        {children}
    </div>
}

type CardTitleProps = {
    tag?: keyof JSX.IntrinsicElements
} & React.HTMLProps<HTMLTitleElement>

export const CardTitle: FC<CardTitleProps> = (props) => {
    const {children, className, tag: Tag = 'h2'} = props;

    return <Tag className={`uppercase font-semibold${className ? ' ' + className : ''}`}>
        {children}
    </Tag>
}

type CardSubTitleProps = {
    tag?: keyof JSX.IntrinsicElements
} & React.HTMLProps<HTMLElement>

export const CardSubTitle: FC<CardSubTitleProps> = (props) => {
    const {children, className, tag: Tag = 'p'} = props;

    return <Tag className={`text-sm text-gray-600${className ? ' ' + className : ''}`}>
        {children}
    </Tag>
}


