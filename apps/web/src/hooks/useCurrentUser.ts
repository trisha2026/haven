import type { UserRole } from '../types/navigation.ts';
import type { AppUser } from '../types/user.ts';
import { MOCK_USERS } from '../mock/users.ts';

/**
 * Returns the user for the current workspace.
 *
 * TEMPORARY: resolves a mock user from the role of the active layout.
 * This is the single integration seam to replace with the Firebase-authenticated
 * user (and server-verified role) when authentication is implemented.
 */
export function useCurrentUser(role: UserRole): AppUser {
  return MOCK_USERS[role];
}
