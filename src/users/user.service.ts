import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { UpdateUsersStatusesDto } from './dto/update-users-statuses.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async findAllWithPagination(limit: number, offset: number): Promise<User[]> {
    return this.userModel.find().skip(offset).limit(limit).exec();
  }

  async findByName(name: string): Promise<User[]> {
    return this.userModel.find({ name }).exec();
  }

  async findByEmail(email: string): Promise<User[]> {
    return this.userModel.find({ email }).exec();
  }

  async updateUsersStatuses(updateUsersStatusesDto: UpdateUsersStatusesDto): Promise<User[]> {
    const { updates } = updateUsersStatusesDto;

    const updatedUsersPromises = updates.map(async ({ userId, newStatus }) => {
      try {
        const filter = { _id: userId };
        const update = { status: newStatus };
        const options = { new: true };

        const updatedUser = await this.userModel.findOneAndUpdate(filter, update, options);

        return updatedUser;
      } catch (error) {
        console.error(`Error updating status  IDÖ ${userId}: ${error.message}`);
        return null;
      }
    });

    const updatedUsers = await Promise.all(updatedUsersPromises);
    // Users that have just been updated
    const validUpdates = updatedUsers.filter((user) => user !== null);

    return validUpdates;
  }
}
