import type { Repositories } from '@repositories';
import type { ServicesInit } from '@types';
import { TestService } from './test.service';
import { AuthService } from './auth.service';

export const initServices = (repositories: Repositories): ServicesInit => {
  const testService = new TestService(repositories.testRepository);
  const authService = new AuthService(repositories.userRepository);

  return {
    testService,
    authService,
  };
};

export type Services = ReturnType<typeof initServices>;

export { type TestService, type AuthService };
