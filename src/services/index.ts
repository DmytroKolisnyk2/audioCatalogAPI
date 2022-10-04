import type { Repositories } from '@repositories';
import type { ServicesInit } from '@types';
import { TestService } from './test.service';

export const initServices = (repositories: Repositories): ServicesInit => {
  const testService = new TestService(repositories.testRepository);

  return {
    testService,
  };
};

export type Services = ReturnType<typeof initServices>;

export { type TestService };
