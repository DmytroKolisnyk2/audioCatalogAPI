import type { Repositories } from '@repositories';
import type { ServicesInit } from '@types';
import { TestService } from './test.service';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

export const initServices = (repositories: Repositories): ServicesInit => {
  const testService = new TestService(repositories.testRepository);
  const authService = new AuthService(repositories.userRepository);
  const usersService = new UsersService(repositories.userRepository);

  return {
    testService,
    authService,
    usersService,
  };
};

export type Services = ReturnType<typeof initServices>;

export { type TestService, type AuthService, type UsersService };
