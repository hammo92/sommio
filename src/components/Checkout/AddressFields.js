import React, { useContext, useState, useEffect } from 'react'
import { Field, Form } from 'react-final-form'
import { Link } from 'gatsby'
import axios from 'axios'
import country from '../../../countryWithThree'
import {
  ShippingAndUserDetailContext,
  CheckoutContext,
  CartContext
} from '../../context'
import validation from '../../validation/shippingFormValidation'
import { log } from 'util'
import Builton from '@builton/core-sdk'
import shippingFormValidation from '../../validation/shippingFormValidation'
import LocationSearchInput from './GoogleAutocomplete'
import countryWithThree from '../../../countryWithThree'
import firebase from "gatsby-plugin-firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import { newFirebaseToken } from '../../utils/newFirebaseToken'
import Loader from '../Loader'

const AddressFields = ({ type, toggleEditable, gmapsLoaded }) => {
  const {
    shipping_address,
    user,
    shippingCostCalculate,
    builton,
    setUserBuilton,
    countryCode,
    setAddress
  } = useContext(ShippingAndUserDetailContext)
  const { ProductsArray } = useContext(CartContext)
  const { userOrder } = useContext(CheckoutContext)
  console.log('userOrder => ', userOrder)

  let countryWithThree = country.filter(data => {
    return data.alpha2.toUpperCase() === countryCode
  })
  
  /* user logged in state */
  const [currentUser, userLoading, userError] = useAuthState(firebase.auth());

  //const [isCurrentUser, SetCurrentUser] = useState(false)
  //const [errorMessage, setErrorMessage] = useState('')
  const [retrieveUserDetail, setRetrieveUserDetail] = useState()
  const [addNewAddress, setAddNewAddress] = useState(false)
  const [index, setIndex] = useState(null)
  const [note, setNote] = useState()
  const [listSelectedAddress, setListSelectedAddress] = useState()
  const [loading, setLoading] = useState(false)
  const [enableDeliveryInstruction, setEnableDeliveryInstruction] = useState(
    false
  )
  let token
  let details = JSON.parse(localStorage.getItem('details'))

  let retrieveAddress = retrieveUserDetail && retrieveUserDetail.addresses

  useEffect(() => {
    if (details && details.email) {
      //SetCurrentUser(true)
      fetchUserDetails()
    }
  }, [details && details.email])

  useEffect(() => {
    if (details && details.email) {
      fetchUserDetails()
    }
  }, [])

  let getUsersDetailUrl = 'https://api.builton.dev/users/me'

  const fetchUserDetails = async () => {
    setLoading(true)
    token = await newFirebaseToken()
    await axios
      .get(getUsersDetailUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Builton-Api-Key': process.env.GATSBY_BUILTON_API_KEY,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        setRetrieveUserDetail(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log('error => ', error)
        return error
      })
  }

  const handleForm = () => {
    shippingCostCalculate(user, listSelectedAddress, ProductsArray, note)
    toggleEditable(true)
  }
  let data
  const selectedAddress = (selectedData, i) => {
    setIndex(i)
    data = {
      first_name: retrieveUserDetail && retrieveUserDetail.first_name,
      last_name: retrieveUserDetail && retrieveUserDetail.last_name,
      line_1: selectedData.street_name,
      city: selectedData.city,
      county: selectedData.state,
      postcode: selectedData.zip_code,
      country: selectedData.country,
      phone: retrieveUserDetail.mobile_phone_number,
      email: retrieveUserDetail.email
    }
    setListSelectedAddress(data)
  }

  const handleShippingCost = async values => {
    retrieveAddress.push({
      street_name: values.line_1,
      city: values.city,
      state: values.county,
      zip_code: values.postcode,
      country: values.country
    })
    //update user's address in builton(multiple address)

    setUserBuilton(values.email, builton)
    if (firebase && firebase.auth().currentUser) {
      //setErrorMessage('')
      toggleEditable(true)
      shippingCostCalculate(user, values, ProductsArray, note)
      await builton.users
        .setMe()
        .update({
          addresses: retrieveAddress
        })
        .then(response => {
          console.log('[userOrder] response => ', response)
        })
        .catch(error => {
          console.log('[userOrder] errrr => ', error)
          return error
        })
    } else {
      //setErrorMessage('')
      firebase &&
        firebase
          .auth()
          .createUserWithEmailAndPassword(values.email.trim(), values.password)
          .then(resp => {
            let accessToken = JSON.parse(JSON.stringify(resp.user))
              .stsTokenManager.accessToken
            localStorage.setItem('firebaseToken', accessToken)
            localStorage.setItem('details', JSON.stringify(resp.user))

            const builton = new Builton({
              apiKey: process.env.GATSBY_BUILTON_API_KEY,
              bearerToken: accessToken
            })

            //SetCurrentUser(resp.user)
            setUserBuilton(values.email, builton)
            shippingCostCalculate(user, values, ProductsArray, note)
            toggleEditable(true)
            //create users details in builton
            builton.users
              .create({
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                mobile_phone_number: values.phone,
                addresses: [
                  {
                    street_name: values.line_1,
                    city: values.city,
                    zip_code: values.postcode,
                    state: values.county,
                    country: values.country
                  }
                ],
                note: ''
              })
              .catch(err => {
                console.log('err => ', err)
                return err
              })
          })
          .catch(error => {
            //setErrorMessage(error.message)
            //SetCurrentUser(false)
          })
    }
  }
  const myInitData = {
    first_name: shipping_address && shipping_address.first_name,
    last_name: shipping_address && shipping_address.last_name,
    line_1: shipping_address && shipping_address.line_1,
    city: shipping_address && shipping_address.city,
    county: shipping_address && shipping_address.county,
    postcode: shipping_address && shipping_address.postcode,
    country: shipping_address && shipping_address.country,
    phone: shipping_address && shipping_address.phone,
    email: shipping_address && shipping_address.email
  }

  const formValues = e => {
    e.preventDefault()
    setAddress({ [e.target.name]: e.target.value })
  }
  console.log('addNewAddress => ', addNewAddress)
  console.log('retrieveUserDetail => ', retrieveUserDetail)

  return loading === true ? (
    <Loader />
  ) : firebase && firebase.auth().currentUser && addNewAddress === false ? (
    <div className="DeliveryInformationWrap">
      <div className="EmailNotYou d-flex">
        <p>{details.email}</p>
        <Link to="#">not you ?</Link>
      </div>
      <div className="AddressListWrap">
        <div className="AddressListWrapInner">
          <h4>Your Address List</h4>
          <div className="AddressListDiv">
            <ul>
              {retrieveUserDetail &&
                retrieveUserDetail.addresses.map((data, i) => (
                  <li
                    onClick={() => selectedAddress(data, i)}
                    className={i === index ? 'addressList' : ''}
                  >
                    <div className="d-flex">
                      <p>{data && data.raw.formatted_address}</p>
                      <p className="ml-auto">
                        <span>Phone: </span>
                        {retrieveUserDetail &&
                          retrieveUserDetail.mobile_phone_number}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="AddressListBTN">
          <button onClick={() => setAddNewAddress(!addNewAddress)}>
            Add new
          </button>
          <button
            onClick={() =>
              setEnableDeliveryInstruction(!enableDeliveryInstruction)
            }
          >
            Add Delivery Instructions
          </button>
        </div>
        {enableDeliveryInstruction ? (
          <div>
            <input
              placeholder="Additional delivery information"
              name="note"
              onChange={e => setNote(e.target.value)}
            />
          </div>
        ) : (
          ''
        )}
        <div className="submit_btn">
          <button
            type="submit"
            onClick={handleForm}
            disabled={listSelectedAddress ? false : true}
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Form
      onSubmit={handleShippingCost}
      initialValues={myInitData}
      validate={fieldValues =>
        shippingFormValidation(fieldValues, currentUser)
      }
    >
      {({ handleSubmit, form, submitting, pristine, values }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="frm_grp row ">
              <Field name="first_name">
                {({ input, meta }) => (
                  <div className="form-group col-6">
                    <input
                      {...input}
                      type="text"
                      id="first_name"
                      placeholder="First name"
                      onChange={e => {
                        input.onChange(e)
                        if (input.onChange) {
                          formValues(e)
                        }
                      }}
                    />
                    <label for="first_name">First name</label>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="last_name">
                {({ input, meta }) => (
                  <div className="form-group col-6 ">
                    <input
                      {...input}
                      type="text"
                      placeholder="Last name"
                      id="last_name"
                      onChange={e => {
                        input.onChange(e)
                        if (input.onChange) {
                          formValues(e)
                        }
                      }}
                    />
                    <label for="last_name">Last name</label>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>

            <div className="frm_grp row">
              <div className="form-group col-12">
                <Field
                  onChange={e => formValues(e)}
                  name="country"
                  component="select"
                >
                  <option value={-1}>
                    {shipping_address.country
                      ? shipping_address.country
                      : 'Select Country'}
                  </option>
                  {country.length &&
                    country.map((cntry, i) => (
                      <option
                        selected={
                          countryCode &&
                          countryCode === cntry.alpha2.toUpperCase()
                        }
                        value={
                          countryWithThree
                            ? countryWithThree[0] && countryWithThree[0].alpha3
                            : cntry.alpha3
                        }
                        key={i}
                      >
                        {cntry.name}
                      </option>
                    ))}
                </Field>
              </div>
            </div>

            {gmapsLoaded && <LocationSearchInput />}

            <div className="frm_grp row">
              <Field name="line_1">
                {({ input, meta }) => (
                  <div className="form-group col-12">
                    <input
                      {...input}
                      type="text"
                      placeholder="Address line 1"
                      id="address_line_1"
                      onChange={e => {
                        input.onChange(e)
                        if (input.onChange) {
                          formValues(e)
                        }
                      }}
                    />
                    <label for="address_line_1">Address line 1</label>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>

            <div className="frm_grp row">
              <Field name="city">
                {({ input, meta }) => (
                  <div className="form-group col-12">
                    <input
                      {...input}
                      type="text"
                      placeholder="City"
                      id="city"
                      onChange={e => {
                        input.onChange(e)
                        if (input.onChange) {
                          formValues(e)
                        }
                      }}
                    />
                    <label for="city">City</label>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>

            <div className="frm_grp row">
              <Field name="county">
                {({ input, meta }) => (
                  <div className="form-group col-12">
                    <input
                      {...input}
                      type="text"
                      placeholder="State / County / Region"
                      id="county"
                      onChange={e => {
                        input.onChange(e)
                        if (input.onChange) {
                          formValues(e)
                        }
                      }}
                    />
                    <label for="county">State / County / Region</label>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>
            <div className="frm_grp row">
              <Field name="phone">
                {({ input, meta }) => (
                  <div className="form-group col-12">
                    <input
                      {...input}
                      type="text"
                      placeholder="Phone"
                      id="phone"
                      onChange={e => {
                        input.onChange(e)
                        if (input.onChange) {
                          formValues(e)
                        }
                      }}
                    />
                    <label for="phone">Phone</label>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>

            <div className="frm_grp row">
              <Field name="email">
                {({ input, meta }) => (
                  <div className="form-group col-12">
                    <input
                      {...input}
                      type="text"
                      placeholder="Email"
                      id="email"
                      onChange={e => {
                        input.onChange(e)
                        if (input.onChange) {
                          formValues(e)
                        }
                      }}
                    />
                    <label for="email">Email</label>
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                    <span>{userError}</span>
                  </div>
                )}
              </Field>
            </div>
            {!currentUser && (
              <>
                <div className="frm_grp row">
                  <Field name="password">
                    {({ input, meta }) => (
                      <div className="form-group col-6">
                        <input
                          {...input}
                          type="password"
                          placeholder="Password"
                          id="password"
                        />
                        <label for="password">Password</label>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="confirm_password">
                    {({ input, meta }) => (
                      <div className="form-group col-6">
                        <input
                          {...input}
                          type="password"
                          id="confirm_password"
                          placeholder="Confirm Password"
                        />
                        <label for="confirm_password">Confirm Password</label>
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
              </>
            )}

            <div className="submit_btn">
              <button type="submit">Next Step</button>
            </div>
          </form>
        )
      }}
    </Form>
  )
}
export default AddressFields
