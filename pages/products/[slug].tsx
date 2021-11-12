

import {Layout} from "@components/common";
import {GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType} from "next";
import getAllProductsPaths from "@framework/product/get-all-products-paths";
import {getConfig} from "@framework/api/config";
import getProduct from "@framework/product/get-product";

// fetch all of the products slugs
export const getStaticPaths: GetStaticPaths = async() => {

    const config = getConfig()
    const {products} = await getAllProductsPaths(config)

    return {
        paths: products.map((p) => ({params: {slug: p.slug}})),
        fallback: false
    }
}


// provide product specific data to the page
export const getStaticProps = async ({params}: GetStaticPropsContext<{slug: string}>) => {
    const config = getConfig();
    const {product} = await getProduct({config, variables: {slug: params!.slug}})


    return {
        props: {
            product
        }
    }
}


export default function ProductSlug({product}: InferGetStaticPropsType<typeof getStaticProps>){
    return (
        <div>
            <p>id: {product?.id} </p>
            <p>slug: {product?.name}</p>
            <p>price: {product?.price.value} </p>
            <p>price currency: {product?.price.currencyCode} </p>
            <p>description: {product?.description}</p>
            <div>
                {
                    product?.options.map(option => <div>
                        <p>Name: {option.displayName}</p>
                        {
                            option.values.map(value => <div>
                                <p>Label: {value.label}</p>
                                <p>Hex Color: {value?.hexColor}</p>
                            </div>)
                        }
                    </div>)
                }
            </div>
            <div>
                {product?.variants.map(variant =>
                    <div>
                        <p>Variant Name: {variant.name}</p>
                        {variant.options.map(vo =>
                            <div>
                                <p>Name: {vo.displayName}</p>
                                {vo.values.map(value =>
                                    <div>
                                        <p>Label: {value.label}</p>
                                        <p>HexColor: {value?.hexColor}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

ProductSlug.Layout = Layout;