import {useEffect, useState} from 'react';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import {Link} from 'react-router-dom'

const Blog = () => {
    const [posts, setPosts] = useState(null)
    const [isLoading, setIsloading] = useState(false)

    const admin = {isAdmin: true}

     useEffect(() => {
        setIsloading(true)
        const getData = async () => {
        try {
            const posts = await axios.get('https://jsonplaceholder.typicode.com/posts')
            if(posts.status === 200){
            setPosts(posts.data)
            setIsloading(false)
            }
        } catch (error) {
            console.log('error:', error)
            setIsloading(false)
        } 
        }
        getData()
  }, [])
    return (
        <div className="posts">
            {
                isLoading && <h2>Loading...</h2>
            }
            {
                posts && posts.map((post, index) => (
                    <div key={index}>{post.title} <Link to={`/admin/blog/${post.id}`}><Button>Voir article</Button>{admin.isAdmin && <Button>Modifier Article</Button>} </Link></div>
                ))
            }
        </div>
    );
};

export default Blog;