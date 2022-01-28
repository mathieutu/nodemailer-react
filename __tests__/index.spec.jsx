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
  }),

  textDisabled: ({ name }) => ({
    subject: `👋 ${name}!`,
    body: (
      <div>
        <p>Hi {name}!</p>
        <p>Here's your email!</p>
      </div>
    ),
    text: undefined,
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
    })
  })

  it('generates an alternative text automatically', async () => {
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
      text: "Hi Mathieu!Here's your email!",
    })
  })

  it('allows to disable automatic text generation', async () => {
    const mailer = Mailer({
      transport: { jsonTransport: true },
    }, emailsList)

    const { message } = await mailer.send(
      'textDisabled',
      { name: 'Mathieu' },
      { to: 'foo@bar' },
    )

    expect('text' in JSON.parse(message)).toBe(false)
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
    })
  })

  it('exports default the same Mailer', () => {
    expect(mailerFactory).toBe(Mailer)
  })
})
