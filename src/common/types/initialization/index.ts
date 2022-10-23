import type { TestRepository, UserRepository, AudioRepository } from '@repositories';
import type {
  TestService,
  AuthService,
  UsersService,
  CloudinaryService,
  AudioService,
} from '@services';

export type ServicesInit = {
  testService: TestService;
  authService: AuthService;
  usersService: UsersService;
  audioService: AudioService;
  cloudinaryService: CloudinaryService;
};
export type RepositoriesInit = {
  testRepository: TestRepository;
  userRepository: UserRepository;
  audioRepository: AudioRepository;
};
