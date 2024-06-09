import { NavLink, Outlet } from "react-router-dom";

const DashBord = () => {
     return (
          <div className="flex">
               <div className="w-64 min-h-screen mt-5 mb-5 bg-gray-400">
                    <ul className="menu p-6 mt-5">
                    <li><NavLink to={"/dashbord/userprofile"}>User Profile</NavLink></li>
                    <li><NavLink to={"/dashbord/card"}>Add Product</NavLink></li>
                    <li><NavLink to={"/dashbord/myproduct"}>My Product</NavLink></li>
                    <div className="divider"></div>
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    </ul>
               </div>
               <div className="flex-1 mt-5">
                    <Outlet></Outlet>
               </div>
          </div>
     );
};

export default DashBord;