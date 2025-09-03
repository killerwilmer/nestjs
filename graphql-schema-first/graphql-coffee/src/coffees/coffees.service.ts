import { Injectable } from '@nestjs/common';
import * as GraphQLTypes from '../graphql-types';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from '@nestjs/apollo';
import { CreateCoffeeInput } from './dto/create-coffee.input';
import { UpdateCoffeeInput } from './dto/update-coffee.input';
import { Flavor } from './entities/flavor.entity';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorsRepository: Repository<Flavor>,
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
    const flavors = await Promise.all(
      createCoffeeInput.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const normalizedInput = Object.fromEntries(
      Object.entries(createCoffeeInput).map(([k, v]) => [
        k,
        v === null ? undefined : v,
      ]),
    );

    const coffee = this.coffeesRepository.create({
      ...normalizedInput,
      flavors,
    });

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

    const flavors =
      updateCoffeeInput.flavors != null
        ? await Promise.all(
            updateCoffeeInput.flavors.map((name) =>
              this.preloadFlavorByName(name),
            ),
          )
        : undefined;

    const coffee = await this.coffeesRepository.preload({
      id,
      ...normalizedInput,
      flavors,
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

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorsRepository.findOne({
      where: { name },
    });

    if (existingFlavor) {
      return existingFlavor;
    }

    return this.flavorsRepository.create({ name });
  }
}
