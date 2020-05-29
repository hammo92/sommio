import React, { useContext, useState } from 'react'
import { injectStripe } from 'react-stripe-elements'
import axios from 'axios'
import {
  ShippingAndUserDetailContext,
  CheckoutContext,
  CartContext
} from '../../context'
import CartItemList from '../CartItemList'
import Loader from '../Loader'
import { newFirebaseToken } from '../../utils/newFirebaseToken'
import _sumBy from 'lodash/sumBy'
import { navigate } from '@reach/router'

const RiviewOrder = ({ stripe, formEnable, paymentMethod, paymentOption }) => {
  const { shipping_address, builton, note, user } = useContext(
    ShippingAndUserDetailContext
  )
  const { ProductsArray } = useContext(CartContext)
  const { createOrderBuilton, paymentBuilton } = useContext(CheckoutContext)
  const [checkoutError, setCheckoutError] = useState(null)

  const shipmentProductId =
    ProductsArray[0] && ProductsArray[0].shippingProductId

  let dataFrom = JSON.parse(sessionStorage.getItem('cartDetails'))
  // let details = JSON.parse(localStorage.getItem('details'))

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
  let payBuilton

  const handleOrder = async () => {
    setLoading(true)
    var authToken = await newFirebaseToken()

    try {
      //Stripe token
      // console.log('Before generating token ===>')
      // console.log(
      //   'Before generating token shipping_address ===>',
      //   shipping_address,
      //   builton
      // )

      const token = await stripe.createToken({
        name: `${shipping_address.first_name} ${shipping_address.last_name}`,
        address_line1: shipping_address.line_1,
        address_line2: shipping_address.line_2,
        address_city: shipping_address.city,
        address_state: shipping_address.county,
        address_zip: shipping_address.postcode,
        address_country: shipping_address.country
      })

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
        payment_method: paymentMethod.id,
        note: note
      })

      // dispatch method
      createOrderBuilton(createdOrder)

      // pay for the order
      // const payBuilton = await builton.payments.pay(
      //   createdOrder.payments[0].$oid
      // )
      payBuilton = await axios
        .post(
          `https://api.builton.dev/payments`,
          {
            orders: [createdOrder.id],
            payment_method: paymentMethod.id
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'X-Builton-Api-Key': process.env.GATSBY_BUILTON_API_KEY,
              'Content-Type': 'application/json'
            }
          }
        )
        .catch(error => {
          return error
        })
      //dispatch method
      paymentBuilton(payBuilton)

      setLoading(false)
    } catch (errors) {
      setCheckoutError(errors)
    }
  }

  const handleKlarnaOrder = async () => {
    try {
      let klarnaItems = dataFrom.map(item => {
        return {
          type: 'sku',
          description: `${item.description} - ${item.weightName}`,
          quantity: item.quantityBuilton,
          currency: item.currency,
          amount: parseInt(item.quantityBuilton) * parseInt(item.final_price)
        }
      })
      klarnaItems.push({
        type: 'tax',
        description: 'Taxes',
        currency: 'gbp',
        amount: 0
      })
      klarnaItems.push({
        type: 'shipping',
        description: 'Free Shipping',
        currency: 'gbp',
        amount: 0
      })
      console.info('--------------------------')
      console.info('klarnaItems =>', klarnaItems)
      console.info('--------------------------')
      stripe
        .createSource({
          type: 'klarna',
          amount: _sumBy(klarnaItems, 'amount'),
          currency: 'gbp',
          klarna: {
            product: 'payment',
            purchase_country: 'GB',
            custom_payment_methods: 'payin4,installments',
            first_name: shipping_address.first_name,
            last_name: shipping_address.last_name
          },
          owner: {
            email: user,
            name: `${shipping_address.first_name} ${shipping_address.last_name}`,
            address: {
              line1: shipping_address.line_1,
              line2: shipping_address.line_2,
              city: shipping_address.city,
              state: shipping_address.county,
              postal_code: shipping_address.postcode,
              country: 'UK'
            }
          },
          source_order: {
            items: [...klarnaItems]
          },
          flow: 'redirect',
          redirect: {
            return_url: 'http://localhost:8000/checkout'
          }
        })
        .then(result => {
          console.info('--------------------------')
          console.info('klarna result =>', result)
          console.info('--------------------------')
          navigate(result.source.klarna[paymentOption + '_redirect_url'])
        })
    } catch (err) {
      console.info('--------------------------')
      console.info('err =>', err)
      console.info('--------------------------')
    }
  }

  return (
    <>
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
              onClick={
                paymentMethod === 'stripe' ? handleOrder : handleKlarnaOrder
              }
              disabled={isLoading === true || payBuilton ? true : false}
            >
              COMPLETE ORDER
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default injectStripe(RiviewOrder)
