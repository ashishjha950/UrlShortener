import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useGlobalContext} from './GlobalProvider'
import RiseLoader from 'react-spinners/RiseLoader';


const Redirect = () => {
    const [formData, setFormData] = useState({ shortID: '' });
    
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const {isLoading,setIsLoading} = useGlobalContext()

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const response = await axios.get(`/api/shortUrl/${formData.shortID}`);
            window.location.href = response.data;
        } catch (error) {
          toast.error(error.response.data,{autoClose:1000})
            console.error(error)
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {isLoading?<RiseLoader/>:
            <div className="bg-white p-5 sm:p-10 rounded-lg shadow-lg w-full max-w-md">
                <form onSubmit={submitForm}>
                    <h2 className="mb-6 text-3xl font-bold text-center text-gray-700">Redirect</h2>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-medium mb-2" htmlFor="shortID">Short URL ID</label>
                        <input
                            required
                            type="text"
                            name="shortID"
                            id="shortID"
                            value={formData.shortID}
                            onChange={handleChange}
                            placeholder="Enter the Short URL ID"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out">Redirect</button>
                </form>
            </div>
            }
        </div>
    );
};

export default Redirect;
