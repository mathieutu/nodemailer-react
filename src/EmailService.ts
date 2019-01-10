import { createTransport, SendMailOptions, SentMessageInfo, Transporter } from 'nodemailer'
import { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { EmailConfig, EmailsList } from './index'

function renderBody<P>(body: ReactElement<P>): string {
  const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" ' +
    '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'

  return doctype + renderToStaticMarkup(body)
}

type ArgumentType<F extends Function> = F extends (arg: infer A) => any ? A : never

export default function <Emails extends EmailsList>(config: EmailConfig, emails: Emails) {
  const { transport: transportConfig, from: { name, email } } = config
  const transport: Transporter = createTransport(transportConfig, { from: `"${name}" ${email}` })

  return {
    send<TemplateName extends keyof Emails>(
      template: TemplateName,
      props: ArgumentType<typeof emails[TemplateName]>,
      message: SendMailOptions,
    ): Promise<SentMessageInfo> {

      const { subject, body } = emails[template](props)

      return transport.sendMail({ subject, html: renderBody(body), ...message })
    },
  }
}
