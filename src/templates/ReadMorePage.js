import React, { Fragment, useState, useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { useSpring, animated } from 'react-spring'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link'
import Layout from '../components/Layout/Layout'

const TRANSITION_LENGTH = 1

const exitTransition = {
  length: TRANSITION_LENGTH, // Take 1 seconds to leave
  trigger: () => {
    if (document) {
      // Preventing overflow here make the animation smoother IMO
    }
  }
}

const entryTransition = {
  delay: TRANSITION_LENGTH, // Wait 1 seconds before entering
  trigger: () => {
    if (document && window) {
      // Ensuring we're at the top of the page when the page loads
      // prevents any additional JANK when the transition ends.
      window.scrollTo(0, 0)
    }
  }
}
const Next = ({ data, mount }) => {
  const [scroll, setScroll] = useState(0)
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    setOffset(
      ref.current.offsetTop -
        document.querySelector('header').getBoundingClientRect().height
    )
  }, [offset])
  useScrollPosition(({ prevPos, currPos }) => {
    setScroll(offset + currPos.y)
  })
  const ref = useRef(null)
  // console.log('offset is => ', scroll)
  const props = useSpring({
    to: {
      opacity: 1,
      transform: mount ? 'translateY(0px)' : `translateY(-${scroll}px)`
    }
  })
  return (
    <animated.div
      ref={ref}
      style={props}
      className={mount ? 'nextCond container-fluid' : 'container-fluid'}
    >
      <div className="condition-hero">
        <div className="title">
          <h1>{data.contentfulNext.conditionName}</h1>
          <h4>{data.contentfulNext.subtitle}</h4>
        </div>
        <div className="image">
          <Img
            fluid={data.contentfulNext.cardImage.fluid}
            imgStyle={{
              top: '-30%'
            }}
          />
        </div>
      </div>
    </animated.div>
  )
}

const Header = ({ data, mount }) => {
  // console.log("article data is => ",data)
  return (
    <div className="container-fluid">
      <div className="condition-hero">
        <div className="title">
          <h1>{data.contentfulCondition.conditionName}</h1>
          <h4>{data.contentfulCondition.subtitle}</h4>
        </div>
        <div className="image">
          <Img
            fluid={data.contentfulCondition.cardImage.fluid}
            imgStyle={{
              top: '-30%'
            }}
          />
        </div>
      </div>
    </div>
  )
}

const Content = ({ data }) => {
  return (
    <div className="container conditionContent">
      <div
        dangerouslySetInnerHTML={{
          __html: data.contentfulCondition.content.childMarkdownRemark.html
        }}
      ></div>
    </div>
  )
}

const ReadInner = ({ transitionStatus, data, pageContext }) => {
  const mount = ['entering', 'entered'].includes(transitionStatus)
  const fade = useSpring({
    to: { opacity: mount ? 1 : 0 }
  })
  const props = useSpring({
    from: { opacity: 1 },
    to: { opacity: mount ? 1 : 0 }
  })

  return (
    <Fragment>
      <animated.div style={props}>
        <Header data={data} mount={mount} />
      </animated.div>
      <animated.div style={fade}>
        <Content data={data} />
      </animated.div>
      <TransitionLink
        style={{
          textDecoration: 'none',
          color: 'inherit'
        }}
        to={`/readMore/${pageContext.next.slug}`}
        exit={exitTransition}
        entry={entryTransition}
      >
        <Next data={data} mount={mount} />
      </TransitionLink>
    </Fragment>
  )
}

const ReadMorePage = ({ data, pageContext }) => {
  // console.log('query , data => ', pageContext)
  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <Layout transitionStatus={transitionStatus}>
          <ReadInner
            transitionStatus={transitionStatus}
            data={data}
            pageContext={pageContext}
          />
        </Layout>
      )}
    </TransitionState>
  )
}

export const query = graphql`
  query($slug: String!, $nextSlug: String) {
    contentfulCondition: contentfulCondition(slug: { eq: $slug }) {
      slug
      id
      subtitle
      conditionName
      cardImage {
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_withWebp
        }
        file {
          url
        }
      }
      content {
        childMarkdownRemark {
          html
        }
      }
    }
    contentfulNext: contentfulCondition(slug: { eq: $nextSlug }) {
      slug
      id
      subtitle
      conditionName
      cardImage {
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid_withWebp
        }
        file {
          url
        }
      }
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default ReadMorePage
