import React from 'react'
import QuizSlide from '../components/Quiz/QuizSlide'
import Container from 'react-bootstrap/Container'
import Layout from '../components/Layout/Layout'

const QuizPage = () => {
  return (
    <Layout>
      <Container className="QuizContain" fluid>
        <QuizSlide />
      </Container>
    </Layout>
  )
}
export default QuizPage
