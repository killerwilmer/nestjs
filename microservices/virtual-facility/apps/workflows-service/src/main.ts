import { NestFactory } from '@nestjs/core';
import { WorkflowsServiceModule } from './workflows-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(WorkflowsServiceModule);

  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: process.env.NATS_URL,
        debug: true,
        queue: 'workflows-service', // By default NATS ueses broadcast for all subscribers
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
