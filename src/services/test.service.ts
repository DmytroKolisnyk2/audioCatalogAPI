import type { TestRepository } from '@repositories';
import type { TestModel } from '@types';
import type { TFunction } from 'i18next';

export class TestService {
  private _testRepository: TestRepository;

  constructor(testRepository: TestRepository) {
    this._testRepository = testRepository;
  }

  async getLocalizedGreeting(t: TFunction): Promise<string> {
    return t('test:message.first');
  }

  async getMessages(): Promise<TestModel[]> {
    return this._testRepository.getAll();
  }

  async addMessage(messageDto: TestModel): Promise<TestModel> {
    return this._testRepository.create(messageDto.message);
  }
}
