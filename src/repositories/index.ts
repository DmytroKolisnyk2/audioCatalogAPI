import type { RepositoriesInit } from '@types';
import { audioModel, userModel, profileModel } from '@models';
import { UserRepository } from './user.repository';
import { AudioRepository } from './audio.repository';

export const initRepositories = (): RepositoriesInit => ({
  userRepository: new UserRepository(userModel, profileModel),
  audioRepository: new AudioRepository(audioModel, userModel),
});

export type Repositories = ReturnType<typeof initRepositories>;

export { type UserRepository, type AudioRepository };
