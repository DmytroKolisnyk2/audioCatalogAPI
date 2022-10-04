import type { TestRepository } from '@repositories';
import type { TestModel } from '@types';

export class TestService {
  private _testRepository: TestRepository;

  constructor(testRepository: TestRepository) {
    this._testRepository = testRepository;
  }

  async getMessages(): Promise<TestModel[]> {
    return this._testRepository.getAll();
  }

  async addMessage(messageDto: TestModel): Promise<TestModel> {
    return this._testRepository.create(messageDto.message);
  }
}
