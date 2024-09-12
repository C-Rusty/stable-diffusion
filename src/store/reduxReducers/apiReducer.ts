import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { apiKey: string | null } = { apiKey: null };

export const apiReducer = createSlice({
    name: `api`,
    initialState,
    reducers: {
        setApiKey: (state, action: PayloadAction<string>) => {
            state.apiKey = action.payload;
        },
    },
});

export const { setApiKey } = apiReducer.actions;

export default apiReducer.reducer;