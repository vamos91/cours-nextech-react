import { createContext, useState } from "react";

export const CardContext = createContext()

const CardProvider = ({children}) => {

    const [productList, setProductList] = useState([])

    const addProductToCard = (product) => {
        console.log('product from context ', product)
        setProductList([...productList, product])
    }

    return (
        <CardContext.Provider value={{productList, addProductToCard}}>
            {children}
        </CardContext.Provider>
    );
};

export default CardProvider;