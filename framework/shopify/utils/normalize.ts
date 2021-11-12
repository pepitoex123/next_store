import {
    ImageEdge,
    MoneyV2,
    Product as ShopifyProduct,
    ProductOption,
    ProductVariantConnection,
    SelectedOption
} from "../schema";

import {Product} from "@common/types/product";


function normalizeProductImages({edges}: {edges: ImageEdge[]}){
    return edges.map(({node: {originalSrc: url,...rest}}) => {
        return {
            url: `/images/${url}`,
            ...rest
        }
    })
}

const normalizeProductPrice = ({currencyCode,amount}: MoneyV2) => {
    return {
        value: +amount,
        currencyCode
    }
}

const normalizeProductOption = ({id, values, name: displayName}: ProductOption) => {
    const normalized = {
        id,displayName,values: values.map((value) => {
            let output: any = {
                label: value
            }

            if(displayName.match(/colou?r/gi)){
                output = {
                    ...output,
                    hexColor: value
                }
            }
            return output
        })
    }
    return normalized
}

const normalizeProductVariants = ({edges}: ProductVariantConnection) => {
    return edges.map(({node}) => {
        const {id,selectedOptions,sku,title,priceV2,compareAtPriceV2} = node;

        return {
            id,
            name: title,
            sku: sku ?? id,
            price: +priceV2?.amount,
            listPrice: +compareAtPriceV2?.amount,
            requiresShipping: true,
            options: selectedOptions.map(({name,value}: SelectedOption) => {
                const option = normalizeProductOption({
                    id,
                    name,
                    values: [value]
                })

                return option
            })
        }
    })
}


export function normalizeProduct(productNode: ShopifyProduct): Product{
    const { id,title: name,handle,images: imageConnection,vendor,description,priceRange,options,variants,...rest} = productNode

    const product = {
        id,name,vendor,images: normalizeProductImages(imageConnection),price: normalizeProductPrice(priceRange.minVariantPrice),description,path: `/${handle}`,slug: handle.replace(/^\/+|\/+$/g,""),options: options ?
            options.filter(o => o.name !== "Title").map((o) => normalizeProductOption(o))
         : [], variants: variants ? normalizeProductVariants(variants) : [],...rest
    }

    return product;
}