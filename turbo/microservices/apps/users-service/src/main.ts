import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: 4003,
    },
  });
  await app.listen();
  console.log('Users Microservice is listening on port 4003');
}
bootstrap();
