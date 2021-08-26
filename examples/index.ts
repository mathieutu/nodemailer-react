import { Mailer } from 'nodemailer-react'
import Password from './Password'

export default function sendEmail() {
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

  const emailsList = {
    pass: Password,
  }

  const mailer = Mailer(mailerConfig, emailsList)

  mailer.send('pass', {
    firstName: 'Mathieu',
    lastName: 'Tudisco',
    brand: 'Linkvalue',
    newAccount: true,
    password: Math.random().toString(36).substring(7),
  }, {
    to: 'foo@bar.fr',
    attachments: [{ content: 'bar', filename: 'foo.txt' }],
  })
}
