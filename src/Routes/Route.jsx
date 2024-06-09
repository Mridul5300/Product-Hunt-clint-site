import {createBrowserRouter} from "react-router-dom";
import Main from "../MainLayout/Main";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import Login from "../Pages/Logins/Login";
import Registration from "../Pages/Registration/Registration";
import ErrorPage from "../Pages/Error Pages/ErrorPage";
import DashBord from "../Pages/DashBord/DashBord";
import AddProduct from "../Pages/DashBord/DashBoardPage/AddProduct/AddProduct";


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
               element:<Products></Products>
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
     path:'/dashbord',
     element:<DashBord></DashBord>,
     children:[
          {
               path:"card",
               element:<AddProduct></AddProduct>
          }
     ]

     }

   ]);
   export default router;