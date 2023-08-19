import { CronJob } from 'cron';

import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

import { SchedulerInterface } from '../../domain/interfaces/scheduler/scheduler.interface';

@Injectable()
export class SchedulerService implements SchedulerInterface {
  logger: Logger = new Logger(SchedulerService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  async scheduleAlert(name: string, seconds: number, callback: () => Promise<void>): Promise<void> {
    const job = new CronJob(`${seconds} * * * * *`, async () => {
      this.logger.warn(`job ${name} running...`);
      await callback();
      this.logger.warn(`job ${name} finished!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(`job ${name} added for each minute at ${seconds} seconds!`);
  }
}
