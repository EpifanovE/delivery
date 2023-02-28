import {useState, createContext, useContext, Fragment, FC, ReactElement, FunctionComponent} from 'react';
import {Link} from '@inertiajs/react';
import {Transition} from '@headlessui/react';
import {HasChildren, HasClassName} from "../types/general";

//@ts-ignore
const DropDownContext = createContext<{ open: boolean, setOpen: any, toggleOpen: any }>();

type DropdownProps = {} & HasChildren

type DropdownType = {
    Trigger: TriggerType
    Content: ContentType
    Link: DropdownLinkType
} & FC<DropdownProps>

const Dropdown: DropdownType = ({children}) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{open, setOpen, toggleOpen}}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

type TriggerProps = {} & HasChildren

type TriggerType = FC<TriggerProps>

const Trigger: TriggerType = ({children}) => {

    const {open, setOpen, toggleOpen} = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen}>{children}</div>

            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
        </>
    );
};

type ContentProps = {
    align?: string
    contentClasses?: string
    closeOnClickInside?: boolean
} & HasChildren & HasClassName

type ContentType = FC<ContentProps>

const Content: ContentType = ({
        align = 'right',
        contentClasses = 'py-1 bg-white',
        children,
        closeOnClickInside = true,
        className,
    }) => {
    const {open, setOpen} = useContext(DropDownContext);

    let alignmentClasses = 'origin-top';

    if (align === 'left') {
        alignmentClasses = 'origin-top-left left-0';
    } else if (align === 'right') {
        alignmentClasses = 'origin-top-right right-0';
    }

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div
                    className={`absolute z-50 mt-2 rounded-sm shadow-lg ${alignmentClasses} ${className}`}
                    onClick={() => setOpen(!closeOnClickInside)}
                >
                    <div className={`rounded-sm ring-1 ring-black ring-opacity-5 ` + contentClasses}>{children}</div>
                </div>
            </Transition>
        </>
    );
};

type DropdownLinkProps = {
    href?: string
    method?: any
    as?: string
} & HasChildren

type DropdownLinkType = FC<DropdownLinkProps>

const DropdownLink: DropdownLinkType = ({href, method, as, children}) => {
    return (
        <Link
            href={href || ''}
            method={method}
            as={as}
            className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
