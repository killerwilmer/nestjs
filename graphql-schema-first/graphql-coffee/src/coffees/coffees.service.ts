import { Injectable } from '@nestjs/common';
import * as GraphQLTypes from '../graphql-types';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from '@nestjs/apollo';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {}

  async findAll(): Promise<Coffee[]> {
    return this.coffeesRepository.find();
  }

  async findOne(id: number): Promise<Coffee> {
    const coffee = await this.coffeesRepository.findOne({ where: { id } });

    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }

    return coffee;
  }

  async create(createCoffeeInput: CreateCoffeeInput): Promise<Coffee> {
    const coffee = this.coffeesRepository.create(createCoffeeInput);
    return this.coffeesRepository.save(coffee);
  }

  async update(
    id: number,
    updateCoffeeInput: UpdateCoffeeInput,
  ): Promise<Coffee> {
    const normalizedInput = Object.fromEntries(
      Object.entries(updateCoffeeInput).map(([k, v]) => [
        k,
        v === null ? undefined : v,
      ]),
    );

    const coffee = await this.coffeesRepository.preload({
      id,
      ...normalizedInput,
    });

    if (!coffee) {
      throw new UserInputError(`Coffee #${id} does not exist`);
    }
    return this.coffeesRepository.save(coffee);
  }

  async remove(id: number): Promise<Coffee> {
    const coffee = await this.findOne(id);
    return this.coffeesRepository.remove(coffee);
  }
}
