import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {  FaTrashAlt, FaUsers } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";


const ManegeUser = () => {
     const axiosSecure = useAxiosSecure();

     const { data: users = [] , refetch } = useQuery({
          queryKey: ['users'],
          queryFn: async () => {
               const res = await axiosSecure.get('/user')
               return res.data;
          }
     });

     const  handleDellet = user => {
          axiosSecure.delete(`/user/${user._id}`)
          .then( res => {
               refetch()
               toast.success('User Deleted')
               return res.data
               
          })
     }

     const handleMakeAdmin = user => {
          axiosSecure.patch(`/user/admin/${user._id}`)
          .then(res => {
               console.log(res.data);     
                    refetch()
               toast.success(`${user.name} is an admin Now!`,     )     
          })
     }

     const handleMakeModerator = user => {
          axiosSecure.patch(`/user/moderator/${user._id}`)
          .then(res => {
               console.log(res.data);     
                    refetch()
               toast.success(`${user.name} is an moderator Now!`,     )     
          })
     }
     return (
          <div>
               <div className='flex justify-evenly my-4'>
                    <h2 className="text-xl">All User</h2>
                    <h2 className="text-xl">Total User : {users.length}</h2>
               </div>
               <div className="overflow-x-auto">
                    <table className="table table-zebra">
                         {/* head */}
                         <thead className="bg-gray-400">
                              <tr>
                                   <th></th>
                                   <th>Name</th>
                                   <th>Email</th>
                                   <th>Admin</th>
                                   <th>Moderator</th>
                                   <th>Role</th>
                              </tr>
                         </thead>
                         <tbody>
                              {
                                   users.map((user, index ) => <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                             { user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)}
                                                  className="btn bg-orange-200 btn-md"> 
                                                  <FaUsers className="text-red-600 text-2xl "></FaUsers>    
                                                  </button> 
                                             }
                                        </td>
                                        <td>
                                        { user.role === 'moderator' ? 'Moderator' : <button onClick={() => handleMakeModerator(user)}
                                                  className="btn bg-orange-200 btn-md"> 
                                                  <FaUsers className="text-red-600 text-2xl "></FaUsers>    
                                                  </button> 
                                             }
                                        </td>
                                        <td>
                                         <button onClick={() => handleDellet(user)}
                                                  className="btn bg-orange-200 btn-md"> 
                                                  <FaTrashAlt className="text-red-600 text-xl "></FaTrashAlt>    
                                        </button> 
                                        </td>

                                   </tr> )
                                   }
                         </tbody>
                    </table>
               </div>
               <Toaster></Toaster>
          </div>
     );
};

export default ManegeUser;