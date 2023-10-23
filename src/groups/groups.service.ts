// group.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from './group.model';
import { User } from '../users/users.model';
import { ERROR_MESSAGES, GROUP_STATUSES } from '../constants';
import { RemoveUserFromGroupDto } from './dto/remove-userFromGroup.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  /**
   * Removes a user from a group.
   * - Checks if the group and user exist.
   * - Removes the user from the group's users array.
   * - Checks if the group has no more members and updates the group status accordingly.
   * @param groupId - ID of the group from which the user will be removed.
   * @param userId - ID of the user to be removed from the group.
   */
  async removeUserFromGroup(dto: RemoveUserFromGroupDto): Promise<void> {
    const { groupId, userId } = dto;
    try {
      const group = await this.groupModel.findById(groupId);
      if (!group) {
        throw new Error(ERROR_MESSAGES.GROUP_NOT_FOUND(groupId));
      }
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new Error(ERROR_MESSAGES.USER_NOT_FOUND(userId));
      }

      await this.groupModel.findByIdAndUpdate(groupId, { $pull: { users: userId } });

      // Check if the group has no more members
      const groupMembersCount = await this.userModel.countDocuments({ groupId });

      const groupStatus = groupMembersCount === 0 ? GROUP_STATUSES.EMPTY : GROUP_STATUSES.NOT_EMPTY;

      // Update the group status in the database
      await this.groupModel.findByIdAndUpdate(groupId, { status: groupStatus });

    } catch (error) {
      console.error(`${ERROR_MESSAGES.ERROR_REMOVING_USER_FROM_GROUP}: ${error.message}`);
      throw error;
    }
  }
}
