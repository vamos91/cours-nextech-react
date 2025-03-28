import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useContext } from "react";
import { CardContext } from "../context/CardProvider";
 
const Product = ({ productData }) => {
  const {addProductToCard} = useContext(CardContext)
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={productData.image}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {productData.title}
        </Typography>
        <Typography>
          {productData.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={() => addProductToCard(productData)}>Add to card</Button>
      </CardFooter>
    </Card>
  );
}

export default Product;