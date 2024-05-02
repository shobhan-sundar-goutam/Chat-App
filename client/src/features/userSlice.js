import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  // loading: true,
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      // state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
    }
  },
})

export const { setUserCredentials } = userSlice.actions

export default userSlice.reducer

export const selectIsAuthenticated = (state) => state.user.isAuthenticated