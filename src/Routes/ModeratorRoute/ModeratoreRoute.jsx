import { useContext } from "react";
import useModerator from "../../Pages/hooks/useModerator";
import { AuthContext } from "../../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const ModeratoreRoute = ({children}) => {
     const {user,loading} = useContext(AuthContext)
const [isModerator,isModeratorloading] = useModerator()
const location=useLocation()
// console.log(location.pathname);

if(loading || isModeratorloading){
     return <div className="text-center"><span className="loading loading-ring loading-lg  text-center mx-96 mb-3 mt-4"></span></div>
}
if(user && isModerator){
     return children
}
     return <Navigate state={location.pathname} to={"/login"}></Navigate>
};

export default ModeratoreRoute;