import { Email } from '../src'

type PasswordProps = {
  firstName: string,
  newAccount: boolean,
  password: string,
  brand: string,
}

export const PasswordEmail: Email<PasswordProps> = ({ firstName, password, newAccount, brand }) => ({
  subject: newAccount ? `Welcome to ${brand}!` : `Your new ${brand} password.`,
  body: (
    <body>
      <h1>Hello {firstName},</h1>
      <p>Your password is:</p>
      <p>{password}</p>
    </body>
  ),
})
