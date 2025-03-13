import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import cookies from "js-cookie";
import { CiMenuBurger } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import {useGlobalContext} from './GlobalProvider'
import logo from '../assets/logo.png'

const Navbar = () => {
    const {isLoggedIn, setIsLoggedIn} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {setIsLoading} = useGlobalContext()
    const navigate = useNavigate();

    const Logout = () => {
        setIsLoading(true)
        cookies.remove('token');
        setIsLoggedIn(false)
        navigate('/login');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div>
            <nav className="bg-amber-400/40 absolute top-0 w-full flex flex-row sm:flex-col lg:flex-row items-center justify-between px-2 py-4">
                <div>
                    <img
                        className="w-20"
                        src={logo}
                        alt="logo"
                    />
                </div>
                
                <ul className={`flex-col gap-1 sm:flex sm:flex-row sm:gap-4 items-center ${isMenuOpen ? 'flex' : 'hidden'} sm:flex`}>
                    <NavLink
                        className={({ isActive }) =>
                            `${isActive ? "text-white" : "text-amber-300"} transition-all duration-500 font-mono font-extralight px-1 sm:px-4 hover:text-2xl text-xl`
                        }
                        to="/redirect"
                    >
                        Redirect
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `${isActive ? "text-white" : "text-amber-300"} transition-all duration-500 font-mono font-extralight px-1 sm:px-4 hover:text-2xl text-xl`
                        }
                        to="/allShortUrls"
                    >
                        My Collection
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            `${isActive ? "text-white" : "text-amber-300"} transition-all duration-500 font-mono font-extralight px-1 sm:px-4 hover:text-2xl text-xl`
                        }
                        to="/"
                    >
                        Add New
                    </NavLink>
                    {isLoggedIn ? (
                        <button type="button" onClick={Logout} className="bg-blue-600 text-white hover:bg-white hover:text-blue-600 transition-all duration-500 font-extralight font-mono rounded-xl px-4 py-2 cursor-pointer">Logout</button>
                    ) : (
                        <>
                            <NavLink
                                className={({ isActive }) =>
                                    `${isActive ? "text-white" : "text-amber-300"} transition-all duration-500 font-mono font-extralight sm:px-4 hover:text-2xl text-xl`
                                }
                                to="/register"
                            >
                                New User?
                            </NavLink>
                            <NavLink
                                className={({ isActive }) =>
                                    `${isActive ? "text-white" : "text-amber-300"} transition-all duration-500 font-mono font-extralight px-2 sm:px-4 hover:text-2xl text-xl`
                                }
                                to="/login"
                            >
                                Login
                            </NavLink>
                        </>
                    )}
                </ul>

                <div className="sm:hidden" onClick={toggleMenu}>
                    <div className="cursor-pointer p-2 text-amber-500 text-xl transition-all duration-500 hover:text-white">
                        {isMenuOpen ? <FaPlus className="rotate-45" /> : <CiMenuBurger />}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
