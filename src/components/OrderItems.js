import React, { useContext } from 'react'
import { CartContext, CheckoutContext } from '../context'
import CartItem from './CartItem'
const OrderItems = props => {
  const { orderCartItems, removeFromCart, shippingRate } = useContext(
    CartContext
  )
  const { orderPrice } = useContext(CheckoutContext)
  console.log('orderCartItems => ', orderCartItems)

  return (
    <div>
      <div>
        {orderCartItems &&
          orderCartItems.map(item => {
            console.log('item => ', item)
            return (
              <div>
                <CartItem
                  key={item.id}
                  removeFromCart={removeFromCart}
                  {...item}
                  {...props}
                />
                <div className="border-grey-light pt-2 md:pt-4 lg:pt-6 w-full ">
                  <div className="total-page">
                    <h4 className="text-grey">Quanity </h4>
                    <h4>{item.quantityBuilton}</h4>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
      <div className="border-grey-light pt-2 md:pt-4 lg:pt-6 w-full text-right">
        <div className="total-page">
          <h4 className="text-grey">Subtotal</h4>
          <div>£ {orderPrice}</div>
        </div>
        <div className="total-page">
          <h4 className="text-grey">Shipping Cost</h4>
          <h4>£ {shippingRate}</h4>
        </div>
        <hr></hr>
        <div className="total-page text-black">
          <h4 className="text-grey ">Total</h4>
          <h4>£ {orderPrice + shippingRate}</h4>
        </div>
      </div>
    </div>
  )
}

export default OrderItems
