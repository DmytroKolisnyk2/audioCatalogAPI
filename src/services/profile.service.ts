import type { UserRepository, ProfileRepository } from '@repositories';
import type { IUser } from '@types';
import type { Request } from 'express';
import { UserNotFoundError, ForbiddenAccessError } from 'error';
import type { CloudinaryService } from './cloudinary.service';

export class ProfileService {
  private _profileRepository: ProfileRepository;

  private _userRepository: UserRepository;

  private _cloudinaryService: CloudinaryService;

  constructor(
    userRepository: UserRepository,
    profileRepository: ProfileRepository,
    cloudinaryService: CloudinaryService,
  ) {
    this._userRepository = userRepository;
    this._profileRepository = profileRepository;
    this._cloudinaryService = cloudinaryService;
  }

  async updateBanner(req: Request): Promise<IUser> {
    const { user, params } = req;

    if (params.userId !== String(user._id)) {
      throw new ForbiddenAccessError(req.t);
    }

    const coverUrl = await this._cloudinaryService
      .uploadImage(req.file.path)
      .then((file) => file.secure_url);

    this._profileRepository.updateProfileBanner(user._id, coverUrl);

    const resUser = await this._userRepository.getById(user._id);
    if (!resUser) {
      throw new UserNotFoundError(req.t);
    }

    return resUser;
  }

  async updateAvatar(req: Request): Promise<IUser> {
    const { user, params } = req;

    if (params.userId !== String(user._id)) {
      throw new ForbiddenAccessError(req.t);
    }

    const coverUrl = await this._cloudinaryService
      .uploadImage(req.file.path)
      .then((file) => file.secure_url);

    this._profileRepository.updateProfileAvatar(user._id, coverUrl);

    const resUser = await this._userRepository.getById(user._id);
    if (!resUser) {
      throw new UserNotFoundError(req.t);
    }

    return resUser;
  }
}
