import React, { useContext, useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import { Field } from 'react-final-form'
import { CartContext } from '../../context/CartContext'
import countryData from '../../../countryWithThree'

const LocationSearchInput = () => {
  const {
    shipping_address,
    setAddressFromAutoComplete,
    setPostalCode
  } = useContext(CartContext)

  const [zip, setZip] = useState()

  const handleChange = zipcode => {
    setZip(zipcode)
    setPostalCode(zipcode) //update context postal code value
  }
  console.log(
    'shipping_address =============>',
    shipping_address,
    shipping_address.country
  )

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        console.log('results =========>', results)

        results[0].address_components.map(data => {
          if (data.types[0] === 'postal_code') {
            setZip(data.long_name)
            setPostalCode(data.long_name)
          }
        })
        setAddressFromAutoComplete(results)
        getLatLng(results[0])
      })
      .catch(error => console.error('GoogleAutoComplete Error', error))
  }

  let countryWithThree = countryData.filter(data => {
    return data.name === shipping_address.country
  })

  const searchOptions = {
    componentRestrictions: {
      country: countryWithThree[0] && countryWithThree[0].alpha2
    }
  }

  return (
    <PlacesAutocomplete
      value={zip}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="frm_grp row">
          <Field name="postcode">
            {({ input, meta }) => (
              <div className="form-group col-12">
                <input
                  type="text"
                  id="postcode"
                  {...getInputProps({
                    placeholder: 'Postcode',
                    className: 'location-search-input'
                  })}
                />
                <label for="postcode">Postcode</label>
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              console.log('suggestion ==============> ', suggestion)

              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item'
              // inline style for demonstration purpose
            
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  )
}
export default LocationSearchInput
