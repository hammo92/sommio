import React from 'react'
import { Link } from 'gatsby'
import PlayIcon from '../../images/play-duotone.png'

const Quiz = () => {
  return (
    <div className="quiz-boxs" id="start">
      <h2 data-scroll data-scroll-speed="3">
        Is a weighted blanket a good fit for <span>you</span>?
      </h2>
      <p data-scroll data-scroll-speed="3">
        Take our short quiz to discover whether a sommio weighted blanket could
        help you sleep better and enjoy lower stress
      </p>
      <Link
        to="/quizPage"
        className="btn btn-info ml-auto"
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="3"
        data-scroll-position="top"
        data-scroll-target="#start"
      >
        Start
        <img src={PlayIcon} />
      </Link>
    </div>
  )
}
export default Quiz
