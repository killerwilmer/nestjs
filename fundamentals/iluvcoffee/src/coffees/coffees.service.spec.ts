import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { ConfigService } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {
          provide: DataSource,
          useValue: {},
        },
        { provide: getRepositoryToken(Flavor), useValue: {} },
        {
          provide: getRepositoryToken(Coffee),
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {},
        },
        {
          provide: coffeesConfig.KEY,
          useValue: { foo: 'mockedFooValue' },
        },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    // service = await module.resolve(CoffeesService); // retrieve Request Scoped or Transient Scoped providers
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
