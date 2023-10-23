export const ERROR_MESSAGES = {
    GROUP_NOT_FOUND: (groupId: string) => `Group with ID ${groupId} not found.`,
    USER_NOT_FOUND: (userId: string) => `User with ID ${userId} not found.`,
    ERROR_REMOVING_USER_FROM_GROUP: 'Error removing user from group',
  };
  
  export const GROUP_STATUSES = {
    EMPTY: 'empty',
    NOT_EMPTY: 'notEmpty',
  };