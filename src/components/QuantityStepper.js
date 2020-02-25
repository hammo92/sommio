import React, { useContext } from 'react'
import _ from 'lodash'

import { CartContext } from '../context/CartContext'

export default function QuantityStepper({ product }) {
  const { update_cart } = useContext(CartContext)

  const increase = () => update_cart(product, 1)
  const decrease = () => update_cart(product, 0)

  return (
    <span className="flex justify-between items-center qty-boxs">
      <button
        onClick={increase}
        className="appearance-none focus:outline-none minus-icon"
      ></button>

      <span className="quantity-text">{product.quantityBuilton}</span>
      {product.quantityBuilton !== 1 && (
        <button
          onClick={decrease}
          className="appearance-none focus:outline-none plus-icon"
        ></button>
      )}
    </span>
  )
}
