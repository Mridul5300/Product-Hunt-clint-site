import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAdmin from "../../Pages/hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";


const AdminRoute = ({children}) => {
const {user,loading} = useContext(AuthContext)
const [isAdmin,isAdminloading] = useAdmin()
const location=useLocation()
// console.log(location.pathname);

if(loading || isAdminloading){
     return <div className="text-center"><span className="loading loading-ring loading-lg  text-center mx-96 mb-3 mt-4"></span></div>
}
if(user && isAdmin){
     return children
}
return <Navigate state={location.pathname} to={"/login"}></Navigate>
};

export default AdminRoute;