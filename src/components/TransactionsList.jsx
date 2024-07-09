import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Transaction from './Transaction';
import myTransactions from '../appwrite/transactions';
import Profile from './Profile';
import { nanoid } from '@reduxjs/toolkit';
import Loader from './Loader';


function TransactionsList() {

  const user = useSelector((state) => state.auth.user);
  const [transactions, setTransactions] = useState([]);

  const [loading,setLoading] = useState(true);
  myTransactions.viewTransactions(user.$id).then((payments) => {
    if(payments) {
        setTransactions(payments.documents);
        setLoading(false);
    }
  })

  return loading ? 
  <Loader/> : (
    <>
        <Profile />
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-2xl px-4 2xl:px-0">
                <div className="mx-auto max-w-screen-xl">
                    <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">My Transactions</h2>
                        {/* Features : Filter Features */}
                    </div>

                    <div className="mt-6 flow-root sm:mt-8">
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                            {/* Add BG of categories according to transaction-category */}
                            {
                                transactions.map((payment) => (
                                    <div 
                                    key={nanoid()}
                                    className='w-full'>
                                        <Transaction payment={payment}/>
                                    </div>
                                ))
                            }

                        </div>
                    </div>

                    {/* <nav className="mt-6 flex items-center justify-center sm:mt-8" aria-label="Page navigation example">
                        <ul className="flex h-8 items-center -space-x-px text-sm">
                        <li>
                            <a href="#" className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Previous</span>
                            <svg className="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7" />
                            </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" className="z-10 flex h-8 items-center justify-center border border-blue-300 bg-blue-50 px-3 leading-tight text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                        </li>
                        <li>
                            <a href="#" className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                        </li>
                        <li>
                            <a href="#" className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg className="h-4 w-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7" />
                            </svg>
                            </a>
                        </li>
                        </ul>
                    </nav> */}
                </div>
            </div>
        </section>
    </>
    
  )
}

export default TransactionsList