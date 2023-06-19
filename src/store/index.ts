import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth";
import { reportSlice } from "./features/report";
import { registrationSlice } from "./features/registration";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    reports: reportSlice.reducer,
    registrations: registrationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
