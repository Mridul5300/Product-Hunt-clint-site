import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useModerator = () => {
     const {user} = useContext(AuthContext);
     const axiosSecure = useAxiosSecure();
     const {data:  isModerator} = useQuery({
          queryKey:[user?.email, 'isModerator'],
          queryFn: async() =>{
               const res = await axiosSecure.get(`/user/moderator/${user.email}`);
               // console.log(res.data);
               return res.data?.moderator;
          }
     })
     return [isModerator]
};

export default useModerator;