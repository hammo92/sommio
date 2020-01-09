import React from 'react'
import Goodbye from '../components/HomePage/Goodbye'
import Quiz from '../components/HomePage/Quiz'
import HomeService from '../components/HomePage/HomeService'
import SecretIngredient from '../components/HomePage/SecretIngredient'
import HelpSlider from '../components/ProductPage/HelpSlider'
import BlanketImages from '../components/HomePage/BlanketImages'
import MagicWeightex from '../components/HomePage/MagicWeightex'
import BlanketDifference from '../components/HomePage/BlanketDifference'
import CustomerReview from '../components/HomePage/CustomerReview'
import HelpsWith from '../components/ProductPage/HelpsWith'

const IndexPage = () => {
  return (
    <div className="homepage-bg">
      <div className="goodquiz-bg">
        <div className="container-fluid">
          <div className="row no-gutters">
            <div
              className="col-12 col-lg-7"
            >
              <Goodbye />
            </div>
            <div className="col-12 col-lg-5">
              <Quiz />
            </div>
          </div>
        </div>

        <div className="row no-gutters" id="service">
          <div className="ml-auto col-12 col-lg-10">
            <HomeService />
          </div>
        </div>


        <SecretIngredient />

      </div>

      <HelpsWith />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12" data-scroll>
            <BlanketImages />
          </div>

          <div
            className="col-12 col-lg-8 mx-auto"
            data-scroll
            data-scroll-speed="2"
          >
            <MagicWeightex />
          </div>

          <div className="col-12" >
            <BlanketDifference />
          </div>

          <div className="col-12" >
            <CustomerReview />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
