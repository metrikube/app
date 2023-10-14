import { SentMessageInfo, Transporter, createTransport } from 'nodemailer';

import { Injectable } from '@nestjs/common';

import { NotificationInterface } from '../../../domain/interfaces/adapters/notification.interface';

@Injectable()
export class NotificationService implements NotificationInterface {
  mailer: Transporter;

  constructor() {
    this.mailer = this.createTransport();
  }

  sendMail(to: string, subject: string, content: string): Promise<SentMessageInfo> {
    return this.mailer.sendMail({
      from: `MetriKube <${process.env.SMTP_USERNAME}>`,
      to: [to],
      subject,
      text: content,
      html: content
    });
  }

  private createTransport(): Transporter {
    return createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }
}
