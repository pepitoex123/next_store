import {ImageEdge, MoneyV2, Product as ShopifyProduct, ProductOption} from "../schema";

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
    console.log("ID", id);
    console.log("NAME", displayName);
    console.log("VALUES", values);
}


export function normalizeProduct(productNode: ShopifyProduct): Product{
    const { id,title: name,handle,images: imageConnection,vendor,description,priceRange,options,...rest} = productNode

    const product = {
        id,name,vendor,images: normalizeProductImages(imageConnection),price: normalizeProductPrice(priceRange.minVariantPrice),description,path: `/${handle}`,slug: handle.replace(/^\/+|\/+$/g,""),options: options ?
            options.filter(o => o.name !== "Title").map((o) => normalizeProductOption(o))
         : [],...rest
    }

    return product;
}