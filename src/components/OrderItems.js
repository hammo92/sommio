import React, { useContext } from 'react'
import { CartContext, CheckoutContext, TestCartContext } from '../context'
import CartItem from './CartItem'
import Photo from './Photo'
const OrderItems = props => {
  const { orderCartItems, isAddToCart, Size } = useContext(CartContext)
  const { orderPrice, totalProductQuantity } = useContext(CheckoutContext)
  const {
    productSubTotal,
    total,
    shippingRate,
    testProductsArray
  } = useContext(TestCartContext)

  return (
    <div>
      <div>
        {testProductsArray &&
          testProductsArray.map(p => {
            return (
              <>
                <Photo cartImg="cartImg" src="#" alt={p.name} />
                <div className="content">
                  <h4>Product Name : {p.name}</h4>
                  <ul>
                    <li>Size: {Size}</li>
                    <li>Weight: {p.weightName}</li>
                    <li>Cover: {p.coverName}</li>
                    <li>Quantity: {p.quantityBuilton}</li>
                  </ul>
                </div>
              </>
            )
          })}
      </div>
      <div className="border-grey-light pt-2 md:pt-4 lg:pt-6 w-full ">
        <div className="total-page">
          <h4 className="text-grey">Total Quanity</h4>
          <h4>{totalProductQuantity}</h4>
        </div>
      </div>

      <div className="border-grey-light pt-2 md:pt-4 lg:pt-6 w-full text-right">
        <div className="total-page">
          <h4 className="text-grey">Subtotal</h4>
          <div>£ {productSubTotal}</div>
        </div>
        <div className="total-page">
          <h4 className="text-grey">Shipping Cost</h4>
          <h4>£ {shippingRate} </h4>
        </div>
        <hr></hr>
        <div className="total-page text-black">
          <h4 className="text-grey">Total</h4>
          <h4>£ {orderPrice} </h4>
        </div>
      </div>
    </div>
  )
}

export default OrderItems
