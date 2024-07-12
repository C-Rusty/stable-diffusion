import { createSlice } from "@reduxjs/toolkit";
import { CreditsAmount } from "../../types/typesCommon";

const initialState: CreditsAmount = {
    balance: `No-data`
};

export const CreditsReducer = createSlice({
    name: `creditsAmount`,
    initialState,
    reducers: {
        setCreditsAmount: (state, action) => {
            state.balance = action.payload.balance;
        }
    }
});

export const { setCreditsAmount } = CreditsReducer.actions;

export default CreditsReducer.reducer;