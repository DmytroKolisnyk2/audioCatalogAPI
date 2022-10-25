import type { IUser, IAudio } from '@types';
import type { Model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export class UserRepository {
  private _dbClient: Model<IUser>;

  constructor(user: Model<IUser>) {
    this._dbClient = user;
  }

  async getById(userId: Types.ObjectId | string): Promise<IUser> {
    return await this._dbClient.findById(userId, { password: 0 });
  }

  async getByUsername(username: string): Promise<IUser> {
    return await this._dbClient.findOne({ username });
  }

  async hashPassword(rawPassword: string): Promise<string> {
    return await bcrypt.hash(rawPassword, 12);
  }

  async verifyPassword(
    rawPassword: string,
    userPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(rawPassword, userPassword);
  }

  async createUser(body: IUser, password: string): Promise<IUser> {
    return await this._dbClient.create({ ...body, password });
  }

  async getUserAudios(userId: Types.ObjectId | string): Promise<IAudio[]> {
    return await this._dbClient
      .findById(userId, { createdAudios: 1, _id: 0 })
      .populate({ path: 'createdAudios' });
  }

  async getUserLikedAudios(userId: Types.ObjectId | string): Promise<IAudio[]> {
    return await this._dbClient
      .findById(userId, { likedAudios: 1, _id: 0 })
      .populate({ path: 'likedAudios' });
  }

  async getUserHistoryAudios(
    userId: Types.ObjectId | string,
  ): Promise<IAudio[]> {
    return await this._dbClient
      .findById(userId, { history: 1, _id: 0 })
      .populate({ path: 'history' });
  }

  async getUserFollowing(userId: Types.ObjectId | string): Promise<IUser[]> {
    return await this._dbClient
      .findById(userId, { following: 1, _id: 0 })
      .populate({ path: 'following' });
  }

  async getUserFollowers(userId: Types.ObjectId | string): Promise<IUser[]> {
    return await this._dbClient
      .findById(userId, { followers: 1, _id: 0 })
      .populate({ path: 'followers' });
  }

  async toggleFollow(
    followingId: string,
    userId: Types.ObjectId,
  ): Promise<IUser> {
    if (!(await this.getById(followingId))) return null;
    const isUserFollowed = await this._dbClient.exists({
      _id: followingId,
      followers: userId,
    });
    let patchedUser;
    if (isUserFollowed) {
      await this._dbClient.findByIdAndUpdate(followingId, {
        $pull: {
          followers: userId,
        },
      });
      patchedUser = await this._dbClient.findByIdAndUpdate(
        userId,
        {
          $pull: {
            following: followingId,
          },
        },
        { new: true },
      );
    }

    if (!isUserFollowed) {
      await this._dbClient.findByIdAndUpdate(followingId, {
        $addToSet: {
          followers: userId,
        },
      });
      patchedUser = await this._dbClient.findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            following: followingId,
          },
        },
        { new: true },
      );
    }

    return patchedUser;
  }
}
