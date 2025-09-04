import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: 4001,
    },
  });
  await app.listen();
  console.log('Orders Microservice is listening on port 4001');
}
bootstrap();
