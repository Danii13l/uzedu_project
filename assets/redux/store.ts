import {configureStore} from '@reduxjs/toolkit'

import blackWhiteReducer from './slices/blackWhite'

export const store = configureStore({
    reducer: {
        blackWhite: blackWhiteReducer
    },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch