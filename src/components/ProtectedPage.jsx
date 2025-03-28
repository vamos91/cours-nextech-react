import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const ProtectedPage = () => {
    const {token} = useContext(UserContext)
    const user = { token: token }
    //==> get data from context about user {token: ..., isAdmin: true/false, email:...}
    return (
        <div>
            {user.token ? <Outlet /> : <Navigate to="/signin" />} 
        </div>
    );
};

export default ProtectedPage;