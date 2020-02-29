import React, { useState, useRef } from 'react'
import Para from '../AnimatedText/Para'
import Head from '../AnimatedText/Head'
import GoodquizImages from '../../images/goodquiz-img.jpg'
import GoodquizEyeIcon from '../../images/eye-solid.svg'

const Goodbye = () => {
  return (
    <div className="goodquiz-boxs">
      <Head type={1}>Goodbye stress, hello rest.</Head>
      <img src={GoodquizImages} alt="" />
      <div className="goodquiz-bottom">
        <div className="goodquiz-content">
          <h2>Explore the blanket </h2>
          <Para>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the
          </Para>
        </div>
        <div className="goodquiz-view">
          <a href="#" className="eye-box">
            <img src={GoodquizEyeIcon} alt="View" />
          </a>
        </div>
      </div>
    </div>
  )
}
export default Goodbye
