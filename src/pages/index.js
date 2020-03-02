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
import Layout from '../components/Layout/Layout'
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link'
import { useStateValue } from '../context/SiteContext'
import { animated, useSpring } from 'react-spring'

const TRANSITION_LENGTH = 1

const exitTransition = {
  length: TRANSITION_LENGTH, // Take 1.5 seconds to leave
  trigger: () => {
    if (document) {
      // Preventing overflow here make the animation smoother IMO
    }
  }
}

const entryTransition = {
  delay: TRANSITION_LENGTH, // Wait 1.5 seconds before entering
  trigger: () => {
    if (document && window) {
      // Ensuring we're at the top of the page when the page loads
      // prevents any additional JANK when the transition ends.
      window.scrollTo(0, 0)
    }
  }
}

export const IndexInner = ({ transitionStatus }) => {
  const [{ quiz }, dispatch] = useStateValue()
  const mount = ['entering', 'entered'].includes(transitionStatus)

  const fadeUp = useSpring({
    opacity: mount ? 1 : 0
  })
  console.log('transitionStatus [homepage] => ', transitionStatus)
  console.log('mount [homepage] => ', mount)
  console.log('fadeUp [homepage] => ', fadeUp)

  return (
    <animated.div style={fadeUp} className="homepage-bg">
      <div className="goodquiz-bg">
        {/* <div className="container-fluid"> */}
        <div className="row no-gutters">
          <div className="col-12 col-lg-8">
            <Goodbye />
          </div>
          <div className="col-12 col-lg-4">
            <Quiz />
            <HomeService />
          </div>
        </div>
        {/* </div> */}

        {/* <div className="row no-gutters" id="service">
          <div className="ml-auto col-12 col-lg-10">
            
          </div>
        </div> */}

        <SecretIngredient />
      </div>

      <Carousel shifted={true} />

      <MagicWeightex />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12" data-scroll>
            <BlanketImages />
          </div>

          <Compare />

          <div className="col-12">
            <CustomerReview />
          </div>
        </div>
      </div>
    </animated.div>
  )
}

const IndexPage = () => {
  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <Layout transitionStatus={transitionStatus}>
          <IndexInner transitionStatus={transitionStatus} />
        </Layout>
      )}
    </TransitionState>
  )
}

export default IndexPage
