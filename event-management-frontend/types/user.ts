import { ApiResponse } from "./api";

export enum UserRole {
	Attendee = "attendee",
	Manager = "manager",
}

// Role information with display names and descriptions
export interface RoleInfo {
  value: UserRole;
  displayName: string;
  description: string;
}

// Role details mapping
export const RoleDetails: Record<UserRole, RoleInfo> = {
  [UserRole.Attendee]: {
    value: UserRole.Attendee,
    displayName: "Attendee",
    description: "Book tickets and attend events"
  },
  [UserRole.Manager]: {
    value: UserRole.Manager,
    displayName: "Manager",
    description: "Create and manage events"
  }
};

// Similar to backend's RoleOptions function
export function getRoleOptions(): string[] {
  return [UserRole.Attendee, UserRole.Manager];
}

// Get all role details as an array
export function getRoleDetails(): RoleInfo[] {
  return Object.values(RoleDetails);
}

export type AuthResponse = ApiResponse<{ token: string; user: User; availableRoles: string[] }>;

export type User = {
  id: number;
	email: string;
  role: UserRole;
	createdAt: string;
	updatedAt: string;
}

export type AuthCredentials = {
  email: string;
  password: string;
  role?: UserRole;
}
