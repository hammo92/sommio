import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import QuizSlide from "../components/QuizNew/QuizSlide"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { useStateValue } from '../context/SiteContext'
import Results from '../components/QuizNew/Results'
import Layout from "../components/Layout/Layout";
import TransitionLink, { TransitionState } from 'gatsby-plugin-transition-link'


export const QuizInner = () => {
  const [{ quiz }, dispatch] = useStateValue();  
  return (
    <Container className={quiz.complete ? "QuizContain" : "QuizContain setHeight" } fluid>
          {quiz.complete ?
            <Results /> :
            <QuizSlide /> 
          }
    </Container>
  )
}


const QuizPage = () => {
  
  return (
    <TransitionState>
    
      {({transitionStatus}) => (
        <Layout transitionStatus={transitionStatus}>
          <QuizInner></QuizInner>
        </Layout>    
      )}
    
    </TransitionState>  
  )
}
export default QuizPage
