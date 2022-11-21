import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: { bigFont: boolean } = {
    bigFont: false,
};

export const bigFont = createSlice({
    name: 'blackWhiteSlice',
    initialState,
    reducers: {
        setBigFont: (state, action: PayloadAction<boolean>) => {
            state.bigFont = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setBigFont } = bigFont.actions;

export default bigFont.reducer;