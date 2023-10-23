// groups.controller.ts

import { Controller, Param, Delete } from '@nestjs/common';
import { GroupService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupService: GroupService) {}

  @Delete('group/:groupId/user/:userId')
  async removeUserFromGroup(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return this.groupService.removeUserFromGroup(groupId, userId);
  }
}
