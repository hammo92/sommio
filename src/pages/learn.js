import React from 'react'
import SEO from '../components/SEO'
import PageTitle from '../components/PageTitle'
import Layout from "../components/Layout/Layout";
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link'
import { useStateValue } from '../context/SiteContext'
import {animated, useSpring } from 'react-spring'
import AniText from '../components/AnimatedText/AniText'
import Quiz from '../components/HomePage/Quiz'
import Carousel from '../components/Carousel/Carousel'
import ScrollText from '../components/HomePage/scrollText'

const LearnInner = ({data}) => {
  return(
  <div className="learnPage">
    <div className="container-fluid">
      <AniText type={"h1"}>Learn</AniText>
      <Quiz display={"wide"}/>
      <div className="row">
      
      </div>
    </div>
    <Carousel contents={data.nodes} slides={[3,2,1]} type={"conditions"} title={"Helps you with"}/>
    </div>
  )
}

const LearnPage = ({data: {allContentfulCondition} }) => {
  return (
    <TransitionState>
      {({transitionStatus}) => (
        <Layout transitionStatus={transitionStatus}>
          <SEO title="Learn" />
          <LearnInner transitionStatus={transitionStatus} data={allContentfulCondition}/>
        </Layout>
      )}
    </TransitionState>
  )
}
export const query = graphql`
  query MyQuery {
    allContentfulCondition {
      nodes {
        slug
        id
        conditionName
        content {
          childMarkdownRemark {
            html
          }
        }
        cardImage {
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid_withWebp
          }
          file {
            url
          }
        }
      }
    }
  }

`

export default LearnPage


