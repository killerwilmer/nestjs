import { Alarm } from '../../domain/alarm';

export abstract class CreateAlarmRepository {
  // abstract findAll(limit: number, offset: number): Promise<Alarm[]>;

  // abstract findAllWithTotal(
  //   limit: number,
  //   offset: number,
  // ): Promise<[Alarm[], number]>;

  abstract save(alarm: Alarm): Promise<Alarm>;
}
