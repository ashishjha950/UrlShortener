import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RiseLoader from 'react-spinners/RiseLoader'
import {useGlobalContext} from './GlobalProvider'


const ShortUrl = () => {
  const [formData, setFormData] = useState({
    url: "",
  });
  const {isLoading,setIsLoading} = useGlobalContext()
  setIsLoading(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate()
  const submitForm = async(e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await axios.post("/api/shortUrl", { originalUrl: formData })
      setFormData({
        url: "",
      })
      toast.success(response.data.message,{autoClose:1000})
      navigate('/allShortUrls')

    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isLoading?<RiseLoader />:
      <div className="max-w-md w-full mt-8">
        <form
          onSubmit={submitForm}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="Enter URL for shortening"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
        <Link to="/allShortUrls">
          <button
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-300 ease-in-out mt-4"
          >
            My Urls
          </button>
  
        </Link>
        </div>
        }
        </div>
      
  );
};

export default ShortUrl;
