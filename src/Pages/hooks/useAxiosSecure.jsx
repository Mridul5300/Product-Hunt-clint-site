

import axios from "axios";
// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Provider/AuthProvider";

 const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
//     const navigate = useNavigate();
//     const { logout } = useContext(AuthContext);

//    useEffect(() => {
//      axiosSecure.interceptors.request.use(
//           (config) => {
//               const token = localStorage.getItem('access-token');
//               if (token) {
//                   config.headers.Authorization = `Bearer ${token}`;
//               }
//               return config;
//           },
//           (error) => {
//               console.error('Request error:', error);
//               return Promise.reject(error);
//           }
//       );
  
//       axiosSecure.interceptors.response.use(
//           (response) => {
//               return response;
//           },
//           async (error) => {
//               console.error('Response:', error);
  
            
//               if (error.response) {
//                   const status = error.response.status;
//                   console.log('Status error:', status);
  
//                   if (status === 401 || status === 403) {
//                       await logout();
//                       navigate('/login');
//                   }
//               } 
//             //   else if (error.request) {
                  
//             //       console.error('No response :', error.request);
//             //   } else {
//             //       console.error('Error in :', error.message);
//             //   }
  
//               return Promise.reject(error);
//           }
//       );
//    },[logout,navigate])

    return axiosSecure;
};

export default useAxiosSecure;

