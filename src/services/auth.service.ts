import type { UserRepository } from '@repositories';
import type { Request } from 'express';
import { generate } from '@utils';
import { UserExistError } from 'error';
import type { UserDto } from '@types';

export class AuthService {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  register = async (req: Request): Promise<UserDto> => {
    const { username, password } = req.body;
    const existingUser = await this._userRepository.getByUsername(username);
    if (existingUser) {
      throw new UserExistError(req.t);
    }
    const hashedPassword = await this._userRepository.hashPassword(password);

    const newUser = await this._userRepository.createUser(
      req.body,
      hashedPassword,
    );
    const payload = {
      username: newUser.username,
      _id: newUser._id,
    };
    const token = generate(payload);
    console.log(req.t('auth:messages.userCreated'));

    return {
      message: req.t('auth:messages.userCreated'),
      user: newUser,
      token,
    };
  };
}
