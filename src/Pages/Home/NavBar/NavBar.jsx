import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

const NavBar = () => {
     const {logout,user} = useContext(AuthContext);
     const navigate = useNavigate(); 
     const handleLogout = async () => {
          console.log("Logout initiated");
          await logout();
          console.log("Logout completed");
          navigate('/login');
        };
     const Navlinks =<>
     <li><NavLink to={'/'} >Home</NavLink></li>
     <li><NavLink to={'product'}>Product</NavLink></li>
     </>
     
     return (
          <div>
               <div className="navbar bg-base-100">
                    <div className="navbar-start">
                         <div className="dropdown">
                              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                              </div>
                              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52">
                                   {Navlinks}
                              </ul>
                         </div>
                         <Link to={"/"} >
                              <img className="h-28 w-28 ml-16 mt-2" src="https://i.ibb.co/DCVP4rB/images-removebg-preview.png" alt="" />
                         </Link>
                    </div>
                    <div className=" navbar-center  ml-80 hidden lg:flex ">
                         <ul className="menu menu-horizontal gap-7 ml-40 px-1">
                              {Navlinks}
                         </ul>
                    </div>
                    <div className="navbar-end ml-10 mr-16 z-30">
                         { user ? (
                         <div className="dropdown dropdown-end">
                              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                   <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={ user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} title={(user?.displayName || user.email) }/>
                                   </div>
                              </div>
                              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                   <li>
                                        <a className="justify-between">
                                             HI ,
                                             <span className="text-black z-20">{user?.displayName || user.displayName || "New"}</span>
                                        </a>
                                   </li>
                                   <li><NavLink to={'dashbord/card'}>DashBord</NavLink></li>
                                   <button  onClick={handleLogout} className="btn  hover  text-black md:pb-2 md:px-4 py-1 px-2 cursor-pointer">Logout</button>
                              </ul>
                              </div>
                              ) : (
                                   <Link to='/login'>
                                   <button className="btn btn-ghost text-black text-lg md:text-xl  hover md:pb-2 md:px-4 py-1 px-2 rounded-lg ">Login</button>
                              </Link>     
                              )}
                    </div>
               </div>
          </div>
     );
};

export default NavBar;
