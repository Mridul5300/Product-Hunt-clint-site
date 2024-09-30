import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useModerator = () => {
     const { user } = useContext(AuthContext);
     const axiosSecure = useAxiosSecure();
     const { data: isModerator, isPending: isModeratorLoading } = useQuery({
          queryKey: [user?.email, 'isModerator'],
          enabled: !!user?.email,
          queryFn: async () => {
               const res = await axiosSecure.get(`/user/moderator/${user.email}`);
               // console.log(res);     
               return res.data?.moderator || false;     
          }
     });
     return [isModerator, isModeratorLoading]; 
};


export default useModerator;
