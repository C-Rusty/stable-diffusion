import { configureStore } from "@reduxjs/toolkit";
import ModalContentReducer from "./reduxReducers/modalReducer";
import CreditsReducer from "./reduxReducers/creditsReducer";

const reduxStore = configureStore({
    reducer: {
        modalContent: ModalContentReducer,
        creditsAmount: CreditsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export default reduxStore;