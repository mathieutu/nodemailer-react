import {
  createTransport, SendMailOptions, SentMessageInfo, Transporter,
} from 'nodemailer'
import { Options as TransportOptions } from 'nodemailer/lib/smtp-transport'
import { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const renderBody = <P>(body: ReactElement<P>): string => `<!DOCTYPE html>${renderToStaticMarkup(body)}`

export type EmailConfig = {
  transport: TransportOptions,
  defaults?: SendMailOptions,
}

export type Email<Props> = (props: Props) => {
  body: ReactElement<Props>,
  subject: string,
}

export type EmailsList = {
  [name: string]: Email<any>,
}

export const Mailer = <Emails extends EmailsList>(config: EmailConfig, emails: Emails) => {
  const { transport: transportConfig, defaults } = config
  const transport: Transporter = createTransport(transportConfig, defaults)

  const sendEmail = <TemplateName extends keyof Emails>(
    template: TemplateName,
    props: Parameters<Emails[TemplateName]>[0],
    options: SendMailOptions,
  ): Promise<SentMessageInfo> => {
    const { subject, body } = emails[template](props)

    return transport.sendMail({ subject, html: renderBody(body), ...options })
  }

  return {
    send: sendEmail,
  }
}

export default Mailer
