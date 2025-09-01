import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from '../graphql';
import { ParseIntPipe } from '@nestjs/common';

@Resolver()
export class CoffeesResolver {
  @Query('coffees')
  async findAll(): Promise<Coffee[]> {
    return [];
  }

  @Query(() => Coffee, { name: 'coffee' })
  async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return null;
  }
}
