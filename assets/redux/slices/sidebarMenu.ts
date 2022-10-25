import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

const initialState: { isOpen: boolean } = {
    isOpen: false,
};

export const sidebarMenuSlice = createSlice({
    name: 'sidebarMenu',
    initialState,
    reducers: {
        setIsOpenMenu: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const {setIsOpenMenu} = sidebarMenuSlice.actions;

export default sidebarMenuSlice.reducer;