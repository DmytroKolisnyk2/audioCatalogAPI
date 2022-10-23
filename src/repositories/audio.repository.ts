import type { IAudio, IUser } from '@types';
import type { Model } from 'mongoose';

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
}
