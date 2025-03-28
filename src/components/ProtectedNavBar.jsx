import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProtectedNavBar = ({children}) => {
    const path = useLocation()
    const [isNavBar, setIsNavBar] = useState(false)
    useEffect(() => {
        if (path.pathname === '/signin' || path.pathname === '/signup') {
                setIsNavBar(false)
        } else {
            setIsNavBar(true)
        }
    }, [])
    
    return (
        <div>
            {isNavBar && children}
        </div>
    );
};

export default ProtectedNavBar;