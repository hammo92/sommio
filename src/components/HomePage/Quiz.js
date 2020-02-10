import React, {useState} from 'react'
import Link from 'gatsby-plugin-transition-link'
import AniLink from "gatsby-plugin-transition-link/AniLink";
import PlayIcon from '../../images/play-duotone.png'
import { useStateValue } from '../../context/SiteContext'
import Para from '../AnimatedText/Para'
import Head from '../AnimatedText/Head'

export const QuizButton = () => {
  const [{ quiz }, dispatch] = useStateValue();
  return (
    <AniLink paintDrip to="/QuizNew" hex="#D8A8FF"  className="btn btn-info ml-auto">
        {quiz.currentQuestion !== 0 && quiz.complete ? "Your Results" : quiz.currentQuestion !== 0 ? "Resume" : "Start" }
        <img src={PlayIcon} />
    </AniLink >
  )
}


const Quiz = () => {
  
  return (
    <div className="quiz-boxs" id="start">
      <Head>
      Is a weighted blanket, a good fit for you.
      </Head>
      <Para>
      Take our short quiz to discover whether a sommio weighted 
      blanket could help you sleep better and enjoy lower stress
      </Para>
      <QuizButton />
    </div>
  )
}
export default Quiz
