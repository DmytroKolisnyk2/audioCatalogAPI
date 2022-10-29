import type {
  TestRepository,
  UserRepository,
  AudioRepository,
  ProfileRepository,
} from '@repositories';

import type {
  TestService,
  AuthService,
  UsersService,
  CloudinaryService,
  AudioService,
  ProfileService,
} from '@services';

export type ServicesInit = {
  testService: TestService;
  authService: AuthService;
  usersService: UsersService;
  audioService: AudioService;
  profileService: ProfileService;
  cloudinaryService: CloudinaryService;
};

export type RepositoriesInit = {
  testRepository: TestRepository;
  userRepository: UserRepository;
  audioRepository: AudioRepository;
  profileRepository: ProfileRepository;
};
