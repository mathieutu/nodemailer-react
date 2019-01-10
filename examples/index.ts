import { Mailer } from 'nodemailer-react'
import Password from './Password'

import { Mailer as MailerTS } from '../dist'

const mailerConfig = {
  from: {
    name: 'mathieutu',
    email: 'dev@mathieutu.ovh',
  },
  transport: {
    host: 'smtp.example.com',
    secure: true,
    auth: {
      user: 'username',
      pass: 'password',
    },
  },
}

const emailsList = {
  pass: Password,
}

const mailer = new Mailer(mailerConfig, emailsList)

mailer.send('pass', {}, {
  to: 'foo@bar.fr',
  attachments: [{ content: 'bar', filename: 'foo.txt' }],
})

const mailerTS = MailerTS(mailerConfig, emailsList)

mailerTS.send('pass1', { firstName: '', }, {
  to: 'foo@bar.fr',
  attachments: [{ content: 'bar', filename: 'foo.txt' }],
})
