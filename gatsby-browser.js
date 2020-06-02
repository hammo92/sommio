import React from 'react'
import { Elements } from 'react-stripe-elements'

import { BuiltonProvider } from './src/context'
import { StripeProvider } from 'react-stripe-elements'
import Layout from './src/components/Layout'
import { SiteProvider } from './src/context/SiteProvider'
import "firebase/auth"

export const wrapRootElement = ({ element }) => {
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

export const wrapPageElement = ({ element, props }) => {
  
}
