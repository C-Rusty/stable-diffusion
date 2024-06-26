import { createSlice } from "@reduxjs/toolkit";
import { ModalProps } from "../../types/typesCommon";

const initialState: ModalProps = {
    headline: ``,
    text: ``,
    isModalOpen: false,
    event: undefined
};

export const ModalContentReducer = createSlice({
    name: `modalContent`,
    initialState,
    reducers: {
        setModalContent: (state, action) => {
            state.headline = action.payload.headline;
            state.text = action.payload.text;
            state.isModalOpen = action.payload.isModalOpen;
            state.event = action.payload.event;
        }
    }
});

export const { setModalContent } = ModalContentReducer.actions;

export default ModalContentReducer.reducer;