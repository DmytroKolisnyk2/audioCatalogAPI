import type { IProfile } from '@types';
import type { Model } from 'mongoose';

export class ProfileRepository {
  private _dbProfile: Model<IProfile>;

  constructor(profileRepository: Model<IProfile>) {
    this._dbProfile = profileRepository;
  }

  async updateProfileBanner(userId: string, banner: string) {
    const updatedProfile = await this._dbProfile.findOneAndUpdate(
      { user: userId },
      { banner },
      { new: true },
    );

    return updatedProfile;
  }

  async updateProfileAvatar(userId: string, avatarUrl: string) {
    const updatedProfile = await this._dbProfile.findOneAndUpdate(
      { user: userId },
      { avatarUrl },
      { new: true },
    );

    return updatedProfile;
  }
}
