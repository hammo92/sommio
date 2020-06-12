import React from 'react'
//import { Elements } from 'react-stripe-elements'

import { BuiltonProvider } from './src/context'
//import Layout from './src/components/Layout'
//import { StripeProvider } from 'react-stripe-elements'
import { SiteProvider } from './src/context/SiteProvider'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import "firebase/auth"
const stripePromise = loadStripe(process.env.GATSBY_BUILTON_STRIPE_KEY);

export const wrapRootElement = ({ element }) => {
  if (typeof window !== 'undefined') {
    return (
      <BuiltonProvider>
        <Elements stripe={stripePromise}>
          <SiteProvider>
            {element}
          </SiteProvider>
        </Elements>
      </BuiltonProvider>
    )
  }
  return null
}

export const wrapPageElement = ({ element, props }) => {
}

