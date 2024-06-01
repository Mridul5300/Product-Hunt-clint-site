import {createBrowserRouter} from "react-router-dom";
import Main from "../MainLayout/Main";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";


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
          }
       ]
     },
   ]);
   export default router;