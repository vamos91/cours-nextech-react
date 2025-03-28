import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext()

const UserProvider = ({children}) => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || null )
    console.log('token from user provider:', token)
    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(token))
    }, [token])
    return (
        <UserContext.Provider value={{ token, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;