import { login } from "@/api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data: { username: string; password: string }) => {
    try {
      const res = await login(data.username, data.password);
      return res.data;
    } catch (e) {
      throw e;
    }
  }
);
