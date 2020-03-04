import React from 'react'
import { FaArrowLeft, FaArrowRight, FaCircle } from 'react-icons/fa';
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
            <FaArrowLeft />
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
          className={answered === false ? "arrow next disabled" : "arrow next"}
          onClick={
            answered !== false && quiz.currentQuestion < 10 ?
            () => dispatch({
                type: 'changeQuestion',
                nextQuestion: quiz.currentQuestion + 1
            }):
            answered !== false ? 
            () => dispatch({
                type: 'setCompleted',
                score: sleep,
                stress: stress,
            }): console.log(' ')
        }
      >
        <Button type={`long ${!answered && "disabled"}`}>
             <FaArrowRight />
        </Button>
        </div>
    )
}
