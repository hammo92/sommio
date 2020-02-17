import React from 'react'
import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import Layout from "../components/Layout/Layout";
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link'
import { useStateValue } from '../context/SiteContext'
import {animated, useSpring } from 'react-spring'
import Head from '../components/AnimatedText/Head'
import Quiz from '../components/HomePage/Quiz'
import Carousel from '../components/Carousel/Carousel'
import ScrollText from '../components/HomePage/scrollText'

const LearnInner = () => {
  return(
  <div className="learnPage">
    <div className="container-fluid">
      <Head type={1}>Learn</Head>
      <Quiz display={"wide"}/>
      <div className="row">
      
      </div>
    </div>
      <Carousel />
    </div>
  )
}

const LearnPage = () => {
  return (
    <TransitionState>
      {({transitionStatus}) => (
        <Layout transitionStatus={transitionStatus}>
          <SEO title="Learn" />
          <LearnInner transitionStatus={transitionStatus}/>
        </Layout>
      )}
    </TransitionState>
  )
}

export default LearnPage


