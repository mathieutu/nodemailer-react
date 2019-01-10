import { createTransport, SendMailOptions, SentMessageInfo, Transporter } from 'nodemailer'
import { ReactElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { EmailConfig, Emails } from './index'

export default class EmailService {
  private transport: Transporter

  constructor(config: EmailConfig, private emails: Emails) {
    const { transport, from: { name, email } } = config
    this.transport = createTransport(transport, { from: `"${name}" ${email}` })
  }

  public send<T extends keyof Emails>(
    template: T,
    props: ArgumentType<Emails[T]>,
    message: SendMailOptions,
  ): Promise<SentMessageInfo> {

    const { subject, body } = this.emails[template](props)

    return this.transport.sendMail({ subject, html: this.renderBody(body), ...message })
  }

  private renderBody<P>(body: ReactElement<P>): string {
    const doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" ' +
      '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">'

    return doctype + renderToStaticMarkup(body)
  }

}

type ArgumentType<F extends Function> = F extends (arg: infer A) => any ? A : never
