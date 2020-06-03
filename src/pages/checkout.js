import React, { useState, useContext, useEffect, useRef } from 'react'
import { CheckoutContext, CartContext } from '../context'
import ShippingAddress from '../components/Checkout/shippingAddress'
import PaymentPage from '../components/Checkout/paymentPage'
import ReviewOrder from '../components/Checkout/ReviewOrder'
import OrderConfirmation from '../components/Checkout/OrderConfirmation'
import Layout from '../components/Layout/Layout'
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link'
import firebase from "gatsby-plugin-firebase"

const CheckoutInner = () => {
  const { isEmpty } = useContext(CartContext)

  const { defaultPayment, checkoutClear } = useContext(CheckoutContext)
  const [formEnable, setFormEnable] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [gmapsLoaded, setGmapsLoaded] = useState(false)

  const isMounted = useRef(true)
  const initMap = () => {
    setGmapsLoaded(true)
  }
  useEffect(() => {
    let element = document.getElementsByTagName('body')[0]
    if (isMounted) {
      element.classList.add('so-checkout-page')
      isMounted.current = false
    }
    window.initMap = initMap
    const gmapScriptEl = document.createElement(`script`)
    gmapScriptEl.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCLzic4qigzdlIc_OV71Czc6a-5uc8SyKA&libraries=places&callback=initMap`
    document
      .querySelector(`body`)
      .insertAdjacentElement(`beforeend`, gmapScriptEl)
    return () => {
      element.classList.remove('so-checkout-page')
      checkoutClear()
    }
  }, [])

  const changeFormEnable = () => {
    setFormEnable(!formEnable)
  }

  if (defaultPayment && defaultPayment === true) return <OrderConfirmation />
  if (isEmpty && !defaultPayment)
    return <p className="text-center">Your cart is empty</p>

  return (
    <div className="flex flex-wrap lg:-mx-4">
      <div className="custom_cart">
        <div className={'cart_first' + (!isEditable ? ' purple' : ' ')}>
          <ShippingAddress
            gmapsLoaded={gmapsLoaded}
            isCompleted={isEditable}
            toggleEditable={status => setIsEditable(status)}
          />
        </div>
        <div
          className={
            'cart_second' + (isEditable && !formEnable ? ' purple' : ' ')
          }
        >
          <h2 className="text-black font-medium leading-loose p-0 mb-3">
            <span>2</span>
            <span className="text">PAYMENT INFORMATION</span>{' '}
          </h2>
          <PaymentPage
            changeFormEnable={status => setFormEnable(status)}
            isEditable={isEditable}
          />
        </div>
        <div className={'cart_third' + (formEnable ? ' purple' : ' ')}>
          <ReviewOrder formEnable={formEnable} />
        </div>
      </div>
    </div>
  )
}
const CheckoutPage = () => {
  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <Layout transitionStatus={transitionStatus}>
          <CheckoutInner transitionStatus={transitionStatus} />
        </Layout>
      )}
    </TransitionState>
  )
}
export default CheckoutPage
