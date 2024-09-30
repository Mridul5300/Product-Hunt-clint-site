import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider";


const useAdmin = () => {
     const { user } = useContext(AuthContext);
     const axiosLink = useAxiosSecure();
 
     const { data: isAdmin, isLoading: isAdminLoading, error } = useQuery({
         queryKey: [user?.email, 'isAdmin'],
         enabled: !!user?.email,
         queryFn: async () => {
             const res = await axiosLink.get(`/user/admin/${user.email}`);
            //  console.log('API Response:', res.data); 
 
             return res.data.user?.role === 'admin'; 
         },
     });
 
     if (error) {
         console.error('Error fetching admin data:', error);
     }
 
    //  console.log('isAdmin:', isAdmin); 
 
     return [isAdmin, isAdminLoading];
 };
 
 export default useAdmin;
 
