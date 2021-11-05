import {ImageEdge, Product as ShopifyProduct} from "../schema";

import {Product} from "@common/types/product";


function normalizeProductImages({edges}: {edges: ImageEdge[]}){
    return edges.map(({node: {originalSrc: url,...rest}}) => {
        return {
            url: `/images/${url}`,
            ...rest
        }
    })
}


export function normalizeProduct(productNode: ShopifyProduct): Product{
    const { id,title: name,handle,images: imageConnection,vendor,description,...rest} = productNode

    const product = {
        id,name,vendor,images: normalizeProductImages(imageConnection),description,path: `/${handle}`,slug: handle.replace(/^\/+|\/+$/g,""),...rest
    }

    return product;
}