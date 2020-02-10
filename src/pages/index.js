import React from 'react'
import Goodbye from '../components/HomePage/Goodbye'
import Quiz from '../components/HomePage/Quiz'
import HomeService from '../components/HomePage/HomeService'
import SecretIngredient from '../components/HomePage/SecretIngredient'
import HelpSlider from '../components/ProductPage/HelpSlider'
import BlanketImages from '../components/HomePage/BlanketImages'
import MagicWeightex from '../components/HomePage/MagicWeightex'
import Compare from '../components/HomePage/Compare/Compare'
import CustomerReview from '../components/HomePage/CustomerReview'
import BlanketDifference from '../components/HomePage/BlanketDifference'
import Carousel from '../components/Carousel/Carousel'
import Layout from "../components/Layout/Layout";

const IndexPage = () => {
  return (
    <Layout>
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

      <Carousel />
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

      <div className="container-fluid">
        <div className="row">
          <div className="col-12" data-scroll>
            <BlanketImages />
          </div>

          

            <Compare />

          <div className="col-12" >
            <CustomerReview />
          </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default IndexPage
