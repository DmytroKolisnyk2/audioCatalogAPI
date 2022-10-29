import type { ProfileRepository } from '@repositories';
import { FilesFields } from '@enums';
import type { IProfile } from '@types';
import type { CloudinaryService } from './cloudinary.service';
import type { Request } from 'express';

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
    const { user } = req;

    const coverUrl = await this._cloudinaryService
      .uploadImage(req.files[FilesFields.COVER][0].path)
      .then((file) => file.secure_url);

    const updatedProfile = await this._profileRepository.updateProfileBanner(
      user._id,
      coverUrl,
    );

    return updatedProfile;
  }

  async updateAvatar(req: Request): Promise<IProfile> {
    const { user } = req;

    const coverUrl = await this._cloudinaryService
      .uploadImage(req.files[FilesFields.COVER][0].path)
      .then((file) => file.secure_url);

    const updatedProfile = await this._profileRepository.updateProfileAvatar(
      user._id,
      coverUrl,
    );

    return updatedProfile;
  }
}
