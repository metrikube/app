import { SentMessageInfo, Transporter, createTransport } from 'nodemailer'

import { Injectable } from '@nestjs/common'

import { NodemailerInterface } from '../../domain/interfaces/adapters/nodemailer.interface'

@Injectable()
export class NodemailerAdapter implements NodemailerInterface {
  mailer: Transporter

  constructor() {
    this.mailer = this.createTransport()
  }

  sendMail(to: string, subject: string, content: string): Promise<SentMessageInfo> {
    return this.mailer.sendMail({
      from: { name: 'Metrikube App', address: process.env.SMTP_USERNAME },
      to: [to],
      subject,
      text: content,
      html: content
    })
  }

  private createTransport(): Transporter {
    return createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    })
  }
}
