import { USERS_URL } from '@/utils/constants';
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signup: builder.mutation({
            query: user => ({
                url: `${USERS_URL}/signup`,
                method: 'POST',
                body: user
            })
        }),
        verify: builder.mutation({
            query: token => ({
                url: `${USERS_URL}/verify/${token}`,
                method: 'POST'
            })
        }),
        userProfileDetials: builder.query({
            query: () => ({url: `${USERS_URL}/profile`})
        }),
        login: builder.mutation({
            query: user => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: user
            })
        }),
    })
})

export const {useSignupMutation, useVerifyMutation, useUserProfileDetialsQuery, useLoginMutation} = userApiSlice