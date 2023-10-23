
// GENERAL
export const QUERY_PARAM_LIMIT = 'limit';
export const QUERY_PARAM_OFFSET = 'offset';
export const QUERY_PARAM_NAME = 'name';
export const QUERY_PARAM_EMAIL = 'email';
export const ERROR_MESSAGES = {
    GROUP_NOT_FOUND: (groupId: string) => `Group with ID ${groupId} not found.`,
    USER_NOT_FOUND: (userId: string) => `User with ID ${userId} not found.`,
    UPDATE_USER_FAILED: (userId: string) => `Failed to update user with ID ${userId}`,
    ERROR_STARTING_SESSION: () => 'Error starting database session',
    ERROR_UPDATING_USERS: () => 'Error updating users',
    ERROR_REMOVING_USER_FROM_GROUP: () => 'Error removing user from group',
};

// USER specific
export const USER_STATUSES = {
    PENDING: 'pending',
    ACTIVE: 'active',
    BLOCKED: 'blocked',
  };

// GROUPS specific
export const GROUP_STATUSES = {
    EMPTY: 'empty',
    NOT_EMPTY: 'notEmpty',
  };

  