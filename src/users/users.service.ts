import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { GetUserDto } from './dto/get-user-dto.model';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.userModel.findOne({ username }).lean().exec();
  }

  async findOneById(id: string): Promise<User | undefined> {
    return await this.userModel.findOne({ id }).lean().exec();
  }

  async removeRefreshToken(id: string): Promise<any> {
    return await this.userModel
      .updateOne({ id }, { currentHashedRefreshToken: null })
      .lean()
      .exec();
  }

  async setCurrentRefreshToken(
    refreshToken: string,
    userId: string,
  ): Promise<User | undefined> {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    return await this.userModel
      .findByIdAndUpdate(userId, { currentHashedRefreshToken })
      .lean()
      .exec();
  }
}
