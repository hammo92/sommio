import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import {
  ShippingAndUserDetailContext,
  CheckoutContext,
  CartContext
} from '../../../context'
import { useSpring, animated, config } from 'react-spring'
import { useStateValue } from '../../../context/SiteContext'
import CartIcon from '../../../images/shopping-basket-duotone.svg'
//import Logo from '../../../images/logo.png'
import logoCheckout from '../../../images/logo-checkout.png'
import RegisterOrLogin from '../../Checkout/RegisterOrLogin'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons'
import Logo from './Logo'
import AccountItem from './AccountItem'

const Header = (
  { siteTitle, collections, slug, human_id, transitionStatus },
  props
) => {
  const [{ cart }, dispatch] = useStateValue()
  const { orderId } = useContext(CheckoutContext)
  const { fetchCartDataFromStorage, count, isEmpty } = useContext(CartContext)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [modal, setModal] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const toggleModal = () => setModal(!modal)
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen)
  const [collapsed, setCollapsed] = useState(true)
  let token = localStorage.getItem('firebaseToken')
  let details = JSON.parse(localStorage.getItem('details'))
  let mount = ['entering', 'entered'].includes(transitionStatus)
  
  const slide = useSpring({
    to: {
      opacity: mount ? 1 : 0,
      transform: mount ? 'translateY(0px)' : `translateY(-100%)`
    }
  })



  
  
  /* show or hide cart drawer */
  const handleCart = () => {
    dispatch({
      type: 'setCart',
      setCart: { drawer: true }
    })
  }
  /****************************/

  

  

  const toggleNavbar = () => {
    setCollapsed(!collapsed)
  }
  const classOne = collapsed
    ? 'collapse navbar-collapse'
    : 'collapse navbar-collapse show'

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
              <button
                onClick={toggleNavbar}
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              ></button>
              <Logo />
              <div className={`${classOne}`} id="navbarSupportedContent">
                <ul className="navbar-nav ml-md-auto menu-list">
                  <li className="nav-item">
                    <Link to="/products/DEWR3J">Shop</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/learn">Learn</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contact">Contact us</Link>
                  </li>
                  <AccountItem />
                </ul>
              </div>
              <ul className="navbar-nav cart-boxs">
                <li className="nav-item">
                  <button onClick={handleCart}>
                    <img src={CartIcon} />
                    <span className="count-number">
                      {isEmpty && count === 0 ? 0 : count}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
        </header>
      )}
    </animated.div>
  )
}

export default Header
