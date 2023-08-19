export type SecondsCronPattern = `*/${number}`;

export interface SchedulerInterface {
  scheduleAlert(name: string, frequency: SecondsCronPattern | number, callback: () => Promise<void>): Promise<void>;
}
