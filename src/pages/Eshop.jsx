import { useEffect } from "react";
import Product from "../components/Product";
import { getProducts } from "../services/api/products";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@material-tailwind/react";

const Eshop = () => {

    const { data, isError, isLoading, refetch } = useQuery({
         queryKey: ["products"],
         queryFn: () => getProducts(),
         staleTime: 10000,
         enabled: true,
    })

    // useEffect(() => {
    //     window.addEventListener('scroll', (e) => {
    //         console.log(window.scrollY)
    //         if (window.scrollY === 250) {
    //            refetch()
    //        } 
    //     })
    // }, [])

    return (
        <div className="mt-40 flex items-center gap-3.5 justify-center flex-wrap h-screen">
            {isLoading && <span>Loading data...</span>}
            {isError && <span>Error http request</span>}
            {/* <Button onClick={() => refetch()}>Fetch API</Button> */}
            {
                data && data.map((product) => (
                    <div key={product.id}>
                        <Product productData={product} />
                    </div>      
                ))
            }
        </div>
    );
};

export default Eshop;