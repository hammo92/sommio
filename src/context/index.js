import React, { createContext } from 'react'

import {
  ShippingAndUserDetailProvider,
  ShippingAndUserDetailContext
} from './ShippingAndUserDetailContext'

import { CheckoutProvider, CheckoutContext } from './CheckoutContext'
//import { FirebaseProvider, FirebaseContext } from './FirebaseContext'
import { CartProvider, CartContext } from './CartContext'

let BuiltonContext

const { Provider, Consumer } = (BuiltonContext = createContext())

function BuiltonProvider({ children, ...props }) {
  return (
    <Provider
      value={{
        ...props
      }}
    >
        <CartProvider>
          <ShippingAndUserDetailProvider>
            <CheckoutProvider>{children}</CheckoutProvider>
          </ShippingAndUserDetailProvider>
        </CartProvider>
    </Provider>
  )
}

export {
  BuiltonProvider,
  Consumer as BuiltonConsumer,
  BuiltonContext,
  ShippingAndUserDetailContext,
  CheckoutContext,
  CartContext
}
