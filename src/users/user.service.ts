import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async findAllWithPagination(limit: number, offset: number): Promise<User[]> {
    return this.userModel.find().skip(offset).limit(limit).exec();
  }

  async findByName(name: string): Promise<User[]> {
    return this.userModel.find({ name }).exec();
  }

  async findByEmail(email: string): Promise<User[]> {
    return this.userModel.find({ email }).exec();
  }
}
