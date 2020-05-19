import React from 'react'
import FlagIcon from '../../images/flag-of-europe.png'
import AniText from '../AnimatedText/AniText'

const ProductTitle = ({ title }) => {
  return (
    <div className="product-name">
      <AniText type={"h3"} head={title}></AniText>
      {/*<p className="ml-auto">
        Made in Europe
        <img src={FlagIcon} />
      </p>*/}
    </div>
  )
}

export default ProductTitle
