export class AlarmSeverity {
  constructor(public readonly value: 'critical' | 'high' | 'medium' | 'low') {}

  equals(severity: AlarmSeverity): boolean {
    return this.value === severity.value;
  }
}
