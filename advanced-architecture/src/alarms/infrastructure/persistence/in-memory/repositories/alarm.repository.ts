import { Injectable } from '@nestjs/common';
import { AlarmRepository } from '../../../../application/ports/alarm.repository';
import { Alarm } from '../../../../domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmMapper } from '../mappers/alarm.mapper';

@Injectable()
export class InMemoryAlarmRepository implements AlarmRepository {
  private readonly alarms = new Map<string, AlarmEntity>();

  async findAll(limit: number, offset: number): Promise<Alarm[]> {
    const entities = Array.from(this.alarms.values()).slice(
      offset,
      offset + limit,
    );
    return entities.map((item) => AlarmMapper.toDomain(item));
  }

  async findAllWithTotal(
    limit: number,
    offset: number,
  ): Promise<[Alarm[], number]> {
    const all = Array.from(this.alarms.values());
    const paginated = all.slice(offset, offset + limit);
    const data = paginated.map((item) => AlarmMapper.toDomain(item));
    return [data, all.length];
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    this.alarms.set(persistenceModel.id, persistenceModel);

    const newEntity = this.alarms.get(persistenceModel.id);
    return AlarmMapper.toDomain(newEntity);
  }
}
