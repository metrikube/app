import { SentMessageInfo } from 'nodemailer'

export interface NodemailerInterface {
  sendMail(to: string, subject: string, content: string): Promise<SentMessageInfo>
}
