# Nodemailer React


This package aims to simplify the use of Nodemailer, along with React templating.

## Installation

```bash
yarn add nodemailer-react
```

This package has `nodemailer`, `react-dom` and `react` as Peer Dependencies,
so you'll need to install them if you don't already have them:

```bash
yarn add nodemailer react-dom react
```

## Usage

You can find a full example in the [example](./example) folder,
or see the [tests](./__tests__) to have more details.

### Configure your SMTP transport
An object that defines your connection data.
See https://nodemailer.com/smtp/#general-options for details.

```js
const transport = {
  host: 'smtp.example.com',
  secure: true,
  auth: { user: 'username', pass: 'password' },
}
```

### Configure your defaults
An object that is going to be merged into every message object.
This allows you to specify shared options, for example to set the same from address for every message.
See https://nodemailer.com/message/#common-fields

```js
const defaults = {
  from: "sender@server.com",
}
```

### Create Email Components
They are basically functions which can take an object of props in parameter and return an object with :
- The `subject` of the email, as string.
- The `body` of the email, as JSX (ReactElement).

The have the following type:
```ts
type Email = (props: object) => ({
  subject: string;
  body: ReactElement;
})
```

Example:

```jsx
export const WelcomeEmail = ({ firstName }) => ({
  subject: `👋 ${firstName}`,
  body: (
    <div>
      <p>Hello {firstName}!</p>
      <p>Hope you'll enjoy the package!</p>
    </div>
  )
})

export const PasswordEmail = /* ... */
export const ReminderEmail = /* ... */
```

### Instantiate the `Mailer` function.
It takes your `transport` and `defaults` configuration as the first parameter,
and a record of your emails components as the second.

```js
import { Mailer } from 'nodemailer-react'

export const mailer = Mailer(
  { transport, defaults },
  { WelcomeEmail, PasswordEmail, ReminderEmail }
)
```

_TIP: you can directly pass a transporter from nodemailer's `createTransport` method as first argument if you prefer._

_TIP 2: you can alias your emails easily : `{ welcome: WelcomeEmail, pwd: PasswordEmail, ... }`._

### Enjoy!
Send mails in your application, by passing:
- Your email template name: key of the email in the record you've provided to the Mailer.
- The props of your email component.
- The options of the email (to, from, attachments, etc.).
  See https://nodemailer.com/message/#common-fields

```js
mailer.send('WelcomeEmail', { firstName: 'Mathieu' }, {
  to: 'my@email.com'
})
```

### Typescript
Everything is fully typed, and you should have full autocompletion and type checking,
within the options, but also components and props attached to them in `send` method.

However, as Nodemailer does not publish its own types, be sure to install them from DefinitelyTyped repo:
```bash
yarn add -D @types/nodemailer
```

## License
This nodemailer-react package is an open-sourced software licensed under the MIT license.

## Contributing
Issues and PRs are obviously welcomed and encouraged, both for new features and documentation.
