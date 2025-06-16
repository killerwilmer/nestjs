import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlarmRepository } from '../../../../application/ports/alarm.repository';
import { Alarm } from '../../../../domain/alarm';
import { AlarmEntity } from '../entities/alarm.entity';
import { AlarmMapper } from '../mappers/alarm.mapper';

@Injectable()
export class OrmAlarmRepository implements AlarmRepository {
  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>,
  ) {}

  async findAll(limit: number, offset: number): Promise<Alarm[]> {
    const entities = await this.alarmRepository.find({
      skip: offset,
      take: limit,
    });
    return entities.map((item) => AlarmMapper.toDomain(item));
  }

  async findAllWithTotal(
    limit: number,
    offset: number,
  ): Promise<[Alarm[], number]> {
    const [entities, total] = await this.alarmRepository.findAndCount({
      skip: offset,
      take: limit,
    });

    const data = entities.map((item) => AlarmMapper.toDomain(item));
    return [data, total];
  }

  async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    const newEntity = await this.alarmRepository.save(persistenceModel);
    return AlarmMapper.toDomain(newEntity);
  }
}
