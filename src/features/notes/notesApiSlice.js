import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { loadPlugin } from 'immer/dist/internal';
import { apiSlice } from '../../app/api/apiSlice';

const notesAdapter = createEntityAdapter({})

const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getnotes: builder.query({
            query: () => '/notes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const lodadedNotes = responseData.map(note => {
                    note.id = note._id
                    return note
                });
                return notesAdapter.setAll(initialState, lodadednotes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'note', id }))
                    ]
                } else return [{ type: 'note', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    noteGetnotesQuery,
} = notesApiSlice

// returns the query result object
export const selectnotesResult = notesApiSlice.endpoints.getnotes.select()

// creates memoized selector
const selectnotesData = createSelector(
    selectnotesResult,
    notesResult => notesResult.data // normalized state object with ids & entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllnotes,
    selectById: selectnoteById,
    selectIds: selectnoteIds
    // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors(state => selectnotesData(state) ?? initialState)
