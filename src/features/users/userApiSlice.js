import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { loadPlugin } from 'immer/dist/internal';
import { apiSlice } from '../../app/api/apiSlice';

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const lodadedUsers = responseData.map(user => {
                    user.id = user.__id
                    return user
                });
                return usersAdapter.setAll(initialState, lodadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id, 'LIST' }]
            }
        }),
    }),
})