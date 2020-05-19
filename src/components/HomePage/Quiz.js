import React, { useState } from 'react'
import Link from 'gatsby-plugin-transition-link'
import { useStaticQuery, graphql } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import PlayIcon from '../../images/play-duotone.png'
import BlackboardImage from '../../images/blackboard.png'
import { useStateValue } from '../../context/SiteContext'
import AniText from '../AnimatedText/AniText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { animated, useSpring } from 'react-spring'
import Button from '../Button'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import Img from 'gatsby-image'

export const QuizButton = () => {
  const [{ quiz }, dispatch] = useStateValue()

  return (
    <AniLink
      paintDrip
      to="/QuizNew"
      hex="#D8A8FF"
      className="btn btn-info ml-auto"
    >
      <span>
        {quiz.currentQuestion !== 0 && quiz.complete
          ? 'Your Results'
          : quiz.currentQuestion !== 0
          ? 'Resume'
          : 'Start'}
      </span>
      <img src={PlayIcon} />
    </AniLink>
  )
}

const Quiz = ({ display }) => {
  const [{ quiz }, dispatch] = useStateValue()
  const Blackboard = useStaticQuery(graphql`
    query {
      file(name: { eq: "blackboard" }) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 100) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `)
  return (
    <div
      className={display === 'wide' ? 'quiz-boxs wide' : 'quiz-boxs thin'}
      id="start"
    >
      {display === 'wide' && (
        <div className="col-4 image">
          <Img fluid={Blackboard.file.childImageSharp.fluid} />
        </div>
      )}
      <div className={display === 'wide' ? 'col-8 quizText' : 'quizText'}>
        {/*display !== 'wide' && (
            <Img fluid={Blackboard.file.childImageSharp.fluid} />
        )*/}
        <AniText type={display === 'wide' ? "h3" : "h2"}>Is a weighted blanket, a good fit for you?</AniText>
        <AniText type={"p"}>
          Take our short quiz to discover whether a sommio weighted blanket
          could help you sleep better and enjoy lower stress
        </AniText>
        <Button link="/QuizNew" type={"thin"}>
          <h3>
          {quiz.currentQuestion !== 0 && quiz.complete
          ? 'Your Results'
          : quiz.currentQuestion !== 0
          ? 'Resume'
          : 'Start'}
          </h3>
          <FontAwesomeIcon icon={faPlay} />
        </Button>
      </div>
    </div>
  )
}
export default Quiz
