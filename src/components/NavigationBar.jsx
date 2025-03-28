import React, { useContext } from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";


import { Link } from 'react-router-dom'
import { CardContext } from '../context/CardProvider';

const NavigationBar = () => {

  const {productList} = useContext(CardContext)

    const [openNav, setOpenNav] = React.useState(false);
 
    React.useEffect(() => {
        window.addEventListener(
        "resize",
        () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);
    
    const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="gray"
        className="p-1 font-normal"
        >

        <Link className="flex items-center" to='/'>Home</Link>
          
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="gray"
        className="p-1 font-normal"
      >
       <Link className="flex items-center" to='/basic-auth/burger-shop'>Burger shop</Link>
        </Typography>
         <Typography
        as="li"
        variant="small"
        color="gray"
        className="p-1 font-normal"
      >
       <Link className="flex items-center" to='/basic-auth/e-shop'>E-Shop</Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="gray"
        className="p-1 font-normal"
      >
       <Link className="flex items-center" to='/basic-auth/blog'>Blog</Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="gray"
        className="p-1 font-normal"
      >
        <Link className="flex items-center" to='/basic-auth/contact'>Contact</Link>
        </Typography>
      <Typography
        as="li"
        variant="small"
        color="gray"
        className="p-1 font-normal"
      >
          <Link className="flex items-center" to='/admin
        '>Dashboard</Link>
      </Typography>
         <Typography
        as="li"
        variant="small"
        color="gray"
        className="p-1 font-normal"
      >
        <Link className="flex items-center" to='/basic-auth/card'>Card({productList.length})</Link>
      </Typography>
    </ul>
  );
    return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Material Tailwind
        </Typography>
        <div className="hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            <Link to='/signin'>
              <Button variant="text" size="sm" className="hidden lg:inline-block">
              <span>Signin</span>
            </Button>
            </Link>
            <Link to='/signup'>
              <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>Signup</span>
            </Button>
            </Link>
             <Link to='/signin' onClick={() => setToken(null)}>
              <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>Logout</span>
            </Button>
            </Link>
          
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
    </Navbar>
    );
};

export default NavigationBar;