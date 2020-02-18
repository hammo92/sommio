import React, { useContext, useState } from 'react'
import { Link } from 'gatsby'
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link'
import { CartContext, TestCartContext } from '../context'
import CartItem from './CartItem'
import CartButton from './CartButton'
import { useStateValue } from '../context/SiteContext'

export default function CartItemList(props) {
  const TRANSITION_LENGTH = 0.5

  const exitTransition = {
    length: 0.8, // Take 1 seconds to leave
    trigger: () => {
      if (document) {
        handleToggle()
        // Preventing overflow here make the animation smoother IMO
        
      }
    },
  }

  const entryTransition = {
    delay: 0.8, // Wait 1 seconds before entering
    trigger: () => {
      if (document && window) {

      }
    },
  }
  const [{ cart }, dispatch] = useStateValue();
  const {
    isEmpty,
    removeFromCartBuilton,
    subTotalBuilton,
    price,
    isAddToCart
  } = useContext(CartContext)

  const {
    testIsEmpty,
    testCount,
    productSubTotal,
    total,
    shippingRate
  } = useContext(TestCartContext)

  console.log('CartItemList total => ', total)
  console.log('CartItemList shippingRate => ', shippingRate)
  const handleToggle = () => {
    dispatch({
      type: 'setCart',
      setCart: {drawer: false}
    })
  }

  if (testIsEmpty) return <p className="text-center">Your cart is empty</p>

  return (
    <div className="cartsliderbar-boby">
      <CartItem {...props} />

      {!testIsEmpty && props.cartButton ? (
        <div className="cartsliderbar-footer">
          <div className="total-list">
            <ul>
              <li>
                Subtotal(tax inc){' '}
                <span className="ml-auto">£ {productSubTotal}</span>
              </li>
              <li>
                Shipping{' '}
                <span className="ml-auto">
                  {shippingRate ? `£ ${shippingRate}` : 'Free'}
                </span>
              </li>
              <li>
                Total <span className="ml-auto">£ {total} </span>
              </li>
            </ul>
          </div>
          <TransitionLink 
            
            to="/checkout"
            exit={exitTransition}
            entry={entryTransition}
            className="btn btn-info rounded-0 justify-content-center py-4 mx-2"
          >
            Checkout
          </TransitionLink>
        </div>
      ) : (
        <div className="checkout-footer">
          <div className="total-list">
            <ul>
              <li>
                Subtotal(tax inc){' '}
                <span className="ml-auto">£{productSubTotal} </span>
              </li>
              <li>
                Shipping{' '}
                <span className="ml-auto">
                  {shippingRate ? `£ ${shippingRate}` : 'Free'}
                </span>
              </li>
              <li>
                Total <span className="ml-auto">£{total} </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
