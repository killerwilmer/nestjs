import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // apply for all routes
    // consumer.apply(LoggingMiddleware).forRoutes('coffees'); // only for coffees
    // consumer
    //   .apply(LoggingMiddleware)
    //   .forRoutes({ path: 'coffees', method: RequestMethod.GET }); // for coffees prefix with GET method
    // consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*'); // for all routes except coffees prefix
  }
}
