export class UpdateUsersStatusesDto {
  updates: Array<{ userId: string; status: 'pending' | 'active' | 'blocked' }>;
}