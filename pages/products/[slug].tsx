

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
            {product?.name}
            {product?.slug}
            {product?.path}
            {product?.price.value}
            {product?.price.currencyCode}
        </div>
    )
}

ProductSlug.Layout = Layout;