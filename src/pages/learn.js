import React from 'react'
import Seo from '../components/SEO'
import Layout from '../components/Layout/Layout'
import { TransitionState } from 'gatsby-plugin-transition-link'
import Head from '../components/AnimatedText/Head'
import Quiz from '../components/HomePage/Quiz'
import Carousel from '../components/Carousel/Carousel'

const LearnInner = () => {
  return (
    <div className="learnPage">
      <div className="container-fluid">
        <Head type={1}>Learn</Head>
        <Quiz display={'wide'} />
        <div className="row"></div>
      </div>
      <Carousel />
    </div>
  )
}

const LearnPage = () => {
  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <Layout transitionStatus={transitionStatus}>
          <Seo title="Learn" />
          <LearnInner transitionStatus={transitionStatus} />
        </Layout>
      )}
    </TransitionState>
  )
}

export default LearnPage
