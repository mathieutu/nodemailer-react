# Nodemailer React

## Abstract

This package aims to simplify the use of Nodemailer, along with React templating. 

## Installation

```bash
yarn add nodemailer-react
```

This package need `react-dom` and `nodemailer` to work. You will also need `react` for your email templates.  

## Usage

**You can find a full example in [example](https://github.com/mathieutu/nodemailer-react/tree/master/example) folder**

You can instantiate and send emails by doing:
```js
    import { Mailer } from 'nodemailer-react'

    const mailer = Mailer(mailerConfig, emailsList)
  
    mailer.send(templateName, props, nodeMailerMessage)
```

The Mailer Config is an object with 2 keys, typed according to:

```typescript
{
    transport: NodeMailer SMTP Transport Options
    defaults: Optional NodeMailer Message Options
}
```

You can find more information about those in the nodemailer doc: 
- [NodeMailer SMTP Transport Options](https://nodemailer.com/smtp/)
- [NodeMailer Message Options](https://nodemailer.com/message/)


The Emails List is a mapping object. Each key is the template name, and each value is an Email function.
The Email function take the props as parameter, and return an object with a `string` subject and a `ReactElement` body.
 
```typescript
type EmailsList = {
    [name: string]: Email;
};

type Email = (props) => {
    subject: string;
    body: ReactElement;
};
```

_This explanation seems to be laborious to understand (mostly because of my English, I'm sorry about that), 
but the package is very easy to use, and [a full and simple example is present](https://github.com/mathieutu/nodemailer-react/tree/master/example)._

_Please feel free to make some issue or PR to improve it!_

## License

This Nodemailer package is an open-sourced software licensed under the MIT license.

## Contributing

Issues and PRs are obviously welcomed and encouraged, as well for new features than documentation.
