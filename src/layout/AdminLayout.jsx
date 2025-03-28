import AdminNavBar from '../components/AdminNavBar'
import { Navigate, Outlet } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { useQuery } from '@tanstack/react-query';
import { getLogin } from '../services/api/user';
const AdminLayout = () => {
    const {token} = useContext(UserContext)
    const admin = { token: token }
    const {data, isError, isLoading} = useQuery({
        queryKey: ['user-login', token],
        queryFn: () => getLogin(token),
        staleTime: 0
    })

    return (
        <div>
            <header>
                <NavigationBar />
            </header>
            {isError && <span>Error auth</span>}
            {isLoading && <span>Loading auth...</span>}
            Bonjour {data}
            {admin.token ? <Outlet /> : <Navigate to="/signin"/> }
        </div>
    );
};

export default AdminLayout;