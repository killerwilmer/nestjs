import { Module } from '@nestjs/common';
import { TracingService } from './tracing.service';
import { TracingLogger } from './tracing.logger';
import { NastsClientModule } from './nasts-client/nasts-client.module';

@Module({
  providers: [TracingService, TracingLogger],
  exports: [TracingService, TracingLogger],
  imports: [NastsClientModule],
})
export class TracingModule {}
