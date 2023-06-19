import { AuthState, State } from "@/constants/state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginThunk } from "./thunk";
import { ACCESS_TOKEN_NAME } from "@/constants/server";

export interface AdminAuthState {
  token?: string;
  status?: AuthState;
  loading: boolean;
}

const initialState: AdminAuthState = {
  token: "",
  status: AuthState.UNAUTHORIZED,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      const token = localStorage.getItem(ACCESS_TOKEN_NAME);
      state.token = token;
      state.status = AuthState.AUTHORIZED;
    },
    logout: (state) => {
      state.token = undefined;
      state.status = AuthState.UNAUTHORIZED;
      localStorage.removeItem(ACCESS_TOKEN_NAME);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.status = AuthState.AUTHORIZED;
        state.token = action.payload.tokens.accessToken;
        localStorage.setItem(
          ACCESS_TOKEN_NAME,
          action.payload.tokens.accessToken
        );
      })
      .addCase(loginThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;

export const { logout, setAuth } = authSlice.actions;
