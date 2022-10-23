import type { UserRepository } from '@repositories';
import type { IAudio, UserDto } from '@types';
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
}
