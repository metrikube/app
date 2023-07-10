import { SentMessageInfo } from 'nodemailer'

export interface NotificationInterface {
  sendMail(to: string, subject: string, content: string): Promise<SentMessageInfo>
}
