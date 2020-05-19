import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useStateValue } from '../../context/SiteContext';

import Button from '../Button'



export const ArrowLeft = () => {
    const [{ quiz }, dispatch] = useStateValue();
    return (
        <div 
          className="arrow back"
          onClick={() => dispatch({
            type: 'changeQuestion',
            nextQuestion: quiz.currentQuestion - 1
          })}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
    )
}

export const ArrowRight = ({answered}) => {
    const [{ quiz }, dispatch] = useStateValue()
    var questions = Object.values(quiz.questions)
    let sleep = 0
    let stress = 0 
    for (const question of questions){
        sleep = sleep + question.sleepScore
        stress = stress + question.stressScore
    }
    return (
        <div 
          className={`arrow next` }
          onClick={
            answered && quiz.currentQuestion < 10 ?
            () => dispatch({
                type: 'changeQuestion',
                nextQuestion: quiz.currentQuestion + 1
            }):
            answered ? 
            () => dispatch({
                type: 'setCompleted',
                score: sleep,
                stress: stress,
            }): console.log(' ')
        }
      >
        <Button type={`long`} disabled={!answered}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
        </div>
    )
}
