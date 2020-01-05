import React, { useState } from 'react'
import { useStateValue } from '../../context/SiteContext'


const AnswerCard = ({ans, i, question, sleepValue, stressValue}) => {
    const [{ quiz }, dispatch] = useStateValue();
    const answer = quiz.questions[question].Answer;

    return (
        <div 
        className={answer === i ? "AnswerBlock active" : "AnswerBlock"}
        key={i}
        onClick={() => dispatch({
          type: 'selectAnswer',
          question:question,
          answer: i,
          sleep: sleepValue,
          stress: stressValue
        })}
         >
          <p>{ans}</p>
        </div>
    )

  }

export default AnswerCard
