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
        verify: builder.query({
            query: token => `${USERS_URL}/verify/${token}`,
        }),
    })
})

export const {useSignupMutation, useVerifyQuery} = userApiSlice