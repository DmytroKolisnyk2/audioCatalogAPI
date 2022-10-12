import type { TestRepository, UserRepository } from '@repositories';
import type { TestService, AuthService } from '@services';

export type ServicesInit = {
  testService: TestService;
  authService: AuthService;
};
export type RepositoriesInit = {
  testRepository: TestRepository;
  userRepository: UserRepository;
};