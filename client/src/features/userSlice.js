import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  // loading: true,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      // state.loading = false
      console.log('action', action);
      state.isAuthenticated = true;
      state.user = action.payload.data;
    },
    clearUserCredentials: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setUserCredentials, clearUserCredentials } = userSlice.actions;

export default userSlice.reducer;

export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUser = (state) => state.user.user;