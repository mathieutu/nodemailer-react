import { Options as TransportOptions } from 'nodemailer/lib/smtp-transport'
import { ReactElement } from 'react'
import EmailService from './EmailService'

export type EmailConfig = {
  from: {
    name: string,
    email: string,
  },
  transport: TransportOptions,
}

export type Email<Props> = (props: Props) => {
  body: ReactElement<Props>,
  subject: string,
}

export type EmailsList = {
  [name: string]: Email<any>,
}

export const Mailer = EmailService

export default EmailService
