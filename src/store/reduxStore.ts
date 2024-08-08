import { configureStore } from "@reduxjs/toolkit";
import ModalContentReducer from "./reduxReducers/modalReducer";
import CreditsReducer from "./reduxReducers/creditsReducer";
import isLoadingReducer from "./reduxReducers/isLoadingReducer";

const reduxStore = configureStore({
    reducer: {
        modalContent: ModalContentReducer,
        creditsAmount: CreditsReducer,
        isLoading: isLoadingReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export default reduxStore;