// import { useContext, useState } from "react";
// import { useForm } from "react-hook-form";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// import { AuthContext } from "../../Provider/AuthProvider";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import toast, { Toaster } from 'react-hot-toast';
// import AxiosPublic from "../hooks/AxiosPublic";
// import animation from '../../../public/animation.json'
// import Lottie from "lottie-react";

// const Login = () => {
//   const { signIn } = useContext(AuthContext);
//   const { googleLogin } = useContext(AuthContext);
//   const [showpassword, setShowpassword] = useState(false);
//   const [error, setError] = useState(null);
//   const location = useLocation();
//   const axiospublic = AxiosPublic();
//   const navigate = useNavigate();
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     const { email, password } = data;
//     if (password.length < 6) {
//       setError("Password should be 6 characters");
//       return;
//     }
//     if (!/[a-z]/.test(password)) {
//       return setError('Your password must contain at least one small letter');
//     }
//     if (!/[A-Z]/.test(password)) {
//       return setError('Your password must contain at least one capital letter.');
//     }
//     signIn(email, password)
//       .then((result) => {
//         console.log(result.user);
//         toast.success("Login successful");
//         navigate(location?.state ? location.state : "/");
//       })
//       .catch((error) => {
//         console.error(error);
//         toast.error("Login not successful");
//       });
//   };

//   const handleSociallogin = (socialProvider) => {
//     socialProvider()
//       .then((result) => {
//         toast.success("Login successful");
//         if (result.user) {
//           console.log(result.user);
//           const userInfo = {
//             email: result.user?.email,
//             name: result.user?.displayName,
//           };
//           axiospublic.post("/user", userInfo).then((res) => {
//             console.log(res.data);
//           });
//           navigate(location?.state || "/");
//         }
//       });
//   };

//   return (
//     <div>
//       <div className="text-center -mt-6 ">
//         <h1 className="text-5xl font-bold">Login now!</h1>
//       </div>
//       <div className="hero min-h-screen">
//         <div className="hero-content flex flex-col-reverse lg:flex-row">
//               {/* Animation */}
//         <div className="lg:w-1/2">
//             <Lottie animationData={animation} />
//           </div>
//           {/* Login Form */}
//           <div className="lg:w-1/2 flex flex-col justify-center">
//             <div className="card shrink-0 w-[450px] mt-4 border">
//               <form onSubmit={handleSubmit(onSubmit)} className="card-body">
//                 <div className="form-control">
//                   <label className="label">
//                     <span className="label-text">Email</span>
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     {...register("email", { required: true })}
//                     placeholder="email"
//                     className="input input-bordered"
//                     required
//                   />
//                   {errors.email && (
//                     <span className="text-red-400">This field is required</span>
//                   )}
//                 </div>
//                 <div className="space-y-2 relative">
//                   <div className="flex justify-between">
//                     <label htmlFor="password" className="text-sm">
//                       Password
//                     </label>
//                     <span
//                       onClick={() => setShowpassword(!showpassword)}
//                       className="absolute right-3 top-1/2 my-4 transform -translate-y-1/2 cursor-pointer"
//                     >
//                       {showpassword ? (
//                         <IoMdEyeOff className="text-2xl mt-4 mb-3" />
//                       ) : (
//                         <IoMdEye className="text-2xl mt-4 mb-3" />
//                       )}
//                     </span>
//                   </div>
//                   <input
//                     type={showpassword ? "text" : "password"}
//                     name="password"
//                     id="password"
//                     placeholder="password"
//                     className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
//                     {...register("password", { required: true })}
//                   />
//                   {errors.password && (
//                     <span className="text-red-400">This field is required</span>
//                   )}
//                 </div>
//                 <p className="text-red-500">{error}</p>
//                 <div className="form-control mt-6">
//                   <button className="btn btn-primary">Login</button>
//                 </div>
//               </form>
//               <div className="mb-5">
//                 <div className="flex items-center space-x-1">
//                   <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
//                   <p className="px-3 text-sm dark:text-gray-600">
//                     Login with social accounts
//                   </p>
//                   <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
//                 </div>
//                 <div className="flex justify-center space-x-4">
//                   <button
//                     onClick={() => handleSociallogin(googleLogin)}
//                     aria-label="Log in with Google"
//                     className="btn btn-link p-3 rounded-sm"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 32 32"
//                       className="w-5 h-5 fill-current"
//                     >
//                       <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
//                     </svg>
//                   </button>
//                 </div>
//                 <p className="text-xs text-center -mt-4 sm:px-6 dark:text-gray-600">
//                   Don't have an account?
//                   <Link to={"/registration"} className="underline text-lg font-bold text-red-500  dark:text-slate-500">
//                     Sign up
//                   </Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Toaster />
//     </div>
//   );
// };

// export default Login;
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import AxiosPublic from "../hooks/AxiosPublic";
import animation from '../../../public/animation.json';
import Lottie from "lottie-react";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const { googleLogin } = useContext(AuthContext);
  const [showpassword, setShowpassword] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const axiospublic = AxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    if (password.length < 6) {
      setError("Password should be at least 6 characters");
      return;
    }
    if (!/[a-z]/.test(password)) {
      return setError('Your password must contain at least one lowercase letter');
    }
    if (!/[A-Z]/.test(password)) {
      return setError('Your password must contain at least one uppercase letter.');
    }
    signIn(email, password)
      .then((result) => {
        toast.success("Login successful");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error("Login not successful");
      });
  };

  const handleSociallogin = (socialProvider) => {
    socialProvider()
      .then((result) => {
        toast.success("Login successful");
        if (result.user) {
          const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName,
          };
          axiospublic.post("/user", userInfo).then((res) => {
            console.log(res.data);
          });
          navigate(location?.state || "/");
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center -mt-6 mb-8">
        <h1 className="text-4xl font-bold">Login now!</h1>
      </div>
      <div className="hero min-h-screen w-full">
        <div className="hero-content flex  flex-col-reverse lg:flex-row w-full max-w-screen-lg">
          {/* Animation */}
          <div className="lg:w-1/2 w-full">
            <Lottie animationData={animation} />
          </div>
          {/* Login Form */}
          <div className="lg:w-1/2 w-full flex flex-col justify-center">
            <div className="card shrink-0 w-full max-w-sm mx-auto mt-4 border">
              <form onSubmit={handleSubmit(onSubmit)} className="card-body p-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...register("email", { required: true })}
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                  {errors.email && (
                    <span className="text-red-400">This field is required</span>
                  )}
                </div>
                <div className="space-y-2 relative">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm">
                      Password
                    </label>
                    <span
                      onClick={() => setShowpassword(!showpassword)}
                      className="absolute right-3 top-1/2 my-4 transform -translate-y-1/2 cursor-pointer"
                    >
                      {showpassword ? (
                        <IoMdEyeOff className="text-2xl" />
                      ) : (
                        <IoMdEye className="text-2xl" />
                      )}
                    </span>
                  </div>
                  <input
                    type={showpassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="password"
                    className="w-full px-3 py-2 border rounded-md focus:border-violet-600"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span className="text-red-400">This field is required</span>
                  )}
                </div>
                <p className="text-red-500">{error}</p>
                <div className="form-control mt-6">
                  <button className="btn btn-primary w-full">Login</button>
                </div>
              </form>
              <div className="mb-5">
                <div className="flex items-center space-x-1">
                  <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                  <p className="px-3 text-sm dark:text-gray-600">
                    Login with social accounts
                  </p>
                  <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => handleSociallogin(googleLogin)}
                    aria-label="Log in with Google"
                    className="btn btn-link p-3 rounded-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                    </svg>
                  </button>
                </div>
                <p className="text-xs text-center -mt-4 sm:px-6 dark:text-gray-600">
                  Don't have an account?
                  <Link to={"/registration"} className="underline text-lg font-bold text-red-500 dark:text-slate-500">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;

