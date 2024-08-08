import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
     const {user, loading} = useContext ( AuthContext)
     const location=useLocation()
     // console.log(location.pathname);

     if(loading){
          return <div className="text-center"><span className="loading loading-ring loading-lg  min-h-screen text-center mx-96 mb-3 mt-4"></span></div>
     }
     if(user){
          return children
     }
     return <Navigate state={location.pathname} to={"/login"}></Navigate>
};

PrivateRoute.propTypes = {
     children: PropTypes.element
   };


export default PrivateRoute;