import type { TestModel } from '@types';
import type { Model } from 'mongoose';

export class TestRepository {
  private _dbClient: Model<TestModel>;

  constructor(testModel: Model<TestModel>) {
    this._dbClient = testModel;
  }

  async getAll(): Promise<TestModel[]> {
    return await this._dbClient.find();
  }

  async create(message: string): Promise<TestModel> {
    return await this._dbClient.create({ message });
  }
}
