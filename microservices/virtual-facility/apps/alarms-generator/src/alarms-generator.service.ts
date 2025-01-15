import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, NatsRecordBuilder } from '@nestjs/microservices';
import { ALARMS_SERVICE } from './constant';
import { Interval } from '@nestjs/schedule';
import { TracingService } from '../../../libs/tracing/src';
import * as nats from 'nats';

@Injectable()
export class AlarmsGeneratorService {
  constructor(
    @Inject(ALARMS_SERVICE) private readonly alarmsService: ClientProxy,
    private readonly tracingService: TracingService,
  ) {}

  @Interval(10000)
  genereteAlarm() {
    const headers = nats.headers();
    headers.set('traceId', this.tracingService.generateTraceId());

    const alarmCreateEvent = {
      name: 'Alarm #' + Math.floor(Math.random() * 1000) + 1,
      // ramdom number between 1 and 100
      buildingId: Math.floor(Math.random() * 100) + 1,
    };
    const natsRecord = new NatsRecordBuilder(alarmCreateEvent)
      .setHeaders(headers)
      .build();

    this.alarmsService.emit('alarm.created', natsRecord);
  }
}
