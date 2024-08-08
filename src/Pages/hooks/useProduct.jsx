import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const useProduct = () => {
     const axiosSecure = useAxiosSecure();
     const {user} = useContext(AuthContext); 
     const { data: product = []} = useQuery({
          queryKey:['product', user?.email],
          queryFn: async() => {
               const res = await axiosSecure.get(`/user?email=${user.email}`);
               return res.data
          }
     })
     return[product]
};

export default useProduct;