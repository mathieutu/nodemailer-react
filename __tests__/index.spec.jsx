import React from 'react'
import { createTransport } from 'nodemailer'
import mailerFactory, { Mailer } from '../src'


const emailsList = {
  foo: ({ name }) => ({
    subject: `👋 ${name}!`,
    body: (
      <div>
        <p>Hi {name}!</p>
        <p>Here's your email!</p>
      </div>
    ),
    text: `Hi ${name}! Here's your email!`
  }),
}

describe('nodemailer-react', () => {
  it('sends an email with jsx transpiled', async () => {
    const mailer = Mailer({
      transport: { jsonTransport: true },
    }, emailsList)

    const { message } = await mailer.send(
      'foo',
      { name: 'Mathieu' },
      { to: 'foo@bar' },
    )

    expect(JSON.parse(message)).toMatchObject({
      to: [{ address: 'foo@bar', name: '' }],
      subject: '👋 Mathieu!',
      html: '<!DOCTYPE html><div><p>Hi Mathieu!</p><p>Here&#x27;s your email!</p></div>',
      text: 'Hi Mathieu! Here\'s your email!'
    })
  })

  it('allows directly a transport object', async () => {
    const transport = createTransport({ jsonTransport: true }, { from: 'my@email.com' })

    const mailer = Mailer({ transport }, emailsList)

    const { message } = await mailer.send(
      'foo',
      { name: 'Mathieu' },
      { to: 'foo@bar' },
    )


    expect(JSON.parse(message)).toMatchObject({
      to: [{ address: 'foo@bar', name: '' }],
      from: { address: 'my@email.com', name: '' },
      subject: '👋 Mathieu!',
      html: '<!DOCTYPE html><div><p>Hi Mathieu!</p><p>Here&#x27;s your email!</p></div>',
      text: 'Hi Mathieu! Here\'s your email!'
    })
  })

  it('exports default the same Mailer', () => {
    expect(mailerFactory).toBe(Mailer)
  })
})
