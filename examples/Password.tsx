import * as React from 'react'
import { Email } from '../src'
import Layout from './Layout'

type InvoicesProps = {
    firstName: string,
    lastName: string,
    newAccount: boolean,
    password: string,
    brand: string
}

const Password: Email<InvoicesProps> = ({ firstName, lastName, password, newAccount, brand }) => ({
    subject: newAccount ?  `Welcome to ${brand}!` : `Your new ${brand} password.`,
    body: (
        <Layout title={firstName + ' ' + lastName}>
            <div>
                <p>Your password is:</p>
                <p>{password}</p>
            </div>
        </Layout>
    ),
})

export default Password
