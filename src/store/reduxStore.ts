import { configureStore } from "@reduxjs/toolkit";
import ModalContentReducer from "./reduxReducers/modalReducer";

const reduxStore = configureStore({
    reducer: {
        modalContent: ModalContentReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export default reduxStore;