import { Mailer } from 'nodemailer-react'
import { PasswordEmail } from './PasswordEmail'
import { ReminderEmail } from './ReminderEmail'

/**
 * Parameters of the createTransport method
 * @see https://nodemailer.com/smtp/
 */
const mailerConfig = {
  transport: {
    host: 'smtp.example.com',
    secure: true,
    auth: { user: 'username', pass: 'password' },
  },
  defaults: {
    from: { name: 'mathieutu', address: 'oss@mathieutu.dev' },
  },
}

/** Record of all emails that will be available */
const emailsList = {
  PasswordEmail,
  ReminderEmail,
}

/** Instance of mailer to export */
const mailer = Mailer(mailerConfig, emailsList)

/**
 * Send mail in your application, by passing:
 * - Your email template name: key of the email in the record you've provided.
 * - The props of your email component
 * - The options of email (to, from, attachments, etc.) @see https://nodemailer.com/message/
 */

/** A first email sent */
await mailer.send('PasswordEmail', {
  firstName: 'Mathieu',
  brand: 'MyWebsite',
  newAccount: true,
  password: Math.random().toString(36).substring(7),
}, {
  to: 'foo@bar.fr',
  attachments: [{ content: 'bar', filename: 'foo.txt' }],
})

/** A second email sent */
await mailer.send('ReminderEmail', {
  firstName: 'Mathieu',
  task: 'Write package documentation!',
}, {
  to: 'foo@bar.fr',
})
