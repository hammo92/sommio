import React from 'react'
import { Elements } from 'react-stripe-elements'

import { BuiltonProvider } from './src/context'
import Layout from './src/components/Layout'
import { StripeProvider } from 'react-stripe-elements'
import { SiteProvider } from './src/context/SiteProvider'
import "firebase/auth"

export const wrapRootElement = ({ element }) => {
  if (typeof window !== 'undefined') {
    return (
      <StripeProvider apiKey={process.env.GATSBY_BUILTON_STRIPE_KEY}>
      <BuiltonProvider>
        <Elements>
          <SiteProvider>
            {element}
          </SiteProvider>
        </Elements>
      </BuiltonProvider>
    </StripeProvider>
    )
  }
  return null
}

export const wrapPageElement = ({ element, props }) => {
}
