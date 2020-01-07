import React, { useState } from 'react'
import styled from "styled-components"
import QuizSlide from "../components/QuizNew/QuizSlide"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { useStateValue } from '../context/SiteContext'
import Results from '../components/QuizNew/Results'


const QuizPage = () => {
  const [{ quiz }, dispatch] = useStateValue();
  
  return (

      <Container className="QuizContain"  fluid>
          {quiz.complete ?
            <Results /> :
            <QuizSlide /> 
          }
      </Container>

  )
}
export default QuizPage
