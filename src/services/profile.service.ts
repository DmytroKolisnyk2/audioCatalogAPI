import type { ProfileRepository } from '@repositories';
import type { IProfile } from '@types';

import type { Request } from 'express';

export class ProfileService {
  private _profileRepository: ProfileRepository;

  constructor(profileRepository: ProfileRepository) {
    this._profileRepository = profileRepository;
  }

  async updateBanner(req: Request): Promise<IProfile> {
    const { user, params } = req;
    const updatedProfile = await this._profileRepository.updateProfileBanner(
      user._id,
      params.newUrl,
    );

    return updatedProfile;
  }

  async updateAvatar(req: Request): Promise<IProfile> {
    const { user, params } = req;
    const updatedProfile = await this._profileRepository.updateProfileAvatar(
      user._id,
      params.newUrl,
    );

    return updatedProfile;
  }
}
