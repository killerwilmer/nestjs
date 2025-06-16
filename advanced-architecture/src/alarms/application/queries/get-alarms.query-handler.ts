import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Alarm } from '../../domain/alarm';
import { GetAlarmsQuery } from './get-alarms.query';
import { AlarmRepository } from '../ports/alarm.repository';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, { data: Alarm[]; total: number }>
{
  constructor(private readonly alarmRepository: AlarmRepository) {}

  async execute(
    query: GetAlarmsQuery,
  ): Promise<{ data: Alarm[]; total: number }> {
    const { limit, offset } = query;
    const [data, total] = await this.alarmRepository.findAllWithTotal(
      limit,
      offset,
    );
    return { data, total };
  }
}
