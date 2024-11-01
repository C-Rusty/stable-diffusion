import { configureStore } from "@reduxjs/toolkit";
import ModalContentReducer from "./reduxReducers/modalReducer";
import CreditsReducer from "./reduxReducers/creditsReducer";
import commonsReducer from "./reduxReducers/commonsReducer";
import switcherReducer from "./reduxReducers/switcherReducer";
import serviceReducer from "./reduxReducers/serviceReducer";

const reduxStore = configureStore({
    reducer: {
        modalContent: ModalContentReducer,
        creditsAmount: CreditsReducer,
        commonStates: commonsReducer,
        switchers: switcherReducer,
        service: serviceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export default reduxStore;