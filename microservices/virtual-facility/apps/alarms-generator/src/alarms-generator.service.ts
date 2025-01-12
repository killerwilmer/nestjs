import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ALARMS_SERVICE } from './constant';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class AlarmsGeneratorService {
  constructor(
    @Inject(ALARMS_SERVICE) private readonly alarmsService: ClientProxy,
  ) {}

  @Interval(10000)
  genereteAlarm() {
    const alarmCreateEvent = {
      name: 'Alarm #' + Math.floor(Math.random() * 1000) + 1,
      // ramdom number between 1 and 100
      buildingId: Math.floor(Math.random() * 100) + 1,
    };
    this.alarmsService.emit('alarm.created', alarmCreateEvent);
  }
}
