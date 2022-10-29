import type { UserRepository, AudioRepository } from '@repositories';
import type {
  AuthService,
  UsersService,
  CloudinaryService,
  AudioService,
} from '@services';

export type ServicesInit = {
  authService: AuthService;
  usersService: UsersService;
  audioService: AudioService;
  cloudinaryService: CloudinaryService;
};
export type RepositoriesInit = {
  userRepository: UserRepository;
  audioRepository: AudioRepository;
};
