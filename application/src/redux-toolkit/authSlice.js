import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_IP } from "../private";

const INITIAL_STATE = {
    email: '',
    token: ''
}

const doLogin = async({email, password}) => {
    try {
        const loginResponse = await fetch(`${SERVER_IP}/api/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then (res => res.json());
        
        if(loginResponse.success){
            return {
                email: loginResponse.email,
                token: loginResponse.token
            };
        } else {
            return { ...INITIAL_STATE };
        } 
    } catch(error){
        console.error(error);
    }
}

export const login = createAsyncThunk('login/loginStatus', doLogin);

const authSlice = createSlice({
    name: 'login',
    initialState: INITIAL_STATE,
    reducers: {
        logout: (state, action)=>{
            state = { ...INITIAL_STATE }
        },
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action)=>{
            if(action.payload) {
                state.email = action.payload.email;
                state.token = action.payload.token;
            }
        })
    }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer;