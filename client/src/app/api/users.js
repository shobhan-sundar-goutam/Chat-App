import { USERS_URL } from '@/utils/constants';
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signup: builder.mutation({
            query: user => ({
                url: `${USERS_URL}/signup`,
                method: 'POST',
                body: {...user}
            })
        })
    })
})

export const {useSignupMutation} = userApiSlice