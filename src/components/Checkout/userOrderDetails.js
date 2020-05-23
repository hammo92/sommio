import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useStaticQuery, navigate, graphql } from 'gatsby'
import Photo from '../Photo'
import Loader from '../../components/Loader'
import { newFirebaseToken } from '../../utils/newFirebaseToken'
import Layout from '../Layout/Layout'
import { TransitionState } from 'gatsby-plugin-transition-link'
import { toast } from 'react-toastify'
import { FirebaseContext } from '../../context'

const UserOrderDetailsInner = props => {
  const { firebase } = useContext(FirebaseContext)

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

  const orderId = props.id

  const retrieveOrderData = `https://api.builton.dev/orders/${orderId}`

  const [orderDetails, setOrderDetails] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const fetchUserOrderDetails = async () => {
    var token = await newFirebaseToken()
    setLoading(true)

    await axios
      .get(retrieveOrderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Builton-Api-Key': process.env.GATSBY_BUILTON_API_KEY,
          'Content-Type': 'application/json'
        }
      })
      .then(async response => {
        setOrderDetails(response.data)
        // get payment details
        let paymentResponse = await axios
          .get(
            `https://api.builton.dev/payments/${response.data.payments[0].$oid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'X-Builton-Api-Key': process.env.GATSBY_BUILTON_API_KEY,
                'Content-Type': 'application/json'
              }
            }
          )
          .catch(error => {
            return error
          })
        //get paymentMethod details
        let paymentMethodResponse = await axios
          .get(
            `https://api.builton.dev/payment_methods/${paymentResponse.data.payment_method.$oid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'X-Builton-Api-Key': process.env.GATSBY_BUILTON_API_KEY,
                'Content-Type': 'application/json'
              }
            }
          )
          .catch(error => {
            return error
          })
        setPaymentMethod(paymentMethodResponse.data)
        setLoading(false)
      })
      .catch(error => {
        if (error.response.status === 401 || error.response.status === 403) {
          firebase &&
            firebase
              .auth()
              .signOut()
              .then(res => {
                navigate(`/`)
                localStorage.removeItem('firebaseToken')
                localStorage.removeItem('details')
                toast('Session is expired, Please login again!', {
                  position: toast.POSITION.TOP_RIGHT,
                  className: 'custom_toast'
                })
              })
              .catch(err => {
                return err
              })
        }

        return error
      })
  }
  useEffect(() => {
    fetchUserOrderDetails()
  }, [])

  return (
    <div className="myAccountPage OrderPage">
      <div className="container-fluid">
        {isLoading === true ? (
          <Loader />
        ) : (
          <div className="row">
            <div className="col-md-12">
              <h1>Order</h1>
            </div>
            <div className="col-12 col-lg-7 col-xl-8">
              <h4 className="MyAccount-SubTitle">Items</h4>
              <div className="OrderListBox">
                <ul className="OrderListUl">
                  {orderDetails &&
                    orderDetails.items
                      .filter(data => data.name !== 'Shipping cost')
                      .map((item, key) => (
                        <li className="revieworder-box" key={key}>
                          <div className="product-image bg-grey-light">
                            <Photo
                              src={
                                item.product.media[0] &&
                                item.product.media[0].url
                              }
                              alt={item.name}
                            />
                          </div>
                          <div className="content">
                            <h5>{item.name}</h5>
                            {item.sub_products.map(sub => {
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
                              &#163; {item.final_price}
                            </div>
                          </div>
                        </li>
                      ))}
                </ul>
                <div className="OrderListBoxFooter">
                  <p>
                    Total:{' '}
                    <span>
                      &#163; {orderDetails && orderDetails.total_amount}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-5 col-xl-4">
              <h4 className="MyAccount-SubTitle">Details</h4>
              <div className="OrderRightBox">
                <h3 className="d-flex">
                  Date:
                  <span className="ml-auto">
                    {new Date(
                      orderDetails && orderDetails.created.$date
                    ).toDateString()}{' '}
                  </span>
                </h3>
                <p className="OrderRightStatus d-flex">
                  Status:{' '}
                  <span className="ml-auto">
                    {orderDetails && orderDetails.delivery_status}
                  </span>
                </p>
              </div>
              <div className="OrderRightBox">
                <h3>Address </h3>
                <div className="OrderRightBoxBody">
                  <p>
                    {orderDetails &&
                      orderDetails.delivery_address.raw.formatted_address}
                  </p>
                </div>
              </div>
              <div className="OrderRightBox">
                <h3>Payment</h3>
                <div className="OrderRightBoxBody">
                  <p className="d-flex">
                    Card:{' '}
                    <span className="ml-auto">
                      **** **** **** {paymentMethod && paymentMethod.card.last4}
                    </span>
                  </p>
                  <h6 className="mt-1">
                    {paymentMethod && paymentMethod.card.name}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
const UserOrderDetailsPage = props => {
  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <Layout transitionStatus={transitionStatus}>
          <UserOrderDetailsInner
            transitionStatus={transitionStatus}
            {...props}
          />
        </Layout>
      )}
    </TransitionState>
  )
}
export default UserOrderDetailsPage
