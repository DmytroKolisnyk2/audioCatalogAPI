import type { RepositoriesInit } from '@types';
import { testModel, userModel } from '@models';
import { TestRepository } from './test.repository';
import { UserRepository } from './user.repository';

export const initRepositories = (): RepositoriesInit => ({
  testRepository: new TestRepository(testModel),
  userRepository: new UserRepository(userModel),
});

export type Repositories = ReturnType<typeof initRepositories>;

export { type TestRepository, type UserRepository };
