import type { IAudio, IUser } from '@types';
import type { Model, Types } from 'mongoose';

export class AudioRepository {
  private _dbAudio: Model<IAudio>;

  private _dbUsers: Model<IUser>;

  constructor(audioRepository: Model<IAudio>, userRepository: Model<IUser>) {
    this._dbAudio = audioRepository;
    this._dbUsers = userRepository;
  }

  async create(body: IAudio): Promise<IAudio> {
    const audio = await this._dbAudio.create(body);
    await this._dbUsers.findByIdAndUpdate(audio.author, {
      $addToSet: {
        createdAudios: audio.id,
      },
    });

    return audio;
  }

  async getById(id: string): Promise<IAudio> {
    const audio = await this._dbAudio.findByIdAndUpdate(id, {
      $inc: { listenCount: 1 },
    });

    return audio;
  }

  async getByIdWithHistory(
    id: string,
    userId: Types.ObjectId,
  ): Promise<IAudio> {
    const audio = await this.getById(id);
    if (audio)
      await this._dbUsers.update({ _id: userId }, { $push: { history: id } });

    return audio;
  }

  getAll = async (): Promise<IAudio[]> => {
    return await this._dbClient.find();
  };

  getNew = async (): Promise<IAudio[]> => {
    return await this._dbClient.find().sort({ createdAt: -1, updatedAt: -1 });
  };

  getTop = async (): Promise<IAudio[]> => {
    return await this._dbClient.find().sort({ listenCount: -1 });
  };
}
