import React from 'react'

const PaymentSelectOption = ({ onChange, makeEnable }) => {
  return (
    <>
      <div className="cost_option">
        <select disabled={!makeEnable} onChange={e => onChange(e.target.value)}>
          <option value="stripe">Stripe</option>
          <option value="klarna">Klarna</option>
        </select>
      </div>
    </>
  )
}

export default PaymentSelectOption
