import type { Repositories } from '@repositories';
import type { ServicesInit } from '@types';
import { cloudinary } from '@utils';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { AudioService } from './audio.service';
import { ProfileService } from './profile.service';
import { CloudinaryService } from './cloudinary.service';

export const initServices = (repositories: Repositories): ServicesInit => {
  const authService = new AuthService(repositories.userRepository);
  const usersService = new UsersService(
    repositories.userRepository,
    repositories.profileRepository,
  );
  const cloudinaryService = new CloudinaryService(cloudinary);
  const audioService = new AudioService(
    repositories.audioRepository,
    cloudinaryService,
  );
  const profileService = new ProfileService(
    repositories.profileRepository,
    cloudinaryService,
  );

  return {
    profileService,
    authService,
    usersService,
    audioService,
    cloudinaryService,
  };
};

export type Services = ReturnType<typeof initServices>;

export {
  type UsersService,
  type AuthService,
  type AudioService,
  type CloudinaryService,
  type ProfileService,
};
