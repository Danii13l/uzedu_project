import { configureStore } from '@reduxjs/toolkit';

import blackWhiteReducer from './slices/blackWhite';
import bigFontReducer from './slices/bigFont';
import sideBarMenuReducer from './slices/sidebarMenu';

export const store = configureStore({
    reducer: {
        blackWhite: blackWhiteReducer,
        bigFont: bigFontReducer,
        sidebarMenu: sideBarMenuReducer
    },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch