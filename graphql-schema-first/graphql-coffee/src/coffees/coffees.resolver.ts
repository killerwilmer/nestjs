import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee, CreateCoffeeInput } from '../graphql';
import { ParseIntPipe } from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Query('coffees')
  async findAll(): Promise<Coffee[]> {
    return this.coffeesService.findAll();
  }

  @Query(() => Coffee, { name: 'coffee' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.coffeesService.findOne(id);
  }

  @Mutation('createCoffee') // notice we're decoupled the name from the actual GQL mutation name 'createCoffee'
  async create(
    @Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput,
  ): Promise<Coffee | null> {
    return this.coffeesService.create(createCoffeeInput);
  }
}
