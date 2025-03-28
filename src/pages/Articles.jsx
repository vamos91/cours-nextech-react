import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const Articles = () => {
    const { id } = useParams()
    const [article, setArticle] = useState({})
    
    useEffect(() => {
        const baseURL = `https://jsonplaceholder.typicode.com/posts/${id}`
        const getOneArticle = async () => {
            const article = await axios.get(baseURL)
            setArticle(article.data)
        }
        getOneArticle()
    }, [])
    return (
        <div>
            <Card className="mt-6 w-96">
                <CardHeader color="blue-gray" className="relative h-56">
                    <img
                    src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="card-image"
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                    {article.title}
                    </Typography>
                    <Typography>
                        {
                            article.body
                    }
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button>Read More</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Articles;