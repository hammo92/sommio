import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'gatsby'
import {
  ShippingAndUserDetailContext,
  FirebaseContext,
  CartContext
} from '../../context'
import AddressFields from './AddressFields'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import RegisterOrLogin from '../Checkout/RegisterOrLogin'
import { newFirebaseToken } from '../../utils/newFirebaseToken'
import Loader from '../Loader'

const ShippingAddress = ({ isCompleted, toggleEditable, gmapsLoaded }) => {
  const {
    shipping_address,
    customerDetails,
    user,
    shippingCostCalculate
  } = useContext(ShippingAndUserDetailContext)

  const { ProductsArray } = useContext(CartContext)
  const { firebase } = useContext(FirebaseContext)
  const [modal, setModal] = useState(false)
  const [currentUser, setCurrentUser] = useState(false)
  const [retrieveUserDetail, setRetrieveUserDetail] = useState()
  const [addNewAddress, setAddNewAddress] = useState(false)

  let details = JSON.parse(localStorage.getItem('details'))

  useEffect(() => {
    if (details && details.email) {
      setCurrentUser(true)
    }
  }, [details && details.email])
  let getUsersDetailUrl = 'https://api.builton.dev/users/me'

  const fetchUserDetails = async () => {
    let token = await newFirebaseToken()
    await axios
      .get(getUsersDetailUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Builton-Api-Key': process.env.GATSBY_BUILTON_API_KEY,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('response => ', response)
        setRetrieveUserDetail(response.data)
      })
      .catch(error => {
        console.log('error => ', error)
        return error
      })
  }

  useEffect(() => {
    //Retrive user's existing address from builton

    if (details.email || (firebase && firebase.auth().currentUser)) {
      fetchUserDetails()
    }
  }, [])

  const toggleModal = () => setModal(!modal)

  const handleLogin = () => {
    if (firebase && firebase.auth().currentUser) {
      setModal(false)
      setCurrentUser(true)
    }
    fetchUserDetails()
    toggleModal()
  }
  const selectedAddress = selectedData => {
    console.log('selectedData => ', selectedData)
    const data = {
      first_name: retrieveUserDetail && shipping_address.first_name,
      last_name: retrieveUserDetail && shipping_address.last_name,
      line_1: selectedData.street_name,
      city: selectedData.city,
      county: selectedData.state,
      postcode: selectedData.zip_code,
      country: selectedData.country,
      phone: retrieveUserDetail.phone,
      email: retrieveUserDetail.email
    }

    shippingCostCalculate(user, data, ProductsArray)
  }
  return (
    <>
      <div className={`${isCompleted ? 'visible' : 'hidden'}`}>
        <div className="shipping-boxs">
          <h2 className="text-black font-medium leading-loose p-0 mb-3">
            <span>1</span>
            <span className="text">DELIVERY INFORMATION</span>
          </h2>
          <div className="mb-10">
            <h4 className="mb-3">Email Address</h4>
            <p>{details && details.email}</p>
          </div>
          <div className="mb-10">
            <h4 className="mb-3">Shipping Address</h4>
            <p className="mb-1">
              Name: {shipping_address && shipping_address.first_name}{' '}
              {shipping_address && shipping_address.last_name}
            </p>
            <p className="mb-1">
              Address: {shipping_address && shipping_address.line_1}
            </p>
            <p className="mb-1">{shipping_address && shipping_address.city}</p>
            <p>
              {shipping_address && shipping_address.county} {''}
              {shipping_address && shipping_address.postcode}
            </p>
            <p>{shipping_address && shipping_address.country}</p>
            <p>Contact Number: {shipping_address && shipping_address.phone}</p>
          </div>
        </div>
        <div className="submit_btn">
          <button
            className="btn btn-outline-secondary"
            onClick={() => toggleEditable(false)}
          >
            Edit
          </button>
        </div>
      </div>
      <div className={`${isCompleted ? 'hidden' : 'visible'}`}>
        <div className="shipping-boxs">
          <h2 className="text-black font-medium leading-loose p-0 mb-3 pt-6 pb-3 border-b border-grey-light">
            <span>1</span>
            <span className="text">DELIVERY INFORMATION</span>
          </h2>
          {!currentUser && (
            <div className="frm_grp checkoutAccount">
              <p>Already have an account ?</p>
              <button className="btn btn-info ml-auto" onClick={handleLogin}>
                Login
              </button>
            </div>
          )}

          {currentUser && addNewAddress === false ? (
            <div>
              <p>{details.email}</p>
              <Link to="#">not you ?</Link>
              <p>Your Address List</p>
              {retrieveUserDetail ? (
                retrieveUserDetail.addresses.map(data => (
                  <div>
                    {console.log('data => ', data)}
                    <li onClick={() => selectedAddress(data)}>
                      {data.raw.formatted_address}
                      <p>Phone: {data.mobile_phone_number}</p>
                    </li>
                  </div>
                ))
              ) : (
                <Loader />
              )}
              <button onClick={() => setAddNewAddress(!addNewAddress)}>
                Add new
              </button>
            </div>
          ) : (
            <AddressFields
              gmapsLoaded={gmapsLoaded}
              type="shipping_address"
              toggleEditable={toggleEditable}
              retrieveUserDetail={retrieveUserDetail}
            />
          )}
        </div>
      </div>
      <div>
        <Modal isOpen={modal} toggle={toggleModal} className="Login-modal">
          <ModalHeader toggle={toggleModal}>User Account</ModalHeader>
          <ModalBody>
            <RegisterOrLogin isModal={true} toggleModal={toggleModal} />
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}

export default ShippingAddress
