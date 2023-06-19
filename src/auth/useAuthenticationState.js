import { ACCESS_TOKEN_NAME } from "@/constants/server";
import { AuthState } from "@/constants/state";

export default function useAuthenticationState() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);

  if (!accessToken) return AuthState.UNAUTHORIZED;

  return AuthState.AUTHORIZED;
}
