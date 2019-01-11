import { createTransport, SendMailOptions, SentMessageInfo, Transporter } from 'nodemailer'
import { Options as TransportOptions } from 'nodemailer/lib/smtp-transport'
import { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

function renderBody<P>(body: ReactElement<P>): string {
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" ' +
    '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'

  return doctype + renderToStaticMarkup(body)
}

type ArgumentType<F extends Function> = F extends (arg: infer A) => any ? A : never

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

export default function <Emails extends EmailsList>(config: EmailConfig, emails: Emails) {
  const { transport: transportConfig, defaults } = config
  const transport: Transporter = createTransport(transportConfig, defaults)

  return {
    send<TemplateName extends keyof Emails>(
      template: TemplateName,
      props: ArgumentType<Emails[TemplateName]>,
      message: SendMailOptions,
    ): Promise<SentMessageInfo> {

      const { subject, body } = emails[template](props)

      return transport.sendMail({ subject, html: renderBody(body), ...message })
    },
  }
}
