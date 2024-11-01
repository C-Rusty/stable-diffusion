import { createSlice } from "@reduxjs/toolkit";
import { service } from "../../types/reducers";

const initialState: service = {
    currentService: `Image Generator`
}

export const serviceReducer = createSlice({
    name: `service`,
    initialState,
    reducers: {
        setService: (state, action) => {
            state.currentService = action.payload;
        }
    }
});

export const { setService } = serviceReducer.actions;

export default serviceReducer.reducer;