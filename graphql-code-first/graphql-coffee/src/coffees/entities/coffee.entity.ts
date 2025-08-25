import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Coffee model' })
export class Coffee {
  @Field((type) => ID, { description: 'A unique identifier' })
  id: number;
  name: string;
  brand: string;
  flavors: string[];
}
