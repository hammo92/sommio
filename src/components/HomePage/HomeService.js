import React from 'react'
import NightIcon from '../../images/moon-stars-duotone-home.svg'
import WarantyIcon from '../../images/badge-check-duotone-home.svg'
// import DeliveryIcon from '../../images/truck-duotone.svg'
import DeliveryIcon from '../../images/truck-duotone-home.svg'
import {useSpring, animated} from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoonCloud } from '@fortawesome/pro-solid-svg-icons'
import { faCertificate , faTruck } from '@fortawesome/free-solid-svg-icons'

const config = { mass: 1, tension: 500, friction: 100 }
const HomeService = () => {
  const props = useSpring({ 
    config,
    from:{opacity: 0, transform: 'translateX(100%)'},
    to:{opacity: 1, transform: 'translateX(0%)'}   
  })
  return (
    <animated.div style={props} className="home-service">
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
export default HomeService
