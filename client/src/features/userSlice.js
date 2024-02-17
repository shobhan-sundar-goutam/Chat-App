import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
    }
  },
})

export const { createUser } = userSlice.actions

export default userSlice.reducer