import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';

  // value from the client which are in json format
  parseValue(value: number): Date {
    return new Date(value);
  }

  // will be executed before the response is set back to the client
  serialize(value: Date): number {
    console.log(`Serialising: ${value}`);
    return value.getTime();
  }

  // handles what we get from the client in the query, meaning the inline value
  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    throw new Error(`Date scalar can only parse INT values, got: ${ast.kind}`);
  }
}
