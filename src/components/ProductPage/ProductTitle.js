import React from 'react'
import FlagIcon from '../../images/flag-of-europe.png'
import Head from '../AnimatedText/Head'

const ProductTitle = ({ title }) => {
  console.log("title => ",title)
  return (
    <div className="product-name">
      <Head head={title}></Head>
      <p className="ml-auto">
        Made in Europe
        <img src={FlagIcon} />
      </p>
    </div>
  )
}

export default ProductTitle
