import { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";


const Burger = ({ burgerName, handleParentClick }) => {
    
    const [counter, setCounter] = useState(0)
    const[isOrder, setIsOrder] = useState(false)
    const handleClick = () => {
        setCounter(counter + 1)
        console.log(counter)
    }

    const orderBurger = () => {
        setIsOrder(true)
        handleParentClick(burgerName)
    }

    return (
        <div>
            <Card className="mt-6 w-96">
                <CardHeader color="blue-gray" className="relative h-56">
                    <img
                    src="https://www.biofournil.com/wp-content/uploads/2021/02/BRIOCHE-BIOFOURNIL_web.jpg"
                    alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                    {burgerName}
                    </Typography>
                    <Typography>
                    The place is close to Barceloneta Beach and bus stop just 2 min by
                    walk and near to &quot;Naviglio&quot; where you can enjoy the main
                    night life in Barcelona.
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button onClick={() => handleClick()}>Like{counter}</Button>
                    <Button onClick={() => orderBurger()}>Order</Button>
                </CardFooter>
                </Card>
        </div>
    );
};

export default Burger;