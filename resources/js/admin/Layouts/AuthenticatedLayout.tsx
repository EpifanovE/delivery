import {FC, Fragment, useEffect, useState,} from 'react';
import {Transition} from '@headlessui/react';
import Dropdown from '../Components/Dropdown';
import {User} from "../types/general";
import {useTranslation} from "react-i18next";
import Message from "../Components/Message";
import Sidebar from "../Components/Sidebar/Sidebar";
import Button from "../Components/Button";
import BarsIcon from "../Components/Icons/BarsIcon";
import SidebarItem from "../Components/Sidebar/SidebarItem";
import UserIcon from "../Components/Icons/UserIcon";
import DashboardIcon from "../Components/Icons/DashboardIcon";
import BotIcon from "../Components/Icons/BotIcon";
import UserLockIcon from "../Components/Icons/UserLockIcon";
import BagIcon from "../Components/Icons/BagIcon";
import MoneyIcon from "../Components/Icons/MoneyIcon";

type AuthenticatedProps = {
    auth?: {
        user?: {
            data: User
        }
    }
    errors?: {[key: string]: string}
    header?: any
    children?: any
    flash?: {
        message?: string
    }
    orders?: number
}

const Authenticated: FC<AuthenticatedProps> = (props) => {

    const {t} = useTranslation();

    const { auth, header, children, flash, errors, orders} = props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [showFlash, setShowFlash] = useState(false);
    const [showErrors, setShowErrors] = useState<string[]>([]);

    useEffect(() => {
        if (flash?.message) {
            setShowFlash(true);
        }
    }, [flash]);

    useEffect(() => {
        if (sidebarOpen) {
            document.body.classList.add('overflow-y-hidden');
            document.body.classList.add('lg:overflow-auto');
        } else {
            document.body.classList.remove('overflow-y-hidden')
        }
    }, [sidebarOpen]);

    useEffect(() => {
        if (window.matchMedia('(min-width: 1024px)').matches) {
            setSidebarOpen(true);
        }
    }, []);

    useEffect(() => {
        if (errors) {
            setShowErrors(Object.keys(errors));
        }
    }, [errors]);

    const handleErrorClose = (code: string) => {
        setShowErrors(showErrors.filter(errorCode => errorCode !== code));
    }

    return (
        <>
            <div className={`bg-gray-100 relative`}>
                <Sidebar
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                >
                    <SidebarItem
                        href={route('dashboard')}
                        text={t('dashboard')}
                        active={route().current('dashboard')}
                        prepend={<DashboardIcon className={'w-6 h-6 mr-3 fill-gray-300'} />}
                    />

                    <SidebarItem
                        href={route('orders.index')}
                        text={t('orders')}
                        active={route().current('orders.index')}
                        prepend={<MoneyIcon className={'w-6 h-6 mr-3 fill-gray-300'} />}
                        append={orders ? <span className={'ml-2 text-sm bg-amber-400 text-stone-800 px-2 py-1 rounded-sm'}>{orders}</span> : null}
                    />

                    <SidebarItem
                        href={route('products.index')}
                        text={t('products')}
                        active={route().current('products.index')}
                        prepend={<BagIcon className={'w-6 h-6 mr-3 fill-gray-300'} />}
                    />

                    <SidebarItem
                        href={route('bots.index')}
                        text={t('bots')}
                        active={route().current('bots.index')}
                        prepend={<BotIcon className={'w-6 h-6 mr-3 fill-gray-300'} />}
                    />

                    <SidebarItem
                        href={route('subscribers.index')}
                        text={t('subscribers')}
                        active={route().current('subscribers.index')}
                        prepend={<UserIcon className={'w-6 h-6 mr-3 fill-gray-300'} />}
                    />

                    {
                        auth?.user?.data.is_super &&
                        <SidebarItem
                            href={route('users.index')}
                            text={t('users')}
                            active={route().current('users.index')}
                            prepend={<UserLockIcon className={'w-6 h-6 mr-3 fill-gray-300'} />}
                        />
                    }
                </Sidebar>
                <div className={`min-h-screen flex flex-col`}>
                    <div className={`fixed z-40 w-full transition-all${sidebarOpen ? ' lg:pl-72' : ' lg:pl-0'}`}>
                        <nav className="bg-white border-b border-gray-100 shadow">
                            <div className="mx-auto px-4">
                                <div className="flex justify-between h-16">
                                    <div className="flex gap-4 items-center">
                                        <Button onClick={() => setSidebarOpen(!sidebarOpen)} className={'focus:outline-none'}>
                                            <BarsIcon className={'w-4 h-4 fill-gray-400'} />
                                        </Button>
                                        <div className="flex space-x-8">
                                            {header}
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="ml-3 relative">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                <span className="md:inline-flex rounded-md hidden">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                    >
                                                        {auth?.user?.data.name}

                                                        <svg
                                                            className="ml-2 -mr-0.5 h-4 w-4"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </button>
                                                </span>
                                                    <Button className={'focus:outline-none block md:hidden'}>
                                                        <UserIcon className={'w-4 h-4 fill-gray-400'} />
                                                    </Button>
                                                </Dropdown.Trigger>

                                                <Dropdown.Content className={'w-48'}>
                                                    <Dropdown.Link href={route('profile.edit')}>{t('profile')}</Dropdown.Link>
                                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                                        {t('logout')}
                                                    </Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </nav>
                    </div>

                    <main className={`mt-16 transition-all ${sidebarOpen ? ' lg:pl-72' : ' lg:pl-0'}`}>
                        <Transition
                            as={Fragment}
                            show={showFlash && !!flash?.message}
                            enter="transition transition-opacity ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className={'md:px-4 sm:px-6 lg:px-8 mt-12'}>
                                <Message onClose={() => setShowFlash(false)} variant={'success'}>{flash?.message}</Message>
                            </div>
                        </Transition>

                        {
                            (errors && Object.entries(errors).length > 0) &&
                            <div className={'md:px-4 sm:px-6 lg:px-8'}>
                            {
                                errors && showErrors.map(error => (
                                    errors[error] && (
                                    <Transition
                                        as={'div'}
                                        appear={true}
                                        show={showErrors.includes(error)}
                                        enter="transition transition-opacity ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        className={'mt-12'}
                                        key={error}
                                    >
                                        <Message onClose={() => handleErrorClose(error)} variant={'error'}>{errors[error]}</Message>
                                    </Transition>
                                    )
                                ))
                            }
                            </div>
                        }

                        {children}
                    </main>
                    <footer className={`mt-auto border-t transition-all${sidebarOpen ? ' lg:pl-72' : ' lg:pl-0'}`}>
                        <div className={'p-4 flex justify-between'}>
                            <a href="https://digitfab.ru" target='_blank' className='text-blue-600 ml-auto'>© Епифанов Е.В., {(new Date().getFullYear())}</a>
                        </div>
                    </footer>
                </div>
            </div>
        </>

    );
}

export default Authenticated;
