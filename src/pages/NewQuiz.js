import React, { useState } from 'react'
import styled from "styled-components"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import {useSpring, animated} from 'react-spring'

import {
  Param1,
  Param2,
  Param3,
  Param4,
  Param5,
  Param6,
  Param7,
  Param8
} from '../components/HomePage/QuizParam'

const QuizContain = styled(Container)`
  height:80vh;
  color:#ffffff;

  .row{
    height:100%
  }
`
const QuestionContain = styled(Col)`
  display:flex;
  align-items:center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  margin-left:15px
`
const QuestionText = styled(animated.h4)`
  font-size:6em;
  font-weight:900;
  color:#a6daf0;
`
const AnswerContain = styled(Col)`

  border-left: 2px solid rgba(255, 255, 255, 0.3);
  border-right: 2px solid rgba(255, 255, 255, 0.3);
  padding-left:0;
  padding-right:0;
  margin-right:15px;

  ul{
    display:flex;
    flex-direction:column;
  }
`




const AnswerBlock = styled.li`
  display:flex;
  flex:1;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  align-items:center;
  padding-left:40px;
  transition:all 0.3s;
  cursor:pointer;
  transition:all 0.3s;


  &:hover{
    background:#010813;
  }
  h5{
    font-weight: 900;
    line-height: 1em;
    font-size:5em;
    height: 1.3em;
    padding-right:30px;
    color:#F9BEBD;
  }
  p{
    font-size:2em;

  }

  ${props => {
      if (props.toggle){
        return `
          background:#ACF0B5
          &:hover{background:#ACF0B5}
          h5{color:#010813}
          p{color:#010813 }



        `
      }
  }};
`




const QuizPage = () => {
  const spring = useSpring({opacity: 1, from: {opacity: 0}})
  const [steps, setSteps] = useState(0)
  const [quiz, setQuiz] = useState([
    {
      id: 1,
      Q: 'How easy do you find it to fall asleep at night ?',
      A: [
        'I fall asleep straight away',
        'It takes 15 – 20 mins',
        'It takes more than 20 mins'
      ],
      S: ''
    },
    { id: 2, Q: 'Do you have a bedtime routine?', A: ['Yes', 'No'], S: '' },
    {
      id: 3,
      Q: 'How do you feel when you wake up in the morning?',
      A: [
        'I feel great, full of beans and ready to face the day',
        'I feel ok',
        'I feel tired and lethargic'
      ],
      S: ''
    },
    {
      id: 4,
      Q: 'Do you feel like you need a nap in the day?',
      A: ['Never', 'Sometimes', 'Always'],
      S: ''
    },
    {
      id: 5,
      Q: 'Do you have trouble controlling your temperature at night?',
      A: ['Yes, all the time', 'Sometimes', 'Never'],
      S: ''
    },
    {
      id: 6,
      Q: 'How do you feel in the day?',
      A: [
        'Generally pretty good',
        'Ok, but I can get annoyed easily',
        'Mostly grumpy and irritable'
      ],
      S: ''
    },
    {
      id: 7,
      Q: 'How many times do you wake in the night?',
      A: ['Never', 'Sometimes', 'All the time'],
      S: ''
    },
    {
      id: 8,
      Q:
        'If you wake in the night, how long does it take to get back to sleep?',
      A: ['Straight away', 'About 15 minutes', 'More than 15 minutes'],
      S: ''
    },
    {
      id: 9,
      Q: 'How much time do you spend awake in the night in total?',
      A: ['I don’t wake in the night', 'About an hour', 'More than an hour'],
      S: ''
    },
    {
      id: 10,
      Q: 'Do you find you’re always tense and find it hard to relax?',
      A: [
        'No, I’m pretty chilled most of the time',
        'Yes, sometimes I find things stressful',
        'Yes, I’m always on edge'
      ],
      S: ''
    },
    {
      id: 11,
      Q: 'Do you have trouble coping with your emotions?',
      A: [
        'No, I’m emotionally stable',
        'Yes, my emotions are all over the place'
      ],
      S: ''
    },
    {
      id: 12,
      Q: 'Do you work shifts?',
      A: ['Yes', 'No'],
      S: ''
    }
  ])

  const letters = {
    '1':'a',
    '2':'b',
    '3':'c',
    '4':'d',
    }
  const [active, setActive] = useState(null)

  const selectAnswer = (id, answer, i) => {
    let newQuiz = [...quiz]

    setTimeout(function(){
      newQuiz[id].S = i
      setQuiz(newQuiz)
      setSteps(steps + 1);
    }, 300);

    // newQuiz[id].S = answer

  }
  return (
    <QuizContain  fluid>

      {quiz[steps] !== undefined ? (
        <Row>
          <QuestionContain>
            <QuestionText style={spring}>{quiz[steps].Q}</QuestionText>
          </QuestionContain>
          <AnswerContain>
            <ul>
            {quiz[steps].A.map((ans, i) => (
              <AnswerBlock key={ans + i}  onClick={() => selectAnswer(steps, ans, i) }  toggle={active === (ans + i) ? 1 : 0}>
                <h5>{letters[i + 1]}.</h5><p>{ans}</p>
              </AnswerBlock>
              ))}
            </ul>
          </AnswerContain>
        </Row>
      ) : (
        <div>
          <h2>Suggestions</h2>
          {quiz.map(q => {
            if (q.id === 1 && (q.S === 1 || q.S === 2)) {
              return <Param1 />
            } else if (q.No === 2 && q.S === 1) {
              return (
                <div>
                  <Param2 />
                  <Param1 />
                </div>
              )
            } else if (q.id === 3 && q.S === 2) {
              return <Param3 />
            } else if (q.id === 4 && (q.S === 1 || q.S === 2)) {
              return <Param3 />
            } else if (q.id === 5 && (q.S === 1 || q.S === 2)) {
              return <Param4 />
            }
          })}
        </div>
      )}

    </QuizContain>
  )
}
export default QuizPage