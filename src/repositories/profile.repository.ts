import type { IProfile, UpdateProfileDto } from '@types';
import type { Model, Types } from 'mongoose';

export class ProfileRepository {
  private _dbProfile: Model<IProfile>;

  constructor(profileRepository: Model<IProfile>) {
    this._dbProfile = profileRepository;
  }

  async updateProfileBanner(userId: string, banner: string): Promise<IProfile> {
    const updatedProfile = await this._dbProfile.findOneAndUpdate(
      { user: userId },
      { banner },
      { new: true },
    );

    return updatedProfile;
  }

  async putProfileData(
    profileId: Types.ObjectId | string,
    body: UpdateProfileDto,
  ): Promise<IProfile> {
    return await this._dbProfile.findByIdAndUpdate(profileId, body, {
      new: true,
    });
  }

  async updateProfileAvatar(
    userId: string,
    avatarUrl: string,
  ): Promise<IProfile> {
    const updatedProfile = await this._dbProfile.findOneAndUpdate(
      { user: userId },
      { avatarUrl },
      { new: true },
    );

    return updatedProfile;
  }
}
