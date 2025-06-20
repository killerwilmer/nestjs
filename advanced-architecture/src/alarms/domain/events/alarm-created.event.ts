import { AutowiredEvent } from '../../../shared/decorators/autowired-event.decorator.ts';
import { Alarm } from '../alarm';

@AutowiredEvent
export class AlarmCreatedEvent {
  constructor(public readonly alarm: Alarm) {}
}
