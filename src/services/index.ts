import type { Repositories } from '@repositories';
import type { ServicesInit } from '@types';
import { cloudinary } from '@utils';
import { TestService } from './test.service';
import { AuthService } from './auth.service';
import { AudioService } from './audio.service';
import { CloudinaryService } from './cloudinary.service';

export const initServices = (repositories: Repositories): ServicesInit => {
  const testService = new TestService(repositories.testRepository);
  const authService = new AuthService(repositories.userRepository);
  const cloudinaryService = new CloudinaryService(cloudinary);
  const audioService = new AudioService(
    repositories.audioRepository,
    cloudinaryService,
  );

  return {
    testService,
    authService,
    audioService,
    cloudinaryService,
  };
};

export type Services = ReturnType<typeof initServices>;

export {
  type TestService,
  type AuthService,
  type AudioService,
  type CloudinaryService,
};
