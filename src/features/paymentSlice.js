import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance : 0,
    transactions : [
        {
            transaction_id : `#TN1`,
            transaction_date : `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`,
            transaction_time : `${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`,
            transaction_amount : 6900,
            transaction_category : `Deposit / Food / Travel / Clothing`,
            transaction_deposit : true,
            transaction_message : '',
            transaction_mode : 'CASH / CARD / UPI / Net Banking'
        },
        {
            transaction_id : `#TN2`,
            transaction_date : `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`,
            transaction_time : `${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`,
            transaction_amount : 69.69,
            transaction_category : `Food / Travel / Clothing`,
            transaction_deposit : false,
            transaction_message : '',
            transaction_mode : 'CASH / CARD / UPI / Net Banking'
        },
    ]
}

export const paymentSlice = createSlice({
    name : 'payment',
    initialState,
    reducers : {
        add_payment : (state,action) => {
            console.log(action.payload);
            const payment = {
                transaction_id : `#TN`,
                transaction_date : `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()}`,
                transaction_time : `${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()}`,
                transaction_amount : parseFloat(action.payload.transaction_amount),
                transaction_category : action.payload.transaction_category,
                transaction_mode : action.payload.transaction_mode,
            }
            state.transactions.push(payment);
            if(payment.transaction_category === 'Wallet-Deposit' || payment.transaction_category === 'Refund'){
                state.balance = (state.balance+payment.transaction_amount)
            }
            else  state.balance = (state.balance - payment.transaction_amount)
            console.log(state.balance);
        },
        remove_payment : (state, action) => {
            state.transactions.forEach((payment) => {
                if(payment.transaction_id === action.payload.transaction_id){
                    if(payment.transaction_deposit ) state.balance -= payment.transaction_amount;
                    else state.balance += payment.transaction_amount;
                }
            })
            state.transactions = state.transactions.filter((payment) => (payment.transaction_id !== action.payload.transaction_id))
        }
    }
})

export const {add_payment, remove_payment} = paymentSlice.actions;
export default paymentSlice.reducer