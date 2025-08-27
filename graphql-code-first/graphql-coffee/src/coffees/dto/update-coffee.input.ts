import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCoffeeInput } from './create-coffee.input';

@InputType()
export class UpdateCoffeeInput extends PartialType(CreateCoffeeInput) {} // PartialType makes all fields from CreateCoffeeInput optional
