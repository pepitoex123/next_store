import cn from 'classnames'
import React, {FC, useState} from 'react'
import s from './ProductView.module.css'
import {Button, Container} from '@components/ui'
import Image from "next/image"
import { Product } from '@common/types/product'
import {ProductSlider,Swatch} from "@components/Product";
import {Choices,getVariant} from "@components/Product/helpers";
import {useUI} from "@components/ui/context";

interface Props {
    product: Product
}



const ProductView: FC<Props> = ({ product }) => {

    const [choices,setChoices] = useState<Choices>({});

    const {openSidebar} = useUI();


    const variant = getVariant(product,choices)


    const addToCart = () => {
        try{
            const item = {
                productId: String(product.id),
                variantId: variant?.id,
                variantOptions: variant?.options
            }
            alert(JSON.stringify(item))
            openSidebar()
        }catch{
        }
    }

    return (
        <Container>
            <div className={cn(s.root, 'fit',"mb-5")}>
                <div className={cn(s.productDisplay, 'fit')}>
                    <div className={s.nameBox}>
                        <h1 className={s.name}>{product.name}</h1>
                        <div className={s.price}>
                            {product.price.value}
                            {` `}
                            {product.price.currencyCode}
                        </div>
                    </div>
                    <ProductSlider>
                        {
                            product.images.map(image => <div key={image.url} className={s.imageContainer}>
                                    <Image
                                        className={s.img}
                                        src={image.url}
                                        alt={image.alt}
                                        width={1050}
                                        height={1050}
                                        quality="85"
                                    />
                            </div>)
                        }
                    </ProductSlider>
                </div>
                <div className={s.sidebar}>
                    <section>
                        {product.options.map(option => {
                            return(
                                <div key={option.id} className="pb-4">
                                    <h2 className="uppercase font-medium">{option.displayName}</h2>
                                    <div className="flex flex-row py-4">
                                        {
                                            option.values.map(ov => {
                                                const activeChoice = choices[option.displayName.toLowerCase()]
                                                console.log(activeChoice)
                                                return(
                                                    <Swatch active={ov.label.toLowerCase() === activeChoice} key={`${option.id}-${ov.label}`} color={ov.hexColor} label={ov.label} variant={option.displayName} onClick={() => {
                                                        setChoices({
                                                            ...choices,
                                                            [option.displayName.toLowerCase()]: ov.label.toLowerCase()
                                                        })
                                                    }}/>
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                        )}
                        <div className="pb-14 break-words w-full max-w-xl text-lg">
                            {product.description}
                        </div>
                    </section>
                    <div>
                        <Button className={s.button} onClick={addToCart}>
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ProductView