import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import myTransactions from '../appwrite/transactions';
import { nanoid } from '@reduxjs/toolkit';
import authService from '../appwrite/auth';
import { updateBalance } from '../features/authSlice';
import Loader from './Loader';

function NewPayment() {

  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState('');
  const [transaction_message, setMessage] = useState('');
  const [transaction_mode, setTransactionMode] = useState('UPI');
  const [transaction_category, setTransactionCategory] = useState('Food');

  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); 

  const addPayment = async (e) => {

    e.preventDefault();
    setError('');
    setLoading(true);
    const transaction_amount = parseFloat(parseFloat(amount).toFixed(2));
    if(amount.trim() === '' || transaction_amount === 0){
        setLoading(false);
        setError('Enter a Valid Amount');
        return;
    }

    const payment = {
        user_id : user.$id,
        transaction_id : `${nanoid()}`,
        transaction_amount,
        transaction_category,
        transaction_mode,
        transaction_message,
        transaction_date : `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`,
        transaction_time : `${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`,
    }
 
    let wallet_balance = 0.00;
    
    if(payment.transaction_category === 'Wallet-Deposit' || payment.transaction_category === 'Refund'){
        wallet_balance = parseFloat((parseFloat(user.name) + payment.transaction_amount).toFixed(2));
    }
    else wallet_balance =parseFloat((parseFloat(user.name) - payment.transaction_amount).toFixed(2));
   
    const newPayment = await myTransactions.addTransaction({...payment, wallet_balance})
    
    if(newPayment)  {
        dispatch(updateBalance(String(wallet_balance)));
        const updated = await authService.updateBalance(String(wallet_balance));
        if(!updated){
            setError('Cannot Update wallet_balance but your Transaction is completed Successfully');
            setLoading(false);
            return;
        }
        setLoading(false);
        navigate('/transactions');
    }
    else{
        setLoading(false);
        setError('Payment Failed');
        navigate('/add');
    }
  }

  return loading ? 
  <Loader/> : (
    <>
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                {error && <p className="text-red-600 text-center">{error}</p>}
                <form
                onSubmit={addPayment} 
                action="#" className="mx-auto w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div className="col-span-2 sm:col-span-1">

                            <label htmlFor="transaction_message" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Transaction Message (optional) </label>

                            <input 
                            onChange={(e) => setMessage(e.target.value)}
                            type="text" id="transaction_message" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Flight : VNS - TIR"/>

                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="amount" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Amount * </label>

                            <input 
                            onChange={(e) => setAmount(e.target.value)}
                            type="text" id="amount" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="₹ 6900" pattern='^\d+(\.\d+)?$' required />
                        </div>

                        {/* <div className='col-span-2'>
                            <label htmlFor="transaction_type" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select Payment type *</label>

                            <select id="transaction_type" className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                                <option selected>Expense</option>
                                <option value="deposit">Deposit</option>
                            </select>
                        </div> */}

                        <div className='col-span-2'>
                            <label htmlFor="transaction_type" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select Transaction Category *</label>

                            <select 
                            onChange={(e) => setTransactionCategory(e.target.value)}
                            id="transaction_type" className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" required>
                                <option value="Food">Food</option>
                                <option value="Wallet-Deposit">Wallet-Deposit</option>
                                <option value="Travel">Travel</option>
                                <option value="Online Shopping">Online Shopping</option>
                                <option value="Refund">Refund</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div className='col-span-2'>
                            <label htmlFor="transaction_type" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select Transaction Mode *</label>

                            <select 
                            onChange={(e) => setTransactionMode(e.target.value)}
                            id="transaction_type" className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" required>
                                <option value="UPI">UPI</option>
                                <option value="CASH">CASH</option>
                                <option value="DEBIT CARD">DEBIT CARD</option>
                                <option value="CREDIT CARD">CREDIT CARD</option>
                                <option value="NET BANKING">NET BANKING</option>
                            </select>
                        </div>

                        
                    </div>

                    <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Transaction</button>
                </form>
            </div>

            <p className="mt-6 text-center text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
                Payment processed by 
                <a href="#" title="" className="font-medium text-blue-700 underline hover:no-underline dark:text-blue-500">Paddle</a> for 
                <a href="#" title="" className="font-medium text-blue-700 underline hover:no-underline dark:text-blue-500">Flowbite LLC</a>
                - United States Of America
            </p>
            </div>
        </div>
    </section>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js"></script>
    </>
  )
}

export default NewPayment