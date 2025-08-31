import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./**/*.graphql'],
  path: join(process.cwd(), 'src/graphql.ts'),
  outputAs: 'class', // 'interface' | 'class' by default is 'interface'
  watch: true, // automatically generate types on changes
  skipResolverArgs: true, // generate resolvers wich are query/mutation/subscription as plain fields without arguments
});
