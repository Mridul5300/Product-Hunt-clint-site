import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const useProduct = () => {
     const axiosSecure = useAxiosSecure();
     const {user} = useContext(AuthContext); 
     const { data: product = []} = useQuery({
          queryKey:['product',user.email],
          queryFn: async() => {
               const res = await axiosSecure.get(`/myproduct/${user?.email}`);
               return res.data
          }
     })
     return[product]
};

export default useProduct;
// const useProduct = () => {
//      const axiosSecure = useAxiosSecure();
//      const { data: products = []} = useQuery({
//           queryKey:['products'], // Removed undefined product
//           queryFn: async() => {
//                const res = await axiosSecure.get("/product");
//                console.log(res.data);
//                return res.data;
//           }
//      });
//      return [products];
// };

// export default useProduct;
