import React, { useState } from 'react'
import { useStateValue } from '../../context/SiteContext'


const AnswerCard = ({ans, i}) => {
    const [{ quiz }, dispatch] = useStateValue();
    console.log(quiz.currentQuestion)
    return (
        <div 
        className="AnswerBlock" 
        key={i}
         >
          <p>{ans}</p>
        </div>
    )

  }

export default AnswerCard
