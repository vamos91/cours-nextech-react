import axios from "axios"

export const getProducts = async () => {
    const products = await axios.get('https://fakestoreapi.com/products')
    console.log(products.data)
    return products.data
}