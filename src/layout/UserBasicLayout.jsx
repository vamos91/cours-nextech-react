import { Outlet, Navigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const UserBasicLayout = () => {
  const {token} = useContext(UserContext)
   const user = {token: token}
    return (
        <div>
          <NavigationBar />
          {user.token ? <Outlet /> : <Navigate to="/signin"/>} 
        </div>
    );
};

export default UserBasicLayout;