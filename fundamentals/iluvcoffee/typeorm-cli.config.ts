import { DataSource } from 'typeorm';
import { CoffeeRefactor1731640979937 } from './src/migrations/1731640979937-CoffeeRefactor';
import { Coffee } from './src/coffees/entities/coffee.entity';
import { Flavor } from './src/coffees/entities/flavor.entity';
import { SchemaSync1731642262196 } from './src/migrations/1731642262196-SchemaSync';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Coffee, Flavor],
  migrations: [CoffeeRefactor1731640979937, SchemaSync1731642262196],
});
