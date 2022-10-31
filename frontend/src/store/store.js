import { configureStore } from '@reduxjs/toolkit'
import { usersSlice } from './slice'

export const store = configureStore({
    reducer: usersSlice.reducer
})
