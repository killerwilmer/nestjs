import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as GraphQLTypes from '../graphql-types';
import { ParseIntPipe } from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Resolver()
export class CoffeesResolver {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Query('coffees')
  async findAll(): Promise<GraphQLTypes.Coffee[]> {
    return this.coffeesService.findAll();
  }

  @Query(() => GraphQLTypes.Coffee, { name: 'coffee' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.coffeesService.findOne(id);
  }

  @Mutation('createCoffee') // notice we're decoupled the name from the actual GQL mutation name 'createCoffee'
  async create(
    @Args('createCoffeeInput')
    createCoffeeInput: GraphQLTypes.CreateCoffeeInput,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeesService.create(createCoffeeInput);
  }

  @Mutation('updateCoffee')
  async update(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCoffeeInput')
    updateCoffeeInput: GraphQLTypes.UpdateCoffeeInput,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeesService.update(id, updateCoffeeInput);
  }

  @Mutation('removeCoffee')
  async remove(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<GraphQLTypes.Coffee> {
    return this.coffeesService.remove(id);
  }
}
