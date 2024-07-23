import { USERS_URL } from '@/utils/constants';
import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: `${USERS_URL}/signup`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Auth'],
    }),
    verify: builder.mutation({
      query: (token) => ({
        url: `${USERS_URL}/verify/${token}`,
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    userProfileDetials: builder.query({
      query: () => ({ url: `${USERS_URL}/profile` }),
      providesTags: ['Auth'],
    }),
    login: builder.mutation({
      query: (user) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const {
  useSignupMutation,
  useVerifyMutation,
  useUserProfileDetialsQuery,
  useLoginMutation,
  useLogoutMutation,
} = userApiSlice;
