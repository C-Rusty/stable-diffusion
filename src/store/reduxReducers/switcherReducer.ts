import { createSlice } from "@reduxjs/toolkit";
import { switchers } from "../../types/reducers";

const initialState: switchers = {
    isOptionsShown: false,
    isSavingHistoryEnabled: true,
    isImgToImgModeEnabled: false
};

export const switcherReducer = createSlice({
    name: `switchers`,
    initialState,
    reducers: {
        setIsOptionsShown: (state, action) => {
            state.isOptionsShown = action.payload;
        },
        setIsSavingHistoryEnabled: (state, action) => {
            state.isSavingHistoryEnabled = action.payload;
        },
        setIsImgToImgModeEnabled: (state, action) => {
            state.isImgToImgModeEnabled = action.payload;
        }
    }
});

export const { setIsOptionsShown, setIsSavingHistoryEnabled, setIsImgToImgModeEnabled } = switcherReducer.actions;

export default switcherReducer.reducer;