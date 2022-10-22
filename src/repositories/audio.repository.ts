import type { IAudio } from '@types';
import type { Model } from 'mongoose';

export class AudioRepository {
  private _dbClient: Model<IAudio>;

  constructor(audioRepository: Model<IAudio>) {
    this._dbClient = audioRepository;
  }

  async create(body: IAudio): Promise<IAudio> {
    return await this._dbClient.create(body);
  }
}
