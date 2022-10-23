import type { RepositoriesInit } from '@types';
import { audioModel, testModel, userModel } from '@models';
import { TestRepository } from './test.repository';
import { UserRepository } from './user.repository';
import { AudioRepository } from './audio.repository';

export const initRepositories = (): RepositoriesInit => ({
  testRepository: new TestRepository(testModel),
  userRepository: new UserRepository(userModel),
  audioRepository: new AudioRepository(audioModel, userModel),
});

export type Repositories = ReturnType<typeof initRepositories>;

export { type TestRepository, type UserRepository, type AudioRepository };
