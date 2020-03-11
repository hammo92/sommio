import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Link, useStaticQuery } from 'gatsby'
import { navigate } from 'gatsby'
import { CheckoutContext, FirebaseContext } from '../context/index'
import Loader from '../components/Loader'
import { newFirebaseToken } from '../utils/newFirebaseToken'
import Layout from '../components/Layout/Layout'
import Photo from '../components/Photo'

const UserOrdersList = () => {
  const { userOrderData, userOrder } = useContext(CheckoutContext)
  const { firebase } = useContext(FirebaseContext)

  const [isLoading, setLoading] = useState(false)
  const [textAreaDisable, setTextAreaDisable] = useState(true)
  const url = 'https://api.builton.dev/orders'

  console.log('userOrder =>', userOrder)
  const orderId = userOrder[0] && userOrder[0]._id && userOrder[0]._id.$oid
  console.log('orderId => ', orderId)

  const updateOrderAddressUrl = `https://api.builton.dev/orders/${orderId}`
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
        .then(res => {
          userOrderData(res.data)
        })
        .catch(err => {
          console.log('err => ', err, err.code)
          alert('Error')
          navigate('/')
        })
      setLoading(false)
    }
    fetchOrder()
  }, [])

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')

  console.log('newPassword, confirmPassword => ', newPassword, confirmPassword)

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
    setTextAreaDisable(false)
  }
  const updateAddress = async e => {
    console.log('e.target.value ====>', e.target.value)
    setAddress(e.target.value)
    console.log('address => ', address)
    let add = e.target.value
    console.log('add => ', add)

    let token = await newFirebaseToken()
    await axios
      .put(
        updateOrderAddressUrl,
        {
          delivery_address: { raw: { formatted_address: 'Testing' } }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Builton-Api-Key': process.env.GATSBY_BUILTON_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        console.log('updatedAddress res =>', res)
      })
      .catch(err => {
        console.log('err => ', err, err.code)
      })
  }
  return (
    <Layout>
      {isLoading === true ? (
        <Loader />
      ) : (
        <div>
          <h1>My Account</h1>
          <h4>Orders</h4>
          {userOrder && userOrder.length > 0 ? (
            userOrder.map(order => (
              <div>
                <p>{new Date(order.created.$date).toDateString()}</p>
                <p>Status:{order.order_status}</p>
                <div>
                  {order.items
                    .filter(data => data.name !== 'Shipping cost')
                    .map(prod => (
                      <div className="revieworder-box">
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
                        </div>
                        <div className="price ml-auto">
                          {prod.final_price} £{' '}
                        </div>
                      </div>
                    ))}
                </div>
                <p>Total: £{order.total_amount}</p>
                <Link to={`/order/${order._id.$oid}`}>Details</Link>
              </div>
            ))
          ) : (
            <tr>No Orders Found</tr>
          )}
          <div>
            <h4>Details</h4>
            <h5>Address</h5>
            <textarea
              disabled={textAreaDisable === true ? true : false}
              onBlur={e => updateAddress(e)}
            >
              {userOrder &&
                userOrder.length > 0 &&
                userOrder[0].delivery_address &&
                userOrder[0].delivery_address.raw &&
                userOrder[0].delivery_address.raw.formatted_address}
            </textarea>
            <button onClick={enableToUpdateAddress}>Update Address</button>

            <p>Update Password</p>
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
            <button type="submit" onClick={updatePassword}>
              Update
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default UserOrdersList
