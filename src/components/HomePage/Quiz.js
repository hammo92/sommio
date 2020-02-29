import React, { useState } from 'react'
import Link from 'gatsby-plugin-transition-link'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import PlayIcon from '../../images/play-duotone.png'
import BlackboardImage from '../../images/blackboard.png'
import { useStateValue } from '../../context/SiteContext'
import Para from '../AnimatedText/Para'
import Head from '../AnimatedText/Head'

export const QuizButton = () => {
  const [{ quiz }, dispatch] = useStateValue()
  return (
    <AniLink
      paintDrip
      to="/QuizNew"
      hex="#D8A8FF"
      className="btn btn-info ml-auto"
    >
      {quiz.currentQuestion !== 0 && quiz.complete
        ? 'Your Results'
        : quiz.currentQuestion !== 0
        ? 'Resume'
        : 'Start'}
      <img src={PlayIcon} />
    </AniLink>
  )
}

const Quiz = ({ display }) => {
  return (
    <div
      className={display === 'wide' ? 'quiz-boxs wide' : 'quiz-boxs thin'}
      id="start"
    >
      {display === 'wide' && (
        <div className="col-4 image">
          <img src="/blackboard.png" />
        </div>
      )}
      <div className={display === 'wide' ? 'col-8 quizText' : 'quizText'}>
        <img src={BlackboardImage} />
        <Head>Is a weighted blanket, a good fit for you.</Head>
        <Para>
          Take our short quiz to discover whether a sommio weighted blanket
          could help you sleep better and enjoy lower stress
        </Para>
        <QuizButton />
      </div>
    </div>
  )
}
export default Quiz
