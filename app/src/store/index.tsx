import { configureStore } from "@reduxjs/toolkit";

// import reducers
import CategoryReducer from "./slices/category.slice";

export const AppStore = configureStore({
  reducer: {
    Category: CategoryReducer,
    // add reducers here
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer types from the store itself
export type RootState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;
