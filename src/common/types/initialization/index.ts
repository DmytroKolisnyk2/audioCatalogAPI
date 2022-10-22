import type {
  AudioRepository,
  TestRepository,
  UserRepository,
} from '@repositories';
import type {
  TestService,
  AuthService,
  AudioService,
  CloudinaryService,
} from '@services';

export type ServicesInit = {
  testService: TestService;
  authService: AuthService;
  audioService: AudioService;
  cloudinaryService: CloudinaryService;
};
export type RepositoriesInit = {
  testRepository: TestRepository;
  userRepository: UserRepository;
  audioRepository: AudioRepository;
};
