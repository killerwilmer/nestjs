import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const tcpMicroservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: 4002,
    },
  });
  const redisMicroservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  await Promise.all([tcpMicroservice.listen(), redisMicroservice.listen()]);

  console.log('TCP Microservice is listening on port 4002');
  console.log('Redis Microservice is listening on port 6379');
}
bootstrap();
