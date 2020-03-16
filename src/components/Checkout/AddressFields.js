import React, { useContext, useState, useEffect } from 'react'
import { Field, Form } from 'react-final-form'
import { Link } from 'gatsby'
import axios from 'axios'
import country from '../../../countryWithThree'
import {
  ShippingAndUserDetailContext,
  FirebaseContext,
  CheckoutContext,
  CartContext
} from '../../context'
import validation from '../../validation/shippingFormValidation'
import { log } from 'util'
import Builton from '@builton/core-sdk'
import shippingFormValidation from '../../validation/shippingFormValidation'
import LocationSearchInput from './GoogleAutocomplete'
import countryWithThree from '../../../countryWithThree'
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

  let countryWithThree = country.filter(data => {
    return data.alpha2.toUpperCase() === countryCode
  })

  const { firebase } = useContext(FirebaseContext)

  const [isCurrentUser, SetCurrentUser] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [retrieveUserDetail, setRetrieveUserDetail] = useState()
  const [addNewAddress, setAddNewAddress] = useState(false)
  const [index, setIndex] = useState(false)
  let details = JSON.parse(localStorage.getItem('details'))

  let retrieveAddress = retrieveUserDetail && retrieveUserDetail.addresses

  useEffect(() => {
    if (details && details.email) {
      SetCurrentUser(true)
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

  const handleFormToggle = () => {
    toggleEditable(true)
  }
  let data
  const selectedAddress = (selectedData, i) => {
    console.log('selectedData => ', selectedData)
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
    // toggleEditable(true)

    shippingCostCalculate(user, data, ProductsArray)
  }
  const handleShippingCost = async values => {
    retrieveAddress.push({
      street_name: values.line_1,
      city: values.city,
      state: values.county,
      zip_code: values.postcode,
      country: values.country
    })
    console.log('retrieveAddress In side => ', retrieveAddress)
    //update user's address in builton(multiple address)

    setUserBuilton(values.email, builton)
    if (firebase && firebase.auth().currentUser) {
      setErrorMessage('')
      toggleEditable(true)
      shippingCostCalculate(user, values, ProductsArray)
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
        })
    } else {
      setErrorMessage('')
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

            SetCurrentUser(resp.user)
            setUserBuilton(values.email, builton)
            shippingCostCalculate(user, values, ProductsArray)
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
                note: 'Sejal here Sign up time !!'
              })
              .then(res => {
                console.log('res => ', res)
              })
              .catch(err => {
                console.log('err => ', err)
              })
          })
          .catch(error => {
            setErrorMessage(error.message)
            SetCurrentUser(false)
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

  return firebase && firebase.auth().currentUser && addNewAddress === false ? (
    <div>
      <p>{details.email}</p>
      <Link to="#">not you ?</Link>
      <p>Your Address List</p>
      {retrieveUserDetail ? (
        retrieveUserDetail.addresses.map((data, i) => (
          <div>
            <li
              onClick={() => selectedAddress(data, i)}
              className={i === index ? 'addressList' : ''}
            >
              {data.raw.formatted_address}
              <p>Phone: {retrieveUserDetail.mobile_phone_number}</p>
            </li>
          </div>
        ))
      ) : (
        <Loader />
      )}

      <button onClick={() => setAddNewAddress(!addNewAddress)}>Add new</button>

      <div className="submit_btn">
        <button type="submit" onClick={handleFormToggle}>
          Next Step
        </button>
      </div>
    </div>
  ) : (
    <Form
      onSubmit={handleShippingCost}
      initialValues={myInitData}
      validate={fieldValues =>
        shippingFormValidation(fieldValues, isCurrentUser)
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
                    <span>{errorMessage}</span>
                  </div>
                )}
              </Field>
            </div>
            {!isCurrentUser && (
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
