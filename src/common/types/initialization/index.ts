import type { TestRepository } from '@repositories';
import type { TestService } from '@services';

export type ServicesInit = {
  testService: TestService;
};
export type RepositoriesInit = {
  testRepository: TestRepository;
};
