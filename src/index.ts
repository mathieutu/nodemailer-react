import { createTransport, SendMailOptions, Transporter } from 'nodemailer'
import JSONTransport = require('nodemailer/lib/json-transport')
import { Options as TransportOptions, SentMessageInfo } from 'nodemailer/lib/smtp-transport'
import { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const renderBody = <P>(body: ReactElement<P>): string => `<!DOCTYPE html>${renderToStaticMarkup(body)}`

export type EmailConfig = {
  transport: TransportOptions | Transporter,
  defaults?: SendMailOptions,
}

export type Email<Props> = (props: Props) => {
  body: ReactElement<Props>,
  subject: string,
}

export type EmailsList = {
  [name: string]: Email<any>,
}

const createTransporter = ({ transport, defaults }: EmailConfig): Transporter => {
  if ('sendMail' in transport) {
    return transport
  }

  return createTransport(transport, defaults)
}

export const Mailer = <Emails extends EmailsList>(config: EmailConfig, emails: Emails) => {
  const transporter: Transporter = createTransporter(config)

  /**
   * Use the `send` method to send your emails
   *
   * @param {string} template Your email template name: key of the email in the record you've provided.
   * @param {Object} props The props of your email component
   * @param {Object} options The options of email (to, from, attachments, etc.)
   * @return Promise
   */
  const sendEmail = <TemplateName extends keyof Emails>(
    template: TemplateName,
    props: Parameters<Emails[TemplateName]>[0],
    options: SendMailOptions,
  ): Promise<SentMessageInfo> => {
    const { subject, body } = emails[template](props)

    return transporter.sendMail({ subject, html: renderBody(body), ...options })
  }

  const dumpJson = async <TemplateName extends keyof Emails> (
    template: TemplateName,
    props: Parameters<Emails[TemplateName]>[0],
    options: SendMailOptions,
  ): Promise<string> => {
    const { subject, body } = emails[template](props)

    const { message } = await createTransport({ jsonTransport: true }, config.defaults as JSONTransport.Options)
      .sendMail({ subject, html: renderBody(body), ...options })

    return message
  }
  return {
    send: sendEmail,
    toJson: dumpJson,
  }
}

export default Mailer
