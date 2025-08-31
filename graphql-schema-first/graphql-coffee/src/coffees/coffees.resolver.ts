import { Query, Resolver } from '@nestjs/graphql';
import { Coffee } from '../graphql';

@Resolver()
export class CoffeesResolver {
  @Query('coffees')
  async findAll(): Promise<Coffee[]> {
    return [];
  }
}
