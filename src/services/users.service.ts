import type { UserRepository } from '@repositories';
import type { IAudio, IUser, UserDto } from '@types';
import type { Request } from 'express';
import { UserNotFoundError } from 'error';

export class UsersService {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  getUserById = async (req: Request): Promise<UserDto> => {
    const { userId } = req.params;
    const user = await this._userRepository.getById(userId);
    if (!user) {
      throw new UserNotFoundError(req.t);
    }

    return {
      user: user,
    };
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
    const updatedUser = await this._userRepository.toggleFollow(
      params.userId,
      user._id,
    );
    if (!updatedUser) throw new UserNotFoundError(req.t);

    return updatedUser;
  }

  async updateProfile(req: Request): Promise<IUser> {
    const { body, params } = req;
    const user = await this._userRepository.getById(params.userId);
    if (!user) {
      throw new UserNotFoundError(req.t);
    }
    await this._userRepository.putProfileData(user._id, body);
    const resUser = await this._userRepository.getById(user._id);

    return resUser;
  }
}
