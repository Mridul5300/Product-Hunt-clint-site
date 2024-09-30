import { useContext, useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { BsFillHouseAddFill } from "react-icons/bs";
import { FcHome, FcSettings, FcStatistics } from "react-icons/fc";
import { MdAddCard, MdHomeWork, MdReviews } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useModerator from "../hooks/useModerator";
import { BiLogOutCircle } from "react-icons/bi";
import { RiCoupon2Fill, RiRepeat2Line } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";

const DashBord = () => {
     const { logout } = useContext(AuthContext);
     const [isActive, setActive] = useState(false)
     const [isAdmin] = useAdmin();
     const [isModerator] = useModerator();

     const handleToggle = () => {
          setActive(!isActive)
     }
     return (
          <div>
               {/* Small Screen Navbar */}
               <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                    <div>
                         <div className='block text-3xl uppercase text-violet-400 font-semibold  italic cursor-pointer p-4'>
                              <Link to='/'>
                                   TEchHunt
                              </Link>
                         </div>
                    </div>

                    <button
                         onClick={handleToggle}
                         className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                    >
                         <AiOutlineBars className='h-5 w-5' />
                    </button>
               </div>

               {/* Sidebar */}
               <div
                    className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                         }  md:translate-x-0  transition duration-200 ease-in-out`}
               >
                    <div>
                         <div>
                              <div className='w-full text-4xl uppercase font-semibold italic hidden md:flex px-4 py-2 text-violet-400 rounded-lg justify-center items-center  mx-auto'>
                                   <Link to='/'>
                                        TEchHunt
                                   </Link>

                              </div>
                         </div>

                         {/* Nav Items */}
                         <div className='flex flex-col justify-between flex-1 mt-6'>
                              {/* Conditional toggle button here.. */}

                              {/*  Menu Items */}

                              {
                                   isAdmin ? <>
                                        <nav>

                                             {/* user Profile */}

                                             <NavLink
                                                  to='statistics'
                                                  className={({ isActive }) =>
                                                       `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                                       }`
                                                  }
                                             >
                                                  <FcStatistics className='w-5 h-5' />

                                                  <span className='mx-4 font-medium'>Statistics Page</span>
                                             </NavLink>

                                             {/* Add Room */}
                                             <NavLink
                                                  to="users"
                                                  className={({ isActive }) =>
                                                       `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                                       }`
                                                  }
                                             >
                                                  <FaRegCircleUser className='w-5 h-5' />

                                                  <span className='mx-4 font-medium'> Manage Users</span>
                                             </NavLink>

                                             {/* My Listing */}
                                             <NavLink
                                                  to='/dashbord/coupons'
                                                  className={({ isActive }) =>
                                                       `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                                       }`
                                                  }
                                             >
                                                  <RiCoupon2Fill className='w-5 h-5' />

                                                  <span className='mx-4 font-medium'>Manage Coupons</span>
                                             </NavLink>
                                             <NavLink
                                                  to='/dashbord/addcupons'
                                                  className={({ isActive }) =>
                                                       `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                                       }`
                                                  }
                                             >
                                                  <MdAddCard className='w-5 h-5' />

                                                  <span className='mx-4 font-medium'>Add Coupons</span>
                                             </NavLink>
                                        </nav>
                                   </>
                                        :
                                        isModerator ? <>
                                             <nav>

                                                  {/* user Profile */}

                                                  <NavLink
                                                       to="/dashbord/review"
                                                       className={({ isActive }) =>
                                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                                            }`
                                                       }
                                                  >
                                                       <MdReviews className='w-5 h-5 text-red-300' />

                                                       <span className='mx-4 font-medium'>Review Queue</span>
                                                  </NavLink>

                                                  {/* Add Room */}
                                                  <NavLink
                                                       to='report'
                                                       className={({ isActive }) =>
                                                            `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                                            }`
                                                       }
                                                  >
                                                       <RiRepeat2Line className='w-5 h-5 text-red-300' />

                                                       <span className='mx-4 font-medium'>Reported Contents</span>
                                                  </NavLink>
                                             </nav>
                                        </>
                                             :
                                             <>
                                                  <nav>

                                                       {/* user Profile */}

                                                       <NavLink
                                                            to='profile'
                                                            className={({ isActive }) =>
                                                                 `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                                                 }`
                                                            }
                                                       >
                                                            <FcSettings className='w-5 h-5' />

                                                            <span className='mx-4 font-medium'>User Profile</span>
                                                       </NavLink>

                                                       {/* Add Room */}
                                                       <NavLink
                                                            to="/dashbord/card"
                                                            className={({ isActive }) =>
                                                                 `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                                                 }`
                                                            }
                                                       >
                                                            <BsFillHouseAddFill className='w-5 h-5' />

                                                            <span className='mx-4 font-medium'>Add Product</span>
                                                       </NavLink>

                                                       {/* My Listing */}
                                                       <NavLink
                                                            to='/dashbord/myproduct'
                                                            className={({ isActive }) =>
                                                                 `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                                                 }`
                                                            }
                                                       >
                                                            <MdHomeWork className='w-5 h-5' />

                                                            <span className='mx-4 font-medium'>My Product</span>
                                                       </NavLink>
                                                  </nav>
                                             </>
                              }

                         </div>
                    </div>

                    <div>
                         {/* Shared Component  */}
                         <hr />

                         {/* Profile Menu */}
                         <NavLink
                              to='/'
                              className={({ isActive }) =>
                                   `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                                   }`
                              }
                         >
                              <FcHome className='w-5 h-5' />

                              <span className='mx-4 font-medium'>Home</span>
                         </NavLink>

                         <button
                              onClick={logout}
                              className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                         >
                              <BiLogOutCircle className='w-5 h-5 text-red-400' />

                              <span className='mx-4 font-medium'>Logout</span>
                         </button>


                    </div>
               </div>
          </div>

     );
};

export default DashBord;