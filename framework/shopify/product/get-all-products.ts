import getAllProductsQuery from "../utils/queries/get-all-products";
import fetchApi from "../utils/fetch-api";
import {normalizeProduct} from "../utils/normalize";
import {ProductConnection} from "../schema";
import {Product} from "@common/types/product";

type ReturnType = {
    products: ProductConnection
}


const getAllProducts = async (): Promise<Product[]> => {
    const {data} = await fetchApi<ReturnType>({query: getAllProductsQuery});

    // Normalize and return new data

    const products = data.products.edges.map(({node: product}) => {
        return normalizeProduct(product)
    }) ?? []


    return products
}


export default getAllProducts;