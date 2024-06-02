import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import {  Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";


const Registration = () => {
     const navigate = useNavigate();
     const { creatUser, logout } = useContext(AuthContext);
     const [error, setError] = useState(null);
     const [registrationSuccess, setRegistrationSuccess] = useState(false);
     const [showpassword, setShowpassword] = useState(false)

     const { register,
          handleSubmit,
          formState: { errors }, } = useForm();

     const onSubmit = data => {


          setError(""); // Clear previous error
          const { email, Password } = data;
          if (Password.length < 6) {
               setError("password should be 6 character ")
               return
          }
          if (!/[a-z]/.test(Password)) {
               return setError('Your password must contain at least one small letter')
          }
          if (!/[A-Z]/.test(Password)) {
               return setError('Your password must contain at least one Capital letter.')
          }


          creatUser(email, Password)
               .then(result => {
                    console.log(result);
                    toast.success("Registration successful");
                    setRegistrationSuccess(true);
                    logout()
               })
               .catch(error => {
                    console.log(error);
                    //  setError(error.message);
                    toast.error("Registration failed. Please try again.");
               });
     };
     useEffect(() => {
          if (registrationSuccess) {
               setTimeout(() => {
                    navigate("/login");
               }, 1000);
          }
     }, [registrationSuccess, navigate]);
     return (
          <div>
               <div className="max-w-6xl mx-auto min-h-screen bg-cover bg-center mt-2 mb-2">
                    <div className="max-w-screen-md mx-auto p-8">
                         <h1 className=" font-bold text-5xl text-center  mb-8">Register Now</h1>
                         <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
                              <div className="mb-4">
                                   <label className="block text-sm font-boldtext  mb-1" htmlFor="fullName">Full Name</label>
                                   <input type="text" id="fullName" className="input input-bordered w-full transition-all duration-300 focus:outline-none focus:ring focus:border-blue-400" {...register("fullName", { required: true })} />
                                   {errors.fullName && <span className='text-red-400'>This field is required</span>}
                              </div>
                              <div className="mb-4">
                                   <label className="block text-sm font-bold mb-1 " htmlFor="email">Email</label>
                                   <input type="text" id="email" className="input input-bordered w-full transition-all duration-300 focus:outline-none focus:ring focus:border-blue-400  " {...register("email", { required: true })} />
                                   {errors.email && <span className='text-red-400'>This field is required</span>}
                              </div>
                              <div className="mb-4">
                                   <label className="block text-sm  font-bold mb-1 " htmlFor="image">Image URL</label>
                                   <input type="Text" id="image" className="input input-bordered w-full" {...register("image",{ required: true })} />

                              </div>
                              <div className="mb-2 relative">
                                   <label className="block text-sm  font-bold mb-1 " htmlFor="password">Password</label>

                                   <span onClick={() => setShowpassword(!showpassword)} className="absolute right-3 top-1/2 my-4 transform -translate-y-1/2 cursor-pointer">

                                        {
                                             showpassword ? <IoMdEyeOff className="text-2xl  "></IoMdEyeOff> : <IoMdEye className=" text-2xl"></IoMdEye>
                                        }
                                   </span>

                                   <input
                                        type={showpassword ? "text" : "password"}
                                        id="password"
                                        className="input input-bordered w-full"
                                        {...register("Password", { required: true })}
                                   />
                                   {errors.Password && <span className='text-red-400'>This field is required</span>}
                              </div>
                              <p className='text-red-500'>{error}</p>
                              <div className="mb-4">
                                   <button className="btn btn-primary w-full">Register</button>
                              </div>
                         </form>
                         <p className="    text-xl text-center">Already have an account? <Link to="/login" className="btn-link text-red-300 text-xl">Log in</Link></p>
                    </div>
                    <Toaster />
               </div>
          </div>
     );
};

export default Registration;