import type {
  UserRepository,
  AudioRepository,
  ProfileRepository,
} from '@repositories';

import type {
  AuthService,
  UsersService,
  CloudinaryService,
  AudioService,
  ProfileService,
} from '@services';

export type ServicesInit = {
  authService: AuthService;
  usersService: UsersService;
  audioService: AudioService;
  profileService: ProfileService;
  cloudinaryService: CloudinaryService;
};

export type RepositoriesInit = {
  userRepository: UserRepository;
  audioRepository: AudioRepository;
  profileRepository: ProfileRepository;
};
