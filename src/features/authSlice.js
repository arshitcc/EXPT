import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authStatus : false,
    user : null,
}
 
const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        userLogin : (state, action) => {
            state.authStatus = true ;
            state.user = action.payload;
        },

        userLogout : (state) => {
            state.authStatus = false;
            state.user = null;
        },
        updateBalance : (state,action) => {
            state.user.name = action.payload; 
        }
    }
})

export const {userLogin, userLogout, updateBalance} = authSlice.actions;
export default authSlice.reducer
