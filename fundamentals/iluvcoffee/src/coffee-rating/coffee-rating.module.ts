import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesModule } from '../coffees/coffees.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    CoffeesModule,
    DatabaseModule.register({
      // 👈 passing in dynamic values
      type: 'postgres',
      host: 'localhost',
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    }),
  ],
  providers: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
