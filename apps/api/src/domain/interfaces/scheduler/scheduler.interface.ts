export interface SchedulerInterface {
  scheduleAlert(name: string, alertId: string, seconds: number, callback: () => Promise<void>): Promise<void>;
}
