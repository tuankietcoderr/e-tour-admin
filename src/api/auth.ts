import { AUTH_API_URL } from "@/constants/server";
import axios from "axios";

export const login = async (username: string, password: string) => {
  try {
    const res = await axios.post(AUTH_API_URL, {
      username,
      password,
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};
