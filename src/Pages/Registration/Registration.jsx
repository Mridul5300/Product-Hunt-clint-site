import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import AxiosPublic from "../hooks/AxiosPublic";
import Lottie from "lottie-react";
import animation from "../../../public/background.json";

const Registration = () => {
    const axiospublic = AxiosPublic();
    const navigate = useNavigate();
    const { creatUser, logout, upDateUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [showpassword, setShowpassword] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        setError(""); // Clear previous error
        const { email, Password } = data;
        if (Password.length < 6) {
            setError("Password should be at least 6 characters.");
            return;
        }
        if (!/[a-z]/.test(Password)) {
            return setError('Your password must contain at least one lowercase letter.');
        }
        if (!/[A-Z]/.test(Password)) {
            return setError('Your password must contain at least one uppercase letter.');
        }

        creatUser(email, Password)
            .then(result => {
                console.log(result);
                toast.success("Registration successful");
                setRegistrationSuccess(true);

                // Update user
                upDateUser(data.fullName, data.image)
                    .then(() => {
                        const userInfo = {
                            name: data.fullName,
                            email: data.email
                        };
                        axiospublic.post('/user', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('User added to the database');
                                }
                            });
                    });

                reset();
                logout();
            })
            .catch(error => {
                console.log(error);
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
        <div className="relative max-w-6xl mx-auto min-h-screen bg-cover bg-center mt-2 mb-2 p-4">
            <h1 className="font-bold text-5xl text-center mb-8 text-gray-800">Register Now</h1>
            <div className="flex flex-col-reverse lg:flex-row md:flex-row mx-auto p-8 bg-white rounded-lg ">
                <div className="w-full h-64 md:h-auto md:w-1/2 relative">
                    <Lottie animationData={animation} loop={true} />
                </div>
                <div className="w-full md:w-1/2 p-4 flex flex-col justify-center border rounded-xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="fullName">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                className="input input-bordered w-full transition-all duration-300 focus:outline-none focus:ring focus:border-blue-400"
                                {...register("fullName", { required: true })}
                            />
                            {errors.fullName && <span className="text-red-400 text-sm">This field is required</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="input input-bordered w-full transition-all duration-300 focus:outline-none focus:ring focus:border-blue-400"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-400 text-sm">This field is required</span>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="image">Image URL</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                className="input input-bordered w-full transition-all duration-300 focus:outline-none focus:ring focus:border-blue-400"
                                {...register("image", { required: true })}
                            />
                            {errors.image && <span className="text-red-400 text-sm">This field is required</span>}
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-sm font-bold text-gray-700 mb-1" htmlFor="password">Password</label>
                            <span
                                onClick={() => setShowpassword(!showpassword)}
                                  className="absolute right-3 top-1/2 my-4 transform -translate-y-1/2 cursor-pointer"
                            >
                                {showpassword ? <IoMdEyeOff className="text-2xl text-gray-600" /> : <IoMdEye className="text-2xl text-gray-600" />}
                            </span>
                            <input
                                type={showpassword ? "text" : "password"}
                                id="password"
                                className="input input-bordered w-full transition-all duration-300 focus:outline-none focus:ring focus:border-blue-400"
                                {...register("Password", { required: true })}
                            />
                            {errors.Password && <span className="text-red-400 text-sm">This field is required</span>}
                        </div>
                        <p className="text-red-500 text-sm">{error}</p>
                        <div className="mb-4">
                            <button type="submit" className="btn btn-primary w-full">Register</button>
                        </div>
                    </form>
                </div>
            </div>
            <p className="text-xl text-center mt-4">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link></p>
            <Toaster />
        </div>
    );
};

export default Registration;
