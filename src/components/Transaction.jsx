import React from 'react'
import myTransactions from '../appwrite/transactions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth';
import { updateBalance } from '../features/authSlice';

function Transaction({payment}) {

  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const handleRemoveTransaction = async (e) => {
    e.preventDefault();
    let wallet_balance = 0;
    if(payment.transaction_category === 'Wallet-Deposit' || payment.transaction_category === 'Refund'){
      wallet_balance = (parseFloat(user.name) - payment.transaction_amount).toFixed(2);
    }
    else wallet_balance =(parseFloat(user.name) + payment.transaction_amount).toFixed(2);

    const removeStatus = await myTransactions.removeTransaction(payment.transaction_id);
    if(removeStatus) {
      dispatch(updateBalance(String(wallet_balance)));
      const updated = await authService.updateBalance(String(wallet_balance));
      if(!updated){
          setError('Cannot Update wallet_balance but your Transaction is completed Successfully');
          return;
      }
      navigate('/transactions');
    }
  }
  
  return (
    <div className="flex flex-wrap items-center gap-4 py-6 truncate">
        <dl className="w-1/2 sm:w-1/6 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
            <a href="#" className="hover:underline">{payment.transaction_id}</a>
        </dd>
        </dl>

        <dl className="w-1/2 sm:w-1/6 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Date:</dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{payment.transaction_date}</dd>
        </dl>

        <dl className="w-1/2 sm:w-1/6 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Time:</dt>
        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{payment.transaction_time}</dd>
        </dl>

        <dl className="w-1/2 sm:w-1/6 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Amount:</dt>
        <dd className={`mt-1.5 text-base font-semibold text-gray-900 
          ${payment.transaction_category === 'Wallet-Deposit' || payment.transaction_category === 'Refund' ? 'text-green-500' : 'dark:text-red-500'}`}>
          { 
            (payment.transaction_category === 'Wallet-Deposit' || payment.transaction_category === 'Refund') 
            ? `+ ${payment.transaction_amount}` 
            : `- ${payment.transaction_amount}` 
          }
        </dd>
        </dl>

        <dl className="w-1/2 sm:w-1/6 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Transaction Category:</dt>
        <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
            </svg>
            {payment.transaction_category}
        </dd>
        </dl>
        <dl className="w-1/2 sm:w-1/6 lg:w-auto lg:flex-1">
        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Transaction Mode:</dt>
        <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
            <svg className="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
            </svg>
            {payment.transaction_mode}
        </dd>
        </dl>

        <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
            <a href="#" className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clipRule="evenodd"/>
                </svg>
            </a>

            <button 
            onClick={handleRemoveTransaction}
            type="button" className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">X</button>
        </div>
    </div>
  )
}

export default Transaction