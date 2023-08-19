type SecondsCronPattern = `*/${number}`;

export interface SchedulerInterface {
  scheduleAlert(name: string, seconds: SecondsCronPattern | number, callback: () => Promise<void>): Promise<void>;
}
