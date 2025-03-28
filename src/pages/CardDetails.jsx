import { useContext } from "react";
import { CardContext } from "../context/CardProvider";
import Product from "../components/Product";

const CardDetails = () => {
    const { productList } = useContext(CardContext)
    console.log('card details', productList)

    const resultat = productList.map((item, index) => <Product key={index} productData={item}/>)

    return (
        <div className="mt-40 flex items-center gap-3.5 justify-center flex-wrap h-screen">
            {resultat}
        </div>
    );
};

export default CardDetails;