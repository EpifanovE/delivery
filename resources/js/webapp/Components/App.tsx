import * as React from "react";
import {FC, useEffect, useState} from "react";
import {ServiceServerItem} from "../../common/types/services";
import SelectInput from "./SelectInput";
import { CSSTransition } from 'react-transition-group';

type AppProps = {
    baseUrl?: string
}

const App: FC<AppProps> = (props) => {

    const [service, setService] = useState<ServiceServerItem>();

    useEffect(() => console.log(service), [service])

    useEffect(() => {
        setService(services[0]);
    }, [services]);

    const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const match = services.filter(service => service.id === parseInt(e.target.value));

        if (!match.length) return;

        setService({...match[0]});
    }

    return (
        <div className={'min-h-screen px-4 py-3 flex columns flex-col bg-tg-theme-bg-color text-tg-theme-text-color'}>
            <div className={'py-3 flex justify-between items-center'}>
                <div className={'text-2xl'}>
                    {service?.price || 0} руб.
                </div>
                <div>
                    <button
                        className={'inline-flex items-center justify-center px-4 py-3 border font-semibold text-xs rounded-sm uppercase tracking-widest transition ease-in-out duration-150  bg-red-800 border-red-800 text-white hover:bg-red-700 focus:bg-red-700 active:bg-red-900'}>
                        Заказать
                    </button>
                </div>
            </div>

            <div className={'py-3'}>
                <SelectInput
                    id={'service'}
                    name={'service'}
                    onChange={handleServiceChange}
                    value={service?.id}
                    label={'Выберите автомобиль'}
                    className={'mb-4'}
                >
                    {
                        services.map(service => (
                            <option value={service.id} key={service.id}>
                                {service.name}
                            </option>
                        ))
                    }
                </SelectInput>

                {
                    service?.image &&
                    <CSSTransition
                        timeout={300}
                        classNames="fade"
                    >
                        <div className={'mb-4'}>
                            <img src={service.image.full_url} />
                        </div>
                    </CSSTransition>
                }

                {
                    service?.attributes?.length &&
                    <div className={'mb-4'}>
                        {
                            service.attributes.map((attr, index) => (
                                <div key={index} className={'flex gap-4'}>
                                    <span className={'font-bold'}>{attr.name}:</span>
                                    <span className={''}>{attr.value}</span>
                                </div>
                            ))
                        }
                    </div>
                }

                {
                    service?.description &&
                    <div className={'whitespace-pre-wrap'}>
                        {service?.description}
                    </div>
                }
            </div>
        </div>
    )
}

export default App;
