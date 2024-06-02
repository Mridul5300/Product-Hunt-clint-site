import {createBrowserRouter} from "react-router-dom";
import Main from "../MainLayout/Main";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import Login from "../Pages/Logins/Login";
import Registration from "../Pages/Registration/Registration";


const router = createBrowserRouter([
     {
       path: "/",
       element: <Main></Main>,
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
          }
       ]
     },
   ]);
   export default router;