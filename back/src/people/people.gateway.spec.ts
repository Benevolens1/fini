import { Test, TestingModule } from '@nestjs/testing';
import { PeopleGateway } from './people.gateway';

describe('PeopleGateway', () => {
  let gateway: PeopleGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeopleGateway],
    }).compile();

    gateway = module.get<PeopleGateway>(PeopleGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
