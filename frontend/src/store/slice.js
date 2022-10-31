import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            return await axios.post(`/signup`, {
                ...userData
            }
            )
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)
export const loginUser = createAsyncThunk(
    'users/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            return await axios.post(`/login`, {
                ...userData
            }
            )
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        login: { email: '' }
    },
    extraReducers: {
        [registerUser.fulfilled]: (state, action) => {
            state.login.email = action.payload.data.email
        },
    },
})

export const { } = usersSlice.actions

export default usersSlice
