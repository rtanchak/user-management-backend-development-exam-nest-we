import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

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
}
