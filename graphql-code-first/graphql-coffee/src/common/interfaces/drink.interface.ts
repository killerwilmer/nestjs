import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType({ description: 'Drink interface' })
export abstract class Drink {
  @Field()
  name: string;
}
