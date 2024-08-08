import { createSlice } from "@reduxjs/toolkit";

const initialState: {isLoading: boolean} = {
    isLoading: false
};

export const isLoadingReducer = createSlice({
    name: `isLoading`,
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { setIsLoading } = isLoadingReducer.actions;

export default isLoadingReducer.reducer;