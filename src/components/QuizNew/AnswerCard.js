import React, { useState } from 'react'
import { useStateValue } from '../../context/SiteContext'


const AnswerCard = ({i}) => {
    const [{ quiz }, dispatch] = useStateValue();
    const Question = quiz.questions[quiz.currentQuestion]

    return (
        <div 
        className={Question.Answer === i ? "AnswerBlock active" : "AnswerBlock"}
        key={i}
        onClick={() => dispatch({
          type: 'selectAnswer',
          question: quiz.currentQuestion,
          answer: i,
          sleep: Question.Options[i][1],
          stress: Question.Options[i][2]
        })}
         >
         <p>{Question.Options[i][0]}</p>
        </div>
    )

  }

export default AnswerCard
