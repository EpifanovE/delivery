import * as React from "react";
import {FC, useEffect, useState} from "react";
import SelectInput from "./SelectInput";
import { CSSTransition } from 'react-transition-group';
import {ProductAttribute, ProductServerItem} from "../../common/types/products";

type AppProps = {
    baseUrl?: string
}

const App: FC<AppProps> = (props) => {

    const [product, setProduct] = useState<ProductServerItem>();

    useEffect(() => {
        setProduct(products[0]);
    }, [products]);

    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const match = products.filter(product => product.id === parseInt(e.target.value));

        if (!match.length) return;

        setProduct({...match[0]});
    }

    return (
        <div className={'min-h-screen px-4 py-3 flex columns flex-col bg-tg-theme-bg-color text-tg-theme-text-color'}>
            <div className={'py-3 flex justify-between items-center'}>
                <div className={'text-2xl'}>
                    {product?.price || 0} руб.
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
                    id={'product'}
                    name={'product'}
                    onChange={handleProductChange}
                    value={product?.id}
                    label={'Выберите автомобиль'}
                    className={'mb-4'}
                >
                    {
                        products.map(product => (
                            <option value={product.id} key={product.id}>
                                {product.name}
                            </option>
                        ))
                    }
                </SelectInput>

                {
                    product?.image &&
                    <CSSTransition
                        timeout={300}
                        classNames="fade"
                    >
                        <div className={'mb-4'}>
                            <img src={product.image.full_url} />
                        </div>
                    </CSSTransition>
                }

                {
                    product?.attributes?.length &&
                    <div className={'mb-4'}>
                        {
                            product.attributes.map((attr: ProductAttribute, index: number) => (
                                <div key={index} className={'flex gap-4'}>
                                    <span className={'font-bold'}>{attr.name}:</span>
                                    <span className={''}>{attr.value}</span>
                                </div>
                            ))
                        }
                    </div>
                }

                {
                    product?.description &&
                    <div className={'whitespace-pre-wrap'}>
                        {product?.description}
                    </div>
                }
            </div>
        </div>
    )
}

export default App;
