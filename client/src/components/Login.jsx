import React, { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useAuth} from './AuthProvider'
import RiseLoader from 'react-spinners/RiseLoader';
import {useGlobalContext} from './GlobalProvider'

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false)
    const {isLoading,setIsLoading} = useGlobalContext()
    const {setIsLoggedIn} = useAuth()
    const navigate = useNavigate();

    useEffect(()=>{setIsLoading(false)},[])
    

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const SubmitForm = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const response = await axios.post('/api/User/login', {formData})
            toast.success(response.data.message, { autoClose: 1000 });
            setIsLoggedIn(true)
            navigate('/allShortUrls');            
        } catch (error) {
            toast.error(error.response?.data || 'Something went wrong', { autoClose: 1000 });
            console.error(error)
            setIsLoading(false)
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {isLoading?<RiseLoader/>:
            <div className="bg-white p-5 sm:p-10 rounded-lg shadow-lg w-full max-w-md">
                <form onSubmit={SubmitForm}>
                    <h2 className="mb-6 text-3xl font-bold text-center text-gray-700">Login</h2>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            required
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your Email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 font-medium mb-2" htmlFor="password">Password</label>
                        <div className="w-full flex items-center p-3 border border-gray-300 rounded-lg peer-focus:border-blue-500">
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                autoComplete='current Password'
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your Password"
                                className="w-full focus:outline-none peer"
                            />
                            <button type="button" className="cursor-pointer rounded-full click:bg-gray-300 p-2" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">Login</button>
                </form>
                <div className="text-right mt-2 text-blue-600">
                    <Link to="/register">Don't have an Account?</Link>
                </div>
            </div>
            }
        </div>
    );
};

export default Login;
