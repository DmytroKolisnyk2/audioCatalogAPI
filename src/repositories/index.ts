import type { RepositoriesInit } from '@types';
import { audioModel, userModel, profileModel } from '@models';
import { UserRepository } from './user.repository';
import { AudioRepository } from './audio.repository';
import { ProfileRepository } from './profile.repository';

export const initRepositories = (): RepositoriesInit => ({
  userRepository: new UserRepository(userModel, profileModel),
  audioRepository: new AudioRepository(audioModel, userModel),
  profileRepository: new ProfileRepository(profileModel),
});

export type Repositories = ReturnType<typeof initRepositories>;

export { type UserRepository, type AudioRepository, type ProfileRepository };
