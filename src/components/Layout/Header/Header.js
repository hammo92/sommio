import React, { useContext, useState } from 'react'
import { Link } from 'gatsby'
import {
  CheckoutContext,
} from '../../../context'
import { useSpring, animated, config } from 'react-spring'
import logoCheckout from '../../../images/logo-checkout.png'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons'
import Logo from './Logo'
import MainNav from './NavSection/MainNav'
import CartButton from './NavSection/CartButton'

const Header = (
  { siteTitle, human_id, transitionStatus },
  props
) => {
  const { orderId } = useContext(CheckoutContext)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(true)
  let mount = ['entering', 'entered'].includes(transitionStatus)
  
  const slide = useSpring({
    to: {
      opacity: mount ? 1 : 0,
      transform: mount ? 'translateY(0px)' : `translateY(-100%)`
    }
  })

  return (
    <animated.div className="header-wrap" style={slide}>
      {window.location.pathname === '/checkout' ? (
        <header className="header-checkout">
          {!orderId ? (
            <Link className="backcart-btn" to={`/products/${human_id}`}>
              <FontAwesomeIcon icon={faChevronLeft} />
              Back to Cart
            </Link>
          ) : (
            ''
          )}
          <Link to="/" className="mx-auto flex items-center logo">
            <img src={logoCheckout} title={siteTitle} alt={siteTitle} />
          </Link>
        </header>
      ) : (
        <header>
          <div className="container-fluid">
            <div className="navbar navbar-expand-lg">
              <Logo />
              <MainNav />
              <CartButton />
            </div>
          </div>
          
        </header>
      )}
    </animated.div>
  )
}

export default Header
