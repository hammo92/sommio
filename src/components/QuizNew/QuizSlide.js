import React, { useState } from 'react'
import AnswerCard from './AnswerCard'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {ArrowLeft, ArrowRight} from './Arrows'
import { useStateValue } from '../../context/SiteContext';
import YAMLData from '../../../content/Quiz.yaml' 
import {useTransition, animated} from 'react-spring'

const Questions = YAMLData

const QuizSlide = () => {
  const [{ quiz }, dispatch] = useStateValue();
  const CurrentQuestion = Questions[quiz.currentQuestion]
  console.log(quiz)
  const answered = quiz.questions[quiz.currentQuestion].Answer
  const transitions = useTransition(Questions[quiz.currentQuestion], item => item.Key, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  } )
  return(
      <Row>
        <ArrowLeft />
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props} className="QuizCard">
            <Col className="QuestionContain" >
              <h4>{item.Question}</h4>
              <p>{item.Info}</p>
            </Col>
            <Col className="AnswerContain">
              {CurrentQuestion.Options.map((ans, i, step) => (
                <AnswerCard ans={ans[0]} sleepValue={ans[1]} stressValue={ans[2]} i={i} question={quiz.currentQuestion} />
              ))}
            </Col>
          </animated.div>
        ))}        
        <ArrowRight answered={answered} />
        
      </Row>
  )
}

export default QuizSlide