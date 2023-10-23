import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { UpdateUsersStatusesDto } from './dto/update-usersStatuses.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}
  
  /**
   * Find all users with pagination.
   *
   * @param {number} limit - The maximum number of users to retrieve.
   * @param {number} offset - The number of users to skip before starting to collect the result set.
   * @returns {Promise<User[]>} A promise that resolves to an array of users.
   */
  async findAllWithPagination(limit: number, offset: number): Promise<User[]> {
    return this.userModel.find().skip(offset).limit(limit).exec();
  }

  /**
   * Find  users with a particular name.
   *
   * @param name string field without any numbers
   * @returns An array of users based on reqeusted email.
   */
  async findByName(name: string): Promise<User[]> {
    return this.userModel.find({ name }).exec();
  }

  /**
   * Find  users with a particular email.
   *
   * @param email field that contains @ symbol and should be a valid email address.
   * @returns An array of users based on reqeusted email.
   */
  async findByEmail(email: string): Promise<User[]> {
    return this.userModel.find({ email }).exec();
  }

  /**
   * Update the statuses of multiple users with a guarantee of atomicity.
   *
   * @param updateUsersStatusesDto The DTO containing user IDs and new statuses.
   * @returns An array of updated users if all updates succeed.
   * @throws Error if any update fails.
   */
  async updateUsersStatuses(updateUsersStatusesDto: UpdateUsersStatusesDto): Promise<User[]> {
    const { updates } = updateUsersStatusesDto;

    const inMemoryUpdates: User[] = updates.map(({ userId, status }) => {
      return { _id: userId, status: status } as User;
    });

    try {
      // Starting a database transaction
      const session = await this.userModel.db.startSession();
      session.startTransaction();

      try {
        const updatedUsers = await Promise.all(
          inMemoryUpdates.map(async (updatedUser) => {
            const { _id, status } = updatedUser;

            const filter = { _id };
            const update = { status };
            const options = { new: true }; // Return the updated document

            // Update the user in the database within the transaction
            const result = await this.userModel.findOneAndUpdate(filter, update, { ...options, session });

            // If the update in the database fails, throw an error to trigger a rollback
            if (!result) {
              throw new Error(`Failed to update user with ID ${_id}`);
            }

            return result;
          }),
        );
        await session.commitTransaction();
        session.endSession();

        return updatedUsers;
      } catch (error) {
        // If an error occurs aborting the transaction
        await session.abortTransaction();
        session.endSession();
        console.error(`[updateUsersStatuses] error updating users: ${error.message}`);
        throw error;
      }
    } catch (error) {
      console.error(`[updateUsersStatuses] error starting database session: ${error.message}`);
      // Rethrow the error
      throw error;
    }
  }
}
