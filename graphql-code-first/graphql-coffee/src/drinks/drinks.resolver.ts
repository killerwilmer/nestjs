import { Query, Resolver } from '@nestjs/graphql';
import { Drink } from '../common/interfaces/drink.interface';
import { Coffee } from '../coffees/entities/coffee.entity';
import { Tea } from '../teas/entities/tea.entity';

@Resolver()
export class DrinksResolver {
  @Query(() => [Drink], { name: 'drinks' })
  async findAll(): Promise<Drink[]> {
    // we're mocking everything just for demonstration purposes
    const coffee = new Coffee();
    coffee.id = 1;
    coffee.name = 'Colombia';
    coffee.brand = 'Black Crow Coffee';

    // we're mocking everything - we also don't have a Tea table
    // [if you'd like!] as a fun exercise follow steps similar to how we did everything for Coffee
    // to create a Tea table/etc
    const tea = new Tea();
    tea.name = 'Lipton';
    return [tea, coffee];
  }
}
