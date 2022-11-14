import type { UserRepository, ProfileRepository } from '@repositories';
import type { IAudio, IUser } from '@types';
import type { Request } from 'express';
import {
  UserNotFoundError,
  ForbiddenAccessError,
  SelfFollowError,
} from 'error';

export class UsersService {
  private _userRepository: UserRepository;

  private _profileRepository: ProfileRepository;

  constructor(
    userRepository: UserRepository,
    profileRepository: ProfileRepository,
  ) {
    this._userRepository = userRepository;
    this._profileRepository = profileRepository;
  }

  getUserById = async (req: Request): Promise<IUser> => {
    const { userId } = req.params;
    const user = await this._userRepository.getById(userId);
    if (!user) {
      throw new UserNotFoundError(req.t);
    }

    return user;
  };

  getUserAudios = async (req: Request): Promise<IAudio[]> => {
    const { userId } = req.params;
    const user = await this._userRepository.getById(userId);
    if (!user) {
      throw new UserNotFoundError(req.t);
    }
    const userAudios = await this._userRepository.getUserAudios(userId);

    return userAudios;
  };

  getUserLikedAudios = async (req: Request): Promise<IAudio[]> => {
    const { userId } = req.params;
    const user = await this._userRepository.getById(userId);
    if (!user) {
      throw new UserNotFoundError(req.t);
    }
    const userAudios = await this._userRepository.getUserLikedAudios(userId);

    return userAudios;
  };

  getUserHistoryAudios = async (req: Request): Promise<IAudio[]> => {
    const { userId } = req.params;
    const user = await this._userRepository.getById(userId);
    if (!user) {
      throw new UserNotFoundError(req.t);
    }
    const userAudios = await this._userRepository.getUserHistoryAudios(userId);

    return userAudios;
  };

  getUserFollowing = async (req: Request): Promise<IUser[]> => {
    const { userId } = req.params;
    const user = await this._userRepository.getById(userId);
    if (!user) {
      throw new UserNotFoundError(req.t);
    }
    const userFollowing = await this._userRepository.getUserFollowing(userId);

    return userFollowing;
  };

  getUserFollowers = async (req: Request): Promise<IUser[]> => {
    const { userId } = req.params;
    const user = await this._userRepository.getById(userId);
    if (!user) {
      throw new UserNotFoundError(req.t);
    }
    const userFollowers = await this._userRepository.getUserFollowers(userId);

    return userFollowers;
  };

  async updateFollow(req: Request): Promise<IUser> {
    const { user, params } = req;
    if (user._id.valueOf() === params.userId) throw new SelfFollowError(req.t);
    const updatedUser = await this._userRepository.toggleFollow(
      params.userId,
      user._id,
    );
    if (!updatedUser) throw new UserNotFoundError(req.t);

    return updatedUser;
  }

  async updateProfile(req: Request): Promise<IUser> {
    const { body, params, user } = req;

    if (params.userId !== String(user._id)) {
      throw new ForbiddenAccessError(req.t);
    }

    await this._profileRepository.updateProfileData(user.profile, body);

    const resUser = await this._userRepository.getById(user._id);
    if (!resUser) {
      throw new UserNotFoundError(req.t);
    }

    return resUser;
  }
}
