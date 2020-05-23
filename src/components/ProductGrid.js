import React from 'react'

import Product from './Product'

export default function ProductGrid({ products }) {
  return <div className="flex flex-wrap -mx-5">{products.map(Product)}</div>
}
