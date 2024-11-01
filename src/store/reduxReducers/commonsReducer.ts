import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    isLoading: boolean,
    isButtonDisabled: boolean
} = {
    isLoading: false,
    isButtonDisabled: true
};

export const commonsReducer = createSlice({
    name: `isLoading`,
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setIsButtonDisabled: (state, action) => {
            state.isButtonDisabled = action.payload;
        }
    }
});

export const { setIsLoading } = commonsReducer.actions;

export default commonsReducer.reducer;