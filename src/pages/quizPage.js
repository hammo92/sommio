import React, { useState } from 'react'
import styled from "styled-components"
import QuizSlide from "../components/Quiz/QuizSlide"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Layout from "../components/Layout/Layout";

const QuizPage = () => {

  return (
    <Layout>
      <Container className="QuizContain"  fluid>
          <QuizSlide /> 
      </Container>
    </Layout>
  )
}
export default QuizPage
