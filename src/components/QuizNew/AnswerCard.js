import React, { useState } from 'react'
import { useStateValue } from '../../context/SiteContext'


const AnswerCard = ({i}) => {
    const [{ quiz }, dispatch] = useStateValue();
    const Question = quiz.questions[quiz.currentQuestion]
    console.log("quiz slide context =>", quiz)

    return (
        <div 
        className={Question.Answer === i + 1? "AnswerBlock active" : "AnswerBlock"}
        key={i}
        onClick={() => dispatch({
          type: 'selectAnswer',
          question: quiz.currentQuestion,
          answer: i + 1,
          sleep: Question.Options[i][1],
          stress: Question.Options[i][2]
        })}
         >
        <span>{i == 0 ? "a" : i == 1 ? "b" : i == 2 ? "c" : "d"}. </span>
          <p>{Question.Options[i][0]}</p>
        </div>
    )

  }

export default AnswerCard
