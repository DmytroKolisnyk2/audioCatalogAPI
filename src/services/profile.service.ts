import type { ProfileRepository } from '@repositories';
import type { IProfile } from '@types';

import type { Request } from 'express';
import type { CloudinaryService } from './cloudinary.service';

export class ProfileService {
  private _profileRepository: ProfileRepository;

  private _cloudinaryService: CloudinaryService;

  constructor(
    profileRepository: ProfileRepository,
    cloudinaryService: CloudinaryService,
  ) {
    this._profileRepository = profileRepository;
    this._cloudinaryService = cloudinaryService;
  }

  async updateBanner(req: Request): Promise<IProfile> {
    const { user, params } = req;

    return null;
  }

  async updateAvatar(req: Request): Promise<IProfile> {
    const { user, params } = req;

    return null;
  }
}
