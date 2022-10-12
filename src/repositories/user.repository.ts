import type { IUser } from '@types';
import type { Model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export class UserRepository {
  private _dbClient: Model<IUser>;

  constructor(user: Model<IUser>) {
    this._dbClient = user;
  }

  async getById(userId: Types.ObjectId): Promise<IUser> {
    return await this._dbClient.findById(userId);
  }

  async getByUsername(username: string): Promise<IUser> {
    return await this._dbClient.findOne({ username });
  }

  async hashPassword(rawPassword: string): Promise<string> {
    return await bcrypt.hash(rawPassword, 12);
  }

  async verifyPassword(rawPassword: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(rawPassword, userPassword);
  }

  async createUser(body: IUser, password: string): Promise<IUser> {
    return await this._dbClient.create({ ...body, password });
  }
}
