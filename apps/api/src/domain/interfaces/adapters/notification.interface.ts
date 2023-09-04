export interface NotificationInterface {
  sendMail(to: string, subject: string, content: string): Promise<void>;
}
