import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { userLogout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SmallLoader from './SmallLoader';

function Logout() {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    await authService.userLogOut();
    dispatch(userLogout());
    setLoading(false);
    navigate('/');
  }
  
  return (
    <div className="cursor-pointer flex mt-4 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button 
        onClick={handleLogout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <SmallLoader/> : `Logout`}</button>

        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
    </div>
  )
}

export default Logout