import { IsArray, ArrayMinSize, IsNotEmpty, IsString, ValidateNested, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { USER_STATUSES } from '../../constants'; 

export class UpdateUsersStatusesDto {
  @IsArray({ message: 'Updates must be an array' })
  @ArrayMinSize(1, { message: 'At least one update is required' })
  @ValidateNested({ each: true }) // Add this line to validate nested objects
  @Type(() => UpdateStatus)
  updates: UpdateStatus[];
}

class UpdateStatus {
  @IsNotEmpty({ message: 'User ID is required' })
  @IsString({ message: 'User ID must be a string' })
  userId: string;

  @IsNotEmpty({ message: 'Status is required' })
  @IsString({ message: 'Status must be a string' })
  @IsIn([USER_STATUSES.PENDING, USER_STATUSES.ACTIVE, USER_STATUSES.BLOCKED], {
    message: 'Invalid user status',
  })
  status: 'pending' | 'active' | 'blocked';
}