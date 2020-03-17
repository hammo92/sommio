import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Link, useStaticQuery } from 'gatsby'
import { navigate } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  CheckoutContext,
  FirebaseContext,
  ShippingAndUserDetailContext
} from '../context/index'
import Loader from '../components/Loader'
import { newFirebaseToken } from '../utils/newFirebaseToken'
import Layout from '../components/Layout/Layout'
import Photo from '../components/Photo'
import Header from '../components/Layout/Header'
// import BookOpen from '../images/book-open-solid.svg'
import {
  faBook,
  faReceipt,
  faCheck,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons'
import Button from '../components/Button'

const MyAccount = () => {
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
  const [finalAddress, setFinalAddress] = useState('')

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

  useEffect(() => {
    setLoading(true)

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
              setFinalAddress(
                response.data.addresses[0] &&
                  response.data.addresses[0].raw.formatted_address
              )
            })
            .catch(err => {
              console.log('USER err => ', err)
            })
        })
        .catch(err => {
          console.log('err => ', err, err.code)
          // alert('Error')
          // navigate('/')
        })

      setLoading(false)
    }
    fetchOrder()
  }, [])

  const handleChange = e => {
    console.log('e.target.value => ', e.target.value)

    if (e.target.name === 'newPassword') {
      setNewPassword(e.target.value)
    } else {
      setConfirmPassword(e.target.value)
    }
  }
  const updatePassword = () => {
    firebase &&
      firebase
        .auth()
        .currentUser.updatePassword(confirmPassword)
        .then(() => {
          alert('Password changed !!')
          setNewPassword('')
          setConfirmPassword('')
        })
        .catch(error => {
          alert('Not updated')
          console.log('error => ', error)
        })
  }
  const enableToUpdateAddress = () => {
    console.log('In function')

    setTextAreaDisable(false)
  }
  const updateValue = e => {
    console.log('e.target.value ====>', e.target.value)
    setAddress({ ...address, [e.target.name]: e.target.value })
  }
  const updateAddress = async () => {
    await builton.users
      .setMe()
      .update({
        addresses: [
          {
            street_name: address.street_name,
            city: address.city,
            state: address.state,
            zip_code: address.zip_code,
            country: address.country
          }
        ]
      })
      .then(response => {
        console.log('[userOrder] response => ', response)
        setFinalAddress(
          response.addresses[0] && response.addresses[0].raw.formatted_address
        )
        setAddress('')
        setTextAreaDisable(true)
      })
      .catch(error => {
        console.log('[userOrder] errrr => ', error)
      })
  }

  return (
    <Layout>
      {isLoading === true ? (
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
                                  prod.product.media[0] &&
                                  prod.product.media[0].url
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
                                <div className="price">
                                  {prod.final_price} £{' '}
                                </div>
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
                          <FontAwesomeIcon
                            className="ml-auto"
                            icon={faReceipt}
                          />
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
                      <input
                        placeholder="street_name"
                        type="text"
                        name="street_name"
                        onChange={updateValue}
                      />
                      <input
                        placeholder="city"
                        type="text"
                        name="city"
                        onChange={updateValue}
                      />
                      <input
                        placeholder="zip_code"
                        type="text"
                        name="zip_code"
                        onChange={updateValue}
                      />
                      <input
                        placeholder="state"
                        type="text"
                        name="state"
                        onChange={updateValue}
                      />
                      <input
                        placeholder="country"
                        type="text"
                        name="country"
                        onChange={updateValue}
                      />
                      <Button
                        className="ml-auto"
                        type="thin"
                        onClick={updateAddress}
                      >
                        <h3>Update</h3>
                        <FontAwesomeIcon className="ml-auto" icon={faCheck} />
                      </Button>
                    </div>
                  ) : (
                    <div className="AddressDetailsBody">
                      <textarea
                        disabled={textAreaDisable === true ? true : false}
                      >
                        {finalAddress}
                      </textarea>
                      <Button
                        type="thin"
                        className="ml-auto"
                        onClick={enableToUpdateAddress}
                      >
                        <FontAwesomeIcon
                          className="ml-auto"
                          icon={faPencilAlt}
                        />
                      </Button>
                    </div>
                  )}
                </div>
                <div className="UpdatePassword">
                  <h5>Update Password</h5>
                  <div className="UpdatePasswordBody">
                    <input
                      name="newPassword"
                      type="password"
                      placeholder="New Password"
                      onChange={e => handleChange(e)}
                    />
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      onChange={e => handleChange(e)}
                    />
                    <Button
                      type="thin"
                      className="ml-auto"
                      onClick={updatePassword}
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
      )}
    </Layout>
  )
}

export default MyAccount
