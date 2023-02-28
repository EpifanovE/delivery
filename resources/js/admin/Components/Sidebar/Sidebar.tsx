import * as React from "react";
import {FC} from "react";
import {Link} from "@inertiajs/react";
import TelegramIcon from "../Icons/TelegramIcon";
import Button from "../Button";
import TimesIcon from "../Icons/TimesIcon";
import {useTranslation} from "react-i18next";



type SidebarProps = {
    open?: boolean
    onClose?: () => void
} & React.HTMLProps<HTMLDivElement>

const Sidebar: FC<SidebarProps> = (props) => {

    const {t} = useTranslation();

    const {open, onClose, children} = props;

    return (
        <>
        <div className={`w-full lg:hidden h-screen overflow-hidden fixed z-40 left-0 top-0 bg-gray-900 opacity-50${open ? ' translate-x-0' : ' -translate-x-full'}`}></div>
        <div className={`w-[90%] z-50 sm:w-72 bg-zinc-800 h-screen overflow-y-auto fixed left-0 top-0 transition-transform${open ? ' translate-x-0' : ' -translate-x-full'}`}>
            <div className={`h-16 px-6 border-b border-zinc-700 flex justify-center items-center flex justify-between lg:justify-center`}>
                <Link href="/">
                    <TelegramIcon className={'block w-auto fill-[#0088cc] w-9 h-9'} />
                </Link>
                <Button className={'text-gray-400 border-gray-400 fill-gray-400 lg:hidden'} onClick={() => onClose && onClose()}>
                    <TimesIcon className={'w-4 h-4 mr-2'} />
                    {t('buttons.close')}
                </Button>
            </div>
            <div>
                {children}
            </div>
        </div>
        </>
    )
}

export default Sidebar;
