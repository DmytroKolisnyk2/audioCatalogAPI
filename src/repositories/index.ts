import { testModel } from '@models';
import type { RepositoriesInit } from '@types';
import { TestRepository } from './test.repository';

export const initRepositories = (): RepositoriesInit => ({
  testRepository: new TestRepository(testModel),
});

export type Repositories = ReturnType<typeof initRepositories>;

export { type TestRepository };
