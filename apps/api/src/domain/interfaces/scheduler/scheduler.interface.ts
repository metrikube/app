export interface SchedulerInterface {
  scheduleAlert(name: string, seconds: number, callback: () => Promise<void>): Promise<void>;
}
