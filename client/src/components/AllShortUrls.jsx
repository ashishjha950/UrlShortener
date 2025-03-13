import axios from "axios";
import React, { useState, useEffect } from "react";
import RiseLoader from 'react-spinners/RiseLoader'
import {Link} from 'react-router-dom'
import {useGlobalContext} from './GlobalProvider'

const AllShortUrls = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const {isLoading,setIsLoading} = useGlobalContext()

  useEffect(()=>{
    const fetchData = async() => {
      setIsLoading(true)
      const response = await axios.get("/api/shortUrl")
      setFetchedData(response.data)
      setIsLoading(false)
    }
    fetchData()
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {isLoading?<RiseLoader />:
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
            All Short URLs
          </h2>
          <div className="space-y-4">
            {fetchedData &&
              fetchedData.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                >
                  <p className="font-semibold text-lg text-gray-800">
                    {item.shortID}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.visitHistory.length} visits
                  </p>
                </div>
              ))}
              <Link to='/'>
              <button className="text-center rounded-2xl bg-amber-400 text-white w-full p-2 cursor-pointer hover:bg-amber-800 text-xl transition-all duration-500">Add another Link</button>
              </Link>
          </div>
        </div>
      </div>
      }      
    </div>
  );
};

export default AllShortUrls;
