import React from 'react'
import { Elements } from 'react-stripe-elements'

import { BuiltonProvider } from './src/context'
import Layout from './src/components/Layout'
import { StripeProvider } from 'react-stripe-elements'

export const wrapRootElement = ({ element }) => {
  return (
    <StripeProvider apiKey={process.env.GATSBY_BUILTON_STRIPE_KEY}>
      <BuiltonProvider>
        <Elements>{element}</Elements>
      </BuiltonProvider>
    </StripeProvider>
  )
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
