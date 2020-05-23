import React, { useEffect, useRef } from 'react'
import QuizSlide from '../components/QuizNew/QuizSlide'
import Container from 'react-bootstrap/Container'
import { useStateValue } from '../context/SiteContext'
import Results from '../components/QuizNew/Results'
import Layout from '../components/Layout/Layout'
import { useWindowSize } from '@reach/window-size'
import { TransitionState } from 'gatsby-plugin-transition-link'

export const QuizInner = () => {
  const [{ quiz }] = useStateValue()
  const { width, height } = useWindowSize()
  const ref = useRef(null)
  // console.log(ref.current)

  useEffect(() => {
    ref.current.style.minHeight = `${height -
      document.querySelector('header').getBoundingClientRect().height}px`
  })

  //const headerHeight = document.querySelector('header').getBoundingClientRect().height

  // console.log('window => ', width, height)
  //console.log("offset => ", offset)
  return (
    <Container
      ref={ref}
      className={quiz.complete ? 'QuizContain' : 'QuizContain setHeight'}
      fluid
    >
      {quiz.complete ? <Results /> : <QuizSlide />}
    </Container>
  )
}

const QuizPage = () => {
  return (
    <TransitionState>
      {({ transitionStatus }) => (
        <Layout transitionStatus={transitionStatus}>
          <QuizInner></QuizInner>
        </Layout>
      )}
    </TransitionState>
  )
}
export default QuizPage
