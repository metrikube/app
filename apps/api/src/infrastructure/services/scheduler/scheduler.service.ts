import { CronJob } from 'cron';

import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

import { SchedulerInterface, SecondsCronPattern } from '../../../domain/interfaces/scheduler/scheduler.interface';

@Injectable()
export class SchedulerService implements SchedulerInterface {
  logger: Logger = new Logger(SchedulerService.name);

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  async scheduleAlert(name: string, frequency: SecondsCronPattern | number, callback: () => Promise<void>): Promise<void> {
    const job = new CronJob(`${frequency} * * * * *`, async () => {
      this.logger.log(`job ${name} running...`);
      await callback();
      this.logger.log(`job ${name} finished!`);
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(`job ${name} added with frequency ${frequency}`);
  }
}
