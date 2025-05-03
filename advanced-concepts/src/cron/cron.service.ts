import { IntervalHost } from '../scheduler/decorators/interval-host.decorator';
import { Interval } from '../scheduler/decorators/interval.decorator';

@IntervalHost
export class CronService {
  @Interval(1000)
  everySecond() {
    console.log('This will be logged every second 🐾');
  }

  @Interval(5000)
  everyFiveSeconds() {
    console.log('This will be logged every five seconds 🐾');
  }
}
