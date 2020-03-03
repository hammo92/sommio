import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMoonCloud} from '@fortawesome/pro-solid-svg-icons'
import { faCertificate, faTruck } from '@fortawesome/free-solid-svg-icons'
import {
  useSpring,
  animated
} from 'react-spring'

const config = {
  mass: 1,
  tension: 500,
  friction: 100
}

const ProductService = () => {
  const props = useSpring({ 
    config,
    from:{opacity: 0},
    to:{opacity: 1}   
  })
  return (
    <animated.div style={props} className="product-service">
      <div className="service-boxs">
        <FontAwesomeIcon icon={faMoonCloud} />
        <p> 100 Night Trial</p>
      </div>
      <div className="service-boxs">
        <FontAwesomeIcon icon={faCertificate} />
        <p>1 Year Waranty</p>
      </div>
      <div className="service-boxs">
        <FontAwesomeIcon icon={faTruck} />
        <p>Free Delivery</p>
      </div>     
    </animated.div>
  )
}
export default ProductService
