import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Link, useStaticQuery } from 'gatsby'
import { navigate } from 'gatsby'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  CheckoutContext,
  FirebaseContext,
  ShippingAndUserDetailContext
} from '../context/index'
import Loader from '../components/Loader'
import { newFirebaseToken } from '../utils/newFirebaseToken'
import Photo from '../components/Photo'
import Layout from '../components/Layout/Layout'
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link'

import {
  faBook,
  faReceipt,
  faCheck,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons'
import Button from '../components/Button'

const MyAccountInner = () => {
  const { userOrderData, userOrder } = useContext(CheckoutContext)
  const { firebase } = useContext(FirebaseContext)
  const { builton } = useContext(ShippingAndUserDetailContext)

  const [isLoading, setLoading] = useState(false)
  const [textAreaDisable, setTextAreaDisable] = useState(true)
  const url = 'https://api.builton.dev/orders'
  const getUserDetailUrl = 'https://api.builton.dev/users/me'
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [finalAddress, setFinalAddress] = useState(null)
  const [error, setError] = useState('')
  const [index, setIndex] = useState('')

  const { allBuiltonProduct } = useStaticQuery(graphql`
    query {
      allBuiltonProduct {
        nodes {
          name
          _sub_products {
            _oid
          }
          parents {
            _oid
          }
          _id {
            _oid
          }
          tags
        }
      }
    }
  `)
  const fetchOrder = async () => {
    var token = await newFirebaseToken()

    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Builton-Api-Key': process.env.GATSBY_BUILTON_API_KEY,
          'Content-Type': 'application/json'
        }
      })
      .then(async res => {
        userOrderData(res.data)

        await axios
          .get(getUserDetailUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              'X-Builton-Api-Key': process.env.GATSBY_BUILTON_API_KEY,
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            console.log('USER r => ', response)
            setFinalAddress(response.data.addresses)
          })
          .catch(err => {
            console.log('USER err => ', err, err.response)
            if (err.response.status === 401) {
              firebase &&
                firebase
                  .auth()
                  .signOut()
                  .then(res => {
                    console.log('res => ', res)
                    navigate(`/`)
                    localStorage.removeItem('firebaseToken')
                    localStorage.removeItem('details')
                    toast('Please Login again!!', {
                      position: toast.POSITION.TOP_RIGHT,
                      className: 'custom_toast'
                    })
                  })
                  .catch(err => {
                    return err
                  })
            }
          })
      })
      .catch(err => {
        console.log('err => ', err, err.code)
        if (err.response.status === 401) {
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
                return err
              })
        }
      })

    setLoading(false)
  }
  useEffect(() => {
    setLoading(true)

    fetchOrder()
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchOrder()
  }, [firebase && firebase.auth().currentUser])

  const resetPasswordData = () => {
    setNewPassword('')
    setConfirmPassword('')
    setError('')
  }

  const updatePassword = () => {
    setLoading(true)

    firebase &&
      firebase
        .auth()
        .currentUser.updatePassword(confirmPassword)
        .then(() => {
          setLoading(false)
          toast('Password is Updated !', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'custom_toast'
          })
          resetPasswordData()
        })
        .catch(error => {
          console.log('error => ', error)

          firebase &&
            firebase
              .auth()
              .signOut()
              .then(res => {
                toast('For updating password need to login again !', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: 'custom_toast'
                })
                navigate(`/`)
                localStorage.removeItem('firebaseToken')
                localStorage.removeItem('details')
              })
              .catch(err => {
                return err
              })
          resetPasswordData()
        })
  }

  const checkValidationAddress = () => {
    const errors = {}
    let formIsValid = true

    if (!address.street_name) {
      formIsValid = false
      errors.street_name = 'Required'
    }
    if (!address.city) {
      formIsValid = false
      errors.city = 'Required'
    }
    if (!address.state) {
      formIsValid = false
      errors.state = 'Required'
    }
    if (!address.zip_code) {
      formIsValid = false
      errors.zip_code = 'Required'
    }
    if (!address.country) {
      formIsValid = false
      errors.country = 'Required'
    }
    setError(errors)
    return formIsValid
  }
  console.log('newPassword,confirmPassword => ', newPassword, confirmPassword)
  let _errors = {}

  const handleChangeNewPassword = e => {
    if (e.target.name === 'newPassword') {
      setNewPassword(e.target.value)
      if (!e.target.value) {
        _errors.newPassword = 'Required'
      }
    }
    setError(_errors)
  }
  const handleChangeConfirmPassword = e => {
    if (e.target.name === 'confirmPassword') {
      setConfirmPassword(e.target.value)
      if (!e.target.value) {
        _errors.confirmPassword = 'Required'
      }
      if (newPassword !== e.target.value) {
        _errors.confirmPassword = 'Both password should match'
      }
    }
    setError(_errors)
  }

  const updateValue = e => {
    setAddress({ ...address, [e.target.name]: e.target.value })
    checkValidationAddress()
  }
  const enableUpdateAddress = index => {
    setIndex(index)
    setTextAreaDisable(false)
  }

  const updateAddress = async () => {
    let tempAddressData = finalAddress
    tempAddressData[index] = address

    if (checkValidationAddress()) {
      setLoading(true)

      await builton.users
        .setMe()
        .update({
          addresses: tempAddressData
        })
        .then(response => {
          console.log('[userOrder] response => ', response)
          setFinalAddress(response.addresses)
          setAddress('')
          setLoading(false)
          setTextAreaDisable(true)
          toast('Address is updated !', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'custom_toast'
          })
        })
        .catch(error => {
          console.log('[userOrder] errrr => ', error)
          toast('Address is Not updated !', {
            position: toast.POSITION.TOP_RIGHT,
            className: 'custom_toast'
          })
          if (error.response.status === 401) {
            firebase &&
              firebase
                .auth()
                .signOut()
                .then(res => {
                  toast('Session expired please login again!', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'custom_toast'
                  })
                  navigate(`/`)
                  localStorage.removeItem('firebaseToken')
                  localStorage.removeItem('details')
                })
                .catch(err => {
                  return err
                })
          }
          return error
        })
    }
  }

  return isLoading === true ? (
    <Loader />
  ) : (
    <div className="myAccountPage">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1>My Account</h1>
          </div>
          <div className="col-12 col-lg-7 col-xl-8">
            <h4 className="MyAccount-SubTitle">Orders</h4>
            {userOrder && userOrder.length > 0 ? (
              userOrder.map(order => (
                <div className="OrderListBox">
                  <div className="OrderListBoxHead d-flex">
                    <p>{new Date(order.created.$date).toDateString()}</p>
                    <p className="ml-auto">
                      Status:<span>{order.order_status}</span>
                    </p>
                  </div>
                  <ul className="OrderListUl">
                    {order.items
                      .filter(data => data.name !== 'Shipping cost')
                      .map(prod => (
                        <li className="revieworder-box">
                          <Photo
                            cartImg="cartImg"
                            src={
                              prod.product.media[0] && prod.product.media[0].url
                            }
                            alt={prod.product.name}
                          />
                          <div className="content">
                            <h5>{prod.name}</h5>
                            {prod.sub_products.map(sub => {
                              let name = allBuiltonProduct.nodes.filter(
                                data => data._id._oid === sub.$oid
                              )
                              if (name[0].tags[0] === 'Weight') {
                                return <p>Weight:{name[0].name}</p>
                              } else if (name[0].tags[0] === 'Cover') {
                                return <p>Cover:{name[0].name}</p>
                              } else {
                                return null
                              }
                            })}
                            <div className="price">{prod.final_price} £ </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                  <div className="OrderListBoxFooter d-flex align-items-center">
                    <p>
                      Total: <span>£{order.total_amount}</span>
                    </p>
                    <Button
                      type="thin"
                      className="ml-auto"
                      link={`/order/${order._id.$oid}`}
                    >
                      <h3>Details</h3>
                      <FontAwesomeIcon className="ml-auto" icon={faReceipt} />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <tr>No Orders Found</tr>
            )}
          </div>
          <div className="col-12 col-lg-5 col-xl-4">
            <h4 className="MyAccount-SubTitle">Details</h4>
            <div className="AddressDetails">
              <h5>Address</h5>
              {textAreaDisable === false ? (
                <div className="AddressDetailsBody">
                  <ul>
                    <li>
                      <input
                        className="form-control"
                        placeholder="street_name"
                        type="text"
                        name="street_name"
                        onChange={updateValue}
                      />
                      <span className="ErrorMessage">{error.street_name}</span>
                    </li>
                    <li>
                      <input
                        className="form-control"
                        placeholder="city"
                        type="text"
                        name="city"
                        onChange={updateValue}
                      />
                      <span className="ErrorMessage">{error.city}</span>
                    </li>
                    <li>
                      <input
                        className="form-control"
                        placeholder="zip_code"
                        type="text"
                        name="zip_code"
                        onChange={updateValue}
                      />
                      <span className="ErrorMessage">{error.zip_code}</span>
                    </li>
                    <li>
                      <input
                        className="form-control"
                        placeholder="state"
                        type="text"
                        name="state"
                        onChange={updateValue}
                      />
                      <span className="ErrorMessage">{error.state}</span>
                    </li>
                    <li>
                      <input
                        className="form-control"
                        placeholder="country"
                        type="text"
                        name="country"
                        onChange={updateValue}
                      />
                      <span className="ErrorMessage">{error.country}</span>
                    </li>
                  </ul>
                  <Button
                    className="ml-auto"
                    type="thin"
                    onClick={updateAddress}
                    disabled={finalAddress === null ? true : false}
                  >
                    <h3>Update</h3>
                    <FontAwesomeIcon className="ml-auto" icon={faCheck} />
                  </Button>
                </div>
              ) : (
                <div className="AddressDetailsBody ">
                  {finalAddress
                    ? finalAddress.map((add, i) => (
                        <div className="EditAddressDetailsBody">
                          <textarea
                            disabled={textAreaDisable === true ? true : false}
                          >
                            {add && add.raw.formatted_address}
                          </textarea>
                          <Button
                            type="thin"
                            className="ml-auto"
                            onClick={() => enableUpdateAddress(i)}
                          >
                            <FontAwesomeIcon
                              className="ml-auto"
                              icon={faPencilAlt}
                            />
                          </Button>
                        </div>
                      ))
                    : 'Not found any Address'}
                </div>
              )}
            </div>
            <div className="UpdatePassword">
              <h5>Update Password</h5>
              <div className="UpdatePasswordBody">
                <ul>
                  <li>
                    <input
                      className="form-control"
                      name="newPassword"
                      type="password"
                      placeholder="New Password"
                      onChange={e => handleChangeNewPassword(e)}
                    />
                    <span className="ErrorMessage">{error.newPassword}</span>
                  </li>
                  <li>
                    <input
                      className="form-control"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      onChange={e => handleChangeConfirmPassword(e)}
                      value={confirmPassword}
                    />
                    <span className="ErrorMessage">
                      {error.confirmPassword}
                    </span>
                  </li>
                </ul>
                <Button
                  type="thin"
                  className="ml-auto"
                  onClick={updatePassword}
                  disabled={newPassword && confirmPassword ? false : true}
                >
                  <h3>Update</h3>
                  <FontAwesomeIcon className="ml-auto" icon={faCheck} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const MyAccountPage = () => {
  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <Layout transitionStatus={transitionStatus}>
          <MyAccountInner transitionStatus={transitionStatus} />
        </Layout>
      )}
    </TransitionState>
  )
}
export default MyAccountPage
