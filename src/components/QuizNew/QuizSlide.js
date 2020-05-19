import React, { useState } from 'react'
import AnswerCard from './AnswerCard'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ArrowLeft, ArrowRight } from './Arrows'
import { useStateValue } from '../../context/SiteContext'
import YAMLData from '../../../content/Quiz.yaml'
import { useTransition, useTrail, animated } from 'react-spring'

const Questions = YAMLData
const AnimatedAnswer = animated(AnswerCard)

const QuizSlide = () => {
  const [{ quiz }, dispatch] = useStateValue()
  console.log('[squizSlide] quiz => ', quiz)

  const CurrentQuestion = Questions[quiz.currentQuestion]
  const answered = quiz.questions[quiz.currentQuestion].Answer
  const config = { mass: 5, tension: 2000, friction: 200 }
  const transitions = useTransition(
    Questions[quiz.currentQuestion],
    item => item.Key,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 }
    }
  )
  const trail = useTrail(CurrentQuestion.Options.length, {
    config,
    opacity: 1
  })

  return (
    <Row>
      <ArrowLeft />
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props} className="QuizCard">
          <Col xs={12} lg={6} className="QuestionContain">
            <h4>{item.Question}</h4>
            <p>{item.Info}</p>
          </Col>
          <Col xs={12} lg={6} className="AnswerContain">
            {CurrentQuestion.Options.map((option, index) => (
              <AnswerCard i={index} />
            ))}
          </Col>
        </animated.div>
      ))}
      <ArrowRight answered={answered && answered} />
    </Row>
  )
}

export default QuizSlide
/*
{CurrentQuestion.Options.map((ans, i, step) => (
  <AnswerCard ans={ans[0]} sleepValue={ans[1]} stressValue={ans[2]} i={i} question={quiz.currentQuestion} />
))}*/
