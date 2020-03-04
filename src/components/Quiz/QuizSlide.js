import React, { useState } from 'react'
import AnswerCard from './AnswerCard'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useStateValue } from '../../context/SiteContext';
import YAMLData from '../../../content/Quiz.yaml' 
import Button from '../Button'


const Questions = YAMLData

const QuizSlide = () => {
    const [{ quiz }, dispatch] = useStateValue();
    const CurrentQuestion = Questions[quiz.currentQuestion]
    return(
        <Row>
          {quiz.currentQuestion != 0 ? (<div 
          className="back"
          onClick={() => dispatch({
            type: 'changeQuestion',
            nextQuestion: {currentQuestion: quiz.currentQuestion - 1}
          })}
          >
            <FaArrowLeft />
          </div>) : null}
          <div className="QuizCard">
          <Col className="QuestionContain" >
            <h4>{CurrentQuestion.Question}</h4>
            <p>{CurrentQuestion.Info}</p>
          </Col>
          <Col className="AnswerContain">
            {CurrentQuestion.Options.map((ans, i, step) => (
              <AnswerCard ans={ans} key={i} />
            ))}
          </Col>
          </div>
          {quiz.currentQuestion.answered !== false ? (<div 
            className="next"
            onClick={() => dispatch({
              type: 'changeQuestion',
              nextQuestion: {currentQuestion: quiz.currentQuestion + 1}
            })}
            >
            <Button type="long">
              <FaArrowRight />
            </Button>
            </div>) : null}
          
        </Row>
    )
}

export default QuizSlide