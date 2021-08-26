import { createTransport, SendMailOptions, SentMessageInfo, Transporter } from 'nodemailer'
import { Options as TransportOptions } from 'nodemailer/lib/smtp-transport'
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

const createTransportFromConfig = ({ transport, defaults }: EmailConfig): Transporter => {
  if ('sendMail' in transport) {
    return transport
  }

  return createTransport(transport, defaults)
}

export const Mailer = <Emails extends EmailsList>(config: EmailConfig, emails: Emails) => {
  const transport: Transporter = createTransportFromConfig(config)

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
