import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

const initialState: { bAndw: boolean } = {
    bAndw: false,
};

export const blackWhiteSlice = createSlice({
    name: 'blackWhiteSlice',
    initialState,
    reducers: {
        setBAndW: (state, action: PayloadAction<boolean>) => {
            state.bAndw = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const {setBAndW} = blackWhiteSlice.actions;

export default blackWhiteSlice.reducer;