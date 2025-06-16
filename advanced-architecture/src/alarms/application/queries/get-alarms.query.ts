export class GetAlarmsQuery {
  constructor(
    public readonly limit: number,
    public readonly offset: number,
  ) {}
}
