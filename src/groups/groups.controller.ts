import { Controller, Param, Delete } from '@nestjs/common';
import { GroupService } from './groups.service';
import { RemoveUserFromGroupDto } from './dto/remove-userFromGroup.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupService: GroupService) {}

  @Delete('group/:groupId/user/:userId')
  async removeUserFromGroup(@Param() params: RemoveUserFromGroupDto): Promise<void> {
    return this.groupService.removeUserFromGroup(params);
  }
}
