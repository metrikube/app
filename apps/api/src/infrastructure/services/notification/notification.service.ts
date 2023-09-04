import { Resend } from 'resend';

import { Injectable } from '@nestjs/common';

import { NotificationInterface } from '../../../domain/interfaces/adapters/notification.interface';

@Injectable()
export class NotificationService implements NotificationInterface {
  mailer: Resend;

  constructor() {
    this.mailer = this.createTransport();
  }

  async sendMail(to: string, subject: string, content: string): Promise<void> {
    await this.mailer.emails.send({ from: 'Acme <onboarding@resend.dev>', to, subject, text: content });
  }

  private createTransport(): Resend {
    return new Resend(process.env.RESEND_API_KEY);
  }
}
