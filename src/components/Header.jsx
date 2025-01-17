import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Logout from './Logout';
import { useSelector } from 'react-redux';

function Header() {

  const authStatus = useSelector((state) => state.auth.authStatus);
  const navigate = useNavigate();
  
  const navItems = [
    {
        name : 'Home',
        slug : '/',
        active : true
    },
    {
        name : 'Add Transaction',
        slug : '/add',
        active : authStatus
    },
    {
        name : 'Transactions',
        slug : '/transactions',
        active : authStatus
    },
    {
        name : 'Login',
        slug : '/login',
        active : !authStatus
    },
    {
        name : 'Signup',
        slug : '/signup',
        active : !authStatus
    },
    {
        name : 'Contact',
        slug : '/contact',
        active : true
    },
  ]

  return (
    <div className=''>
        <nav className="bg-white dark:bg-gray-900  w-full border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                
                {/* <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button> */}
            
                <div className="text-center w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {
                        navItems.map((navItem) => (
                            navItem.active ? (
                                <li key={navItem.name}>
                                    <button
                                    onClick={() => navigate(navItem.slug)}
                                    className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                    >{navItem.name}</button>
                                </li>
                            ) : null
                        ))
                    }
                    </ul>
                </div>

                {
                    authStatus && (
                        <Logout/>
                    )
                }
            </div>
        </nav>
    </div>

  )
}

export default Header