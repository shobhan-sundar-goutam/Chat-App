import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isUserLoggedIn: false,
}

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  },
})

export const {  } = authSlice.actions

export default authSlice.reducer