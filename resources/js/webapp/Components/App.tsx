import * as React from "react";
import {FC, useEffect, useState} from "react";
import SelectInput from "./SelectInput";
import { useSpring, animated } from '@react-spring/web';
import {ProductAttribute, ProductServerItem} from "../../common/types/products";
import ButtonPrimary from "./ButtonPrimary";

type AppProps = {
    baseUrl?: string
}

type CarPageProps = {
    src?: string | null
    attributes?: ProductAttribute[]
    description?: string
}

const CarPage = ({src, attributes, description}: CarPageProps) => {

    return (
        <div>
            {
                src &&
                <div className={'mb-4'}><img src={src} className={'rounded-sm'} /></div>
            }

            {
                attributes?.length &&
                <div className={'mb-4'}>
                    {
                        attributes.map((attr: ProductAttribute, index: number) => (
                            <div key={index} className={'flex gap-4'}>
                                <span className={'font-bold'}>{attr.name}:</span>
                                <span className={''}>{attr.value}</span>
                            </div>
                        ))
                    }
                </div>
            }

            {
                description &&
                <div className={'whitespace-pre-wrap'}>
                    {description}
                </div>
            }
        </div>
    )
}

const App: FC<AppProps> = (props) => {

    const [product, setProduct] = useState<ProductServerItem>();

    useEffect(() => {
        setProduct(products[0]);
    }, [products]);

    const priceSpring = useSpring({ val: product?.price, from: { val: 0 }, config: {duration: 300} });

    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const match = products.filter(product => product.id === parseInt(e.target.value));

        if (!match.length) return;

        setProduct({...match[0]});
    }

    return (
        <div className={'min-h-screen flex columns flex-col bg-tg-theme-bg-color text-tg-theme-text-color'}>
            <div className={'py-3 px-4 flex justify-between items-center bg-slate-800 text-gray-50 fixed top-0 left-0 right-0'}>
                <div className={'flex gap-2 text-2xl'}>
                    <animated.div>
                        {priceSpring.val.interpolate(val => Math.floor(val))}
                    </animated.div>
                    <span> руб.</span>
                </div>
                <div>
                    <ButtonPrimary>
                        Далее
                    </ButtonPrimary>
                </div>
            </div>

            <div className={'py-3 px-4 pt-20'}>
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

                <div
                    className={'relative'}
                >

                    <CarPage
                        src={product?.image?.full_url}
                        attributes={product?.attributes}
                        description={product?.description || ''}
                    />

                </div>
            </div>
        </div>
    )
}

export default App;
