import React from 'react'

const KlarnaPaymentOption = ({ onChange, makeEnable = true }) => {
  return (
    <div className="cost_option">
      <select disabled={!makeEnable} onChange={e => onChange(e.target.value)}>
        <option value="pay_later">Pay Later</option>
        <option value="pay_over_time">Pay Over Time</option>
      </select>
    </div>
  )
}

export default KlarnaPaymentOption
