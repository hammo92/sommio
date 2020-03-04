import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'gatsby'
import { CheckoutContext } from '../context/index'
import Loader from '../components/Loader'
import { newFirebaseToken } from '../utils/newFirebaseToken'
import Layout from '../components/Layout/Layout'
const UserOrdersList = () => {
  const { userOrderData, userOrder, userOrderItem } = useContext(
    CheckoutContext
  )
  const [isLoading, setLoading] = useState(false)

  const url = 'https://api.builton.dev/orders'
  console.log('userOrder => ', userOrder)

  useEffect(() => {
    setLoading(true)

    const fetchOrder = async () => {
      var token = await newFirebaseToken()

      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Builton-Api-Key': process.env.GATSBY_BUILTON_API_KEY,
          'Content-Type': 'application/json'
        }
      })
      console.log('response  ============> ', response)

      userOrderData(response.data)
      setLoading(false)
    }
    fetchOrder()
  }, [])
  console.log('userOrderItem => ', userOrderItem)
  const items =
    userOrderItem &&
    userOrderItem.length > 0 &&
    userOrderItem.map(data => data.filter(d => d.name !== 'Shipping cost'))
  console.log('items SSI => ', items)

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
                <p>List</p>
                <div>
                  {items &&
                    items.map(prod => (
                      <div>
                        <div className="content">
                          <h5>{prod.name}</h5>
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
            <p>
              Address
              {userOrder &&
                userOrder.length > 0 &&
                userOrder[0].delivery_address &&
                userOrder[0].delivery_address.raw &&
                userOrder[0].delivery_address.raw.formatted_address}
            </p>
            <p>Update Password</p>
            <input name="password" type="password" placeholder="New Password" />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm"
            />
            <button>Update</button>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default UserOrdersList
