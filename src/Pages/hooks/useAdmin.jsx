import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
     const {user} = useContext(AuthContext);
     const axiosSecure = useAxiosSecure();
     const {data: isAdmin, isPending: isAdminloading } = useQuery({
          queryKey:[user?.email, 'isAdmin'],
          queryFn: async() =>{
               const res = await axiosSecure.get(`/user/admin/${user.email}`);
               // console.log(res.data);
               return res.data?.admin;
          }
     })
     return[isAdmin,isAdminloading]
};

export default useAdmin;