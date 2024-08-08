import {createBrowserRouter} from "react-router-dom";
import Main from "../MainLayout/Main";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import Login from "../Pages/Logins/Login";
import Registration from "../Pages/Registration/Registration";
import ErrorPage from "../Pages/Error Pages/ErrorPage";
import AddProduct from "../Pages/DashBord/DashBoardPage/AddProduct/AddProduct";
import DashBoardLayout from "../Pages/DashBord/DashBoardLayout/DashBoardLayout";
import MyProduct from "../Pages/DashBord/DashBoardPage/MyProduct/MyProduct";
import MyProFile from "../Pages/DashBord/DashBoardPage/MyProfile/MyProFile";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import StaticPage from "../Pages/DashBord/DashBoardPage/StaticPage/StaticPage";
import ManegeUser from "../Pages/DashBord/DashBoardPage/ManegUser/ManegeUser";
import AdminRoute from "./AdminRoute/AdminRoute";
import Reported from "../Pages/DashBord/DashBoardPage/Reported/Reported";
import Review from "../Pages/DashBord/DashBoardPage/Review/Review";
import MangeCupon from "../Pages/DashBord/DashBoardPage/Manege Cupon/MangeCupon";
import ModeratoreRoute from "./ModeratorRoute/ModeratoreRoute";




const router = createBrowserRouter([
     {
       path: "/",
       element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
       children:[
          {
               path:"/",
               element:<Home></Home>
               
          },
          {
               path:"/product",
               element:<PrivateRoute><Products></Products></PrivateRoute>          
          },

          {
               path: "/productdetail/:id",
               element:<ProductDetails></ProductDetails>,
               loader: ({ params }) => fetch(`http://localhost:5000
/productdetail/${params.id}`)
          },
          {
               path:"/login",
               element:<Login></Login>
          },
          {
               path:"/registration",
               element:<Registration></Registration>
          },
       ]
     },
     
     {     
     path:'dashbord',
     element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
     children:[
          {
               path:"card",
               element:<AddProduct></AddProduct>
          },
          {
               path:"myproduct",
               element:<MyProduct></MyProduct>
          },
          {
               path:"profile",
               element:<MyProFile></MyProFile>
          },
          // Admin 
          {
               path:'statistics',
               element:<AdminRoute><StaticPage></StaticPage></AdminRoute>
          },
          {
               path:'users',
               element:<AdminRoute><ManegeUser></ManegeUser></AdminRoute>
          },
          {
               path:'coupons',
               element:<AdminRoute><MangeCupon></MangeCupon></AdminRoute>
          },
          // Moderator
          {
               path:'report',
               element:<ModeratoreRoute><Reported></Reported></ModeratoreRoute>
          },
          {
               path:'review',
               element:<ModeratoreRoute><Review></Review></ModeratoreRoute>
          }
     ]

     }

   ]);
   export default router;