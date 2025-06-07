import { AuthCredentials, AuthResponse, UserRole } from "@/types/user";
import { Api } from "./api";

async function login(email: string, password: string): Promise<AuthResponse> {
  return Api.post("/auth/login", { email, password });
}

async function register(email: string, password: string, role?: UserRole): Promise<AuthResponse> {
  const payload: AuthCredentials = { email, password };
  
  // Only include role if it's provided
  if (role) {
    payload.role = role;
  }
  
  return Api.post("/auth/register", payload);
}

const userService = {
  login,
  register,
};

export { userService };
