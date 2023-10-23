export class UpdateUsersStatusesDto {
  updates: Array<{ userId: string; newStatus: 'pending' | 'active' | 'blocked' }>;
}