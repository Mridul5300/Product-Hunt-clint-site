import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Home/NavBar/NavBar";


const Main = () => {
     return (
          <div>
               <NavBar></NavBar>
               <Outlet></Outlet>
          </div>
     );
};

export default Main;