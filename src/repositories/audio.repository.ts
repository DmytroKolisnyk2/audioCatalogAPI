import type { IAudio, IUser } from '@types';
import type { Model, Types } from 'mongoose';

export class AudioRepository {
  private _dbAudio: Model<IAudio>;

  private _dbUsers: Model<IUser>;

  constructor(audioRepository: Model<IAudio>, userRepository: Model<IUser>) {
    this._dbAudio = audioRepository;
    this._dbUsers = userRepository;
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

  async getAllByName(query): Promise<IAudio[]> {
    return await this._dbAudio.find({ name: { $regex: query } });
  }

  async getAllByGenres(genre): Promise<IAudio[]> {
    return await this._dbAudio.find({genres: {$regex: genre}});
  }

  async getAll(): Promise<IAudio[]> {
    return await this._dbAudio.find();
  }

  async getNew(): Promise<IAudio[]> {
    return await this._dbAudio.find().sort({ createdAt: -1, updatedAt: -1 });
  }

  async getTop(): Promise<IAudio[]> {
    return await this._dbAudio.find().sort({ listenCount: -1 });
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

  async toggleLike(audioId: string, userId: Types.ObjectId): Promise<IAudio> {
    const audioLiked = await this._dbAudio.exists({
      _id: audioId,
      usersLiked: userId,
    });
    let patchedAudio;
    if (audioLiked) {
      await this._dbUsers.findByIdAndUpdate(userId, {
        $pull: {
          likedAudios: audioId,
        },
      });
      patchedAudio = await this._dbAudio.findByIdAndUpdate(
        audioId,
        {
          $pull: {
            usersLiked: userId,
          },
        },
        { new: true },
      );
    }

    if (!audioLiked) {
      await this._dbUsers.findByIdAndUpdate(userId, {
        $addToSet: {
          likedAudios: audioId,
        },
      });
      patchedAudio = await this._dbAudio.findByIdAndUpdate(
        audioId,
        {
          $addToSet: {
            usersLiked: userId,
          },
        },
        { new: true },
      );
    }

    return patchedAudio;
  }
}
