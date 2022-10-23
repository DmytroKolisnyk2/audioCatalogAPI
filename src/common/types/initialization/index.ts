import type {
  TestRepository,
  UserRepository,
} from '@repositories';
import type { TestService, AuthService, UsersService } from '@services';

export type ServicesInit = {
  testService: TestService;
  authService: AuthService;
  usersService: UsersService;
};
export type RepositoriesInit = {
  testRepository: TestRepository;
  userRepository: UserRepository;
};
