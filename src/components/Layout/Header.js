import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import axios from 'axios'
import { navigate } from 'gatsby'
import Builton from '@builton/core-sdk'
import {
  ShippingAndUserDetailContext,
  CheckoutContext,
  FirebaseContext,
  CartContext
} from '../../context'
import { useSpring, animated, config } from 'react-spring'
import { useStateValue } from '../../context/SiteContext'
import CartIcon from '../../images/shopping-basket-duotone.svg'
import Logo from '../../images/logo.png'
import logoCheckout from '../../images/logo-checkout.png'
import CartButton from '../CartButton'
import RegisterOrLogin from '../../components/Checkout/RegisterOrLogin'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalBody from 'react-bootstrap/ModalBody'
import { getFirebase } from '../../firebase/index'
import { newFirebaseToken } from '../../utils/newFirebaseToken'

import firebase from "gatsby-plugin-firebase"
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = (
  { siteTitle, collections, slug, human_id, transitionStatus },
  props
) => {
  const [{ cart }, dispatch] = useStateValue()
  const { orderId } = useContext(CheckoutContext)
  const { setUserBuilton } = useContext(ShippingAndUserDetailContext)
  const { fetchCartDataFromStorage, count, isEmpty } = useContext(CartContext)
  const { setFirebase, firebase } = useContext(FirebaseContext)
  const [refresh, setRefresh] = useState(false)
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

  let newToken = newFirebaseToken()
  
  /* show or hide cart drawer */
  const handleCart = () => {
    dispatch({
      type: 'setCart',
      setCart: { drawer: true }
    })
  }
  /****************************/

  useEffect(() => {
    const lazyApp = import('firebase')
    lazyApp.then(firebaseObj => {
      const firebase = getFirebase(firebaseObj)

      setFirebase(firebase)
      if (firebase && firebase.auth().currentUser) {
        setModal(false)
      }
      !(firebase && firebase.auth().currentUser)
        ? setTimeout(() => setRefresh(true), 1000)
        : setRefresh(true)
    })

    let dataFromStorage = sessionStorage.getItem('cartDetails')
    let cartData = JSON.parse(dataFromStorage)

    if (cartData) {
      fetchCartDataFromStorage(cartData)
    }
    var builton = new Builton({
      apiKey: process.env.GATSBY_BUILTON_API_KEY,
      bearerToken: token !== null ? token : newToken
    })
    setUserBuilton(details && details.email, builton)
  }, [])

  const handleLogout = () => {
    firebase &&
      firebase
        .auth()
        .signOut()
        .then(res => {
          navigate(`/`)
          localStorage.removeItem('firebaseToken')
          localStorage.removeItem('details')
        })
        .catch(err => {
          console.log('err Logout => ', err)
          return err
        })
  }

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
              <svg
                className="StyledBackArrow-amagyn-6 fIdZUy"
                width="6px"
                height="10px"
                viewBox="0 0 6 10"
                version="1.1"
                aria-labelledby="back-arrow-title"
              >
                <title id="back-arrow-title">Back arrow</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g
                  id="Cart/Checkout/Errors-desktop"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Checkout/Shipping-filled-desktop"
                    transform="translate(-44.000000, -33.000000)"
                    fill="#763679"
                  >
                    <path
                      d="M46.1182432,37.9529268 L50.01,41.84547 L48.949,42.90547 L44,37.95547 L44.0032515,37.9522215 L44.0001,37.94907 L48.9491,33.00007 L50.0101,34.06107 L46.1182432,37.9529268 Z"
                      id="backarrow"
                    ></path>
                  </g>
                </g>
              </svg>
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
              <Link className="navbar-brand" to="/">
                <img src={Logo} className="logofull" />
                <img src={logoCheckout} className="logosymbol" />
              </Link>
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
                  <li className="nav-item nav-account">
                    {refresh && firebase && firebase.auth().currentUser ? (
                      <DropdownButton
                        title={
                          firebase &&
                          firebase.auth() &&
                          firebase.auth().currentUser &&
                          firebase.auth().currentUser.email
                        }
                        id={'accountDropdown'}
                      >
                        <Dropdown.Item href="/myAccount">
                          My Orders
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                          Log Out
                        </Dropdown.Item>
                      </DropdownButton>
                    ) : (
                      <div>
                        <button onClick={toggleModal}>My Account</button>
                      </div>
                    )}
                  </li>
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
          <Modal
            show={modal}
            toggle={toggleModal}
            className="Login-modal"
            onHide={toggleModal}
          >
            <ModalHeader toggle={toggleModal} closeButton>
              User Account
            </ModalHeader>
            <ModalBody>
              <RegisterOrLogin
                isModal={true}
                toggleModal={toggleModal}
                setDropdownOpen={setDropdownOpen}
              />
            </ModalBody>
          </Modal>
        </header>
      )}
    </animated.div>
  )
}

export default Header
