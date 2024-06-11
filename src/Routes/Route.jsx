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
     path:'dashbord',
     element:<DashBoardLayout></DashBoardLayout>,
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
          
     ]

     }

   ]);
   export default router;