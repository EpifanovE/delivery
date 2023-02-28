import * as React from "react";
import {FC} from "react";
import {Link} from "@inertiajs/react";

type ButtonProps = {
    variant?: 'primary' | 'primaryOutline' | 'warning' | 'success'
    type?: 'button' | 'submit' | 'reset'
    onClick?: (e: React.MouseEvent) => void
    processing?: boolean
    href?: string
} & React.HTMLProps<HTMLButtonElement>

const Button: FC<ButtonProps> = (props) => {

    const {
        variant,
        children,
        className = '',
        type,
        onClick,
        processing,
        href,
        title,
    } = props;

    const colorClasses = (): string => {
        switch (variant) {
            case 'primary':
                return 'bg-gray-800 border-gray-800 text-white hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900';
            case 'primaryOutline':
                return 'bg-transparent border-gray-800 text-gray-800 hover:bg-gray-300 focus:bg-gray-400 active:bg-gray-500';
            case 'warning':
                return 'bg-orange-600 border-orange-600 text-white hover:bg-orange-500 focus:bg-orange-400 active:bg-orange-400';
            case 'success':
                return 'bg-green-600 border-green-600 text-white hover:bg-green-500 focus:bg-green-400 active:bg-green-400';
            default:
                return '';
        }
    }

    const commonClasses = 'inline-flex items-center justify-center px-4 py-3 border font-semibold text-xs rounded-sm uppercase tracking-widest transition ease-in-out duration-150 ';

    if (!!href) {
        return <Link
            href={href}
            className={`${commonClasses} ${colorClasses()}${className ? ' ' + className : ''}${processing ? ' opacity-25' : ''}`}
            title={title}
        >
            {children}
        </Link>
    }

    return <button
        type={type}
        className={`${commonClasses} ${colorClasses()}${className ? ' ' + className : ''}${processing ? ' opacity-25' : ''}`}
        onClick={onClick}
        title={title}
    >
        {children}
    </button>
}

export default Button
