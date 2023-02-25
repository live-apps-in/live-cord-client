import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
} from "react-redux";
import { reducer } from "./reducer";

export const store = configureStore({
  reducer,
  devTools: process.env.REACT_APP_REDUX_DEV_TOOLS === "true",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), // to ignore "A non-serializable value was detected in an action" error
});

export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();

export * from "./actions";
export * from "./reducer";
