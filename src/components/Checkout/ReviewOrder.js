import React, { useContext, useState } from 'react'
import { injectStripe } from 'react-stripe-elements'

import {
  ShippingAndUserDetailContext,
  CheckoutContext,
  CartContext
} from '../../context'
import CartItemList from '../CartItemList'
import Loader from '../Loader'
const RiviewOrder = ({ stripe, formEnable }) => {
  const { shipping_address, builton } = useContext(ShippingAndUserDetailContext)
  const { ProductsArray } = useContext(CartContext)
  const { createOrderBuilton, paymentBuilton } = useContext(CheckoutContext)
  const [checkoutError, setCheckoutError] = useState(null)
  console.log('[reviewOrder] builton => ', builton)

  const shipmentProductId =
    ProductsArray[0] && ProductsArray[0].shippingProductId

  let dataFrom = JSON.parse(sessionStorage.getItem('cartDetails'))

  let orderItems =
    dataFrom &&
    dataFrom.map(pro => {
      return {
        product: pro.main_product_id,
        quantity: pro.quantityBuilton,
        sub_products: [pro.coverId, pro.weightId]
      }
    })

  orderItems.push({
    product: shipmentProductId,
    quantity: 1
  })

  const [isLoading, setLoading] = useState(false)
  const handleOrder = async () => {
    setLoading(true)
    try {
      //Stripe token
      console.log('Before generating token ===>')
      console.log(
        'Before generating token shipping_address ===>',
        shipping_address,
        builton
      )

      const token = await stripe.createToken({
        name: `${shipping_address.first_name} ${shipping_address.last_name}`,
        address_line1: shipping_address.line_1,
        address_line2: shipping_address.line_2,
        address_city: shipping_address.city,
        address_state: shipping_address.county,
        address_zip: shipping_address.postcode,
        address_country: shipping_address.country
      })
      console.log('After generating token ===>', token, token.token.id)

      //creating payment

      const paymentMethod = await builton.paymentMethods.create({
        payment_method: 'stripe',
        token: token.token.id
      })

      //creating orders
      const createdOrder = await builton.orders.create({
        items: orderItems,
        delivery_address: {
          street_name: shipping_address.line_1,
          state: shipping_address.county,
          city: shipping_address.city,
          country: shipping_address.country,
          zip_code: shipping_address.postcode
        },
        payment_method: paymentMethod.id
      })
      console.log('After CreateOrder ===>', createdOrder)

      // dispatch method
      createOrderBuilton(createdOrder)

      // pay for the order
      const payBuilton = await builton.payments.pay(
        createdOrder.payments[0].$oid
      )

      //dispatch method
      paymentBuilton(payBuilton)

      setLoading(false)
    } catch (errors) {
      console.info('errors ====>', JSON.stringify(errors), errors)
      setCheckoutError(errors)
    }
  }

  return (
    <div className={`${!formEnable ? 'form-disable' : ''}`}>
      <h2 className="text-black font-medium leading-loose p-0 mb-3">
        <span>3</span>
        <span className="text">REVIEW ORDER</span>{' '}
      </h2>
      <CartItemList locked />
      <div className="submit_btn">
        {isLoading === true ? (
          <Loader />
        ) : (
          <button
            onClick={handleOrder}
            disabled={isLoading === true ? true : false}
          >
            COMPLETE ORDER
          </button>
        )}
      </div>
    </div>
  )
}

export default injectStripe(RiviewOrder)
