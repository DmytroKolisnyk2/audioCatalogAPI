import type { RepositoriesInit } from '@types';
import { audioModel, testModel, userModel, profileModel } from '@models';
import { TestRepository } from './test.repository';
import { UserRepository } from './user.repository';
import { AudioRepository } from './audio.repository';
import { ProfileRepository } from './profile.repository';

export const initRepositories = (): RepositoriesInit => ({
  testRepository: new TestRepository(testModel),
  userRepository: new UserRepository(userModel),
  audioRepository: new AudioRepository(audioModel, userModel),
  profileRepository: new ProfileRepository(profileModel),
});

export type Repositories = ReturnType<typeof initRepositories>;

export {
  type TestRepository,
  type UserRepository,
  type AudioRepository,
  type ProfileRepository,
};
