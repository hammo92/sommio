import React from 'react'
import { FaArrowLeft, FaArrowRight, FaCircle } from 'react-icons/fa';
import { useStateValue } from '../../context/SiteContext';
import {useTransition, animated} from 'react-spring'




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
    const questionCount = quiz['questions'].length - 1
    const transitions = useTransition(answered, null, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        })
    return (
        <div 
          className={answered === false ? "arrow next disabled" : "arrow next"}
          onClick={
            answered !== false && quiz.currentQuestion < questionCount ?
            () => dispatch({
                type: 'changeQuestion',
                nextQuestion: quiz.currentQuestion + 1
            }):
            answered !== false ? 
            () => dispatch({
                type: 'setCompleted',
            }): console.log(' ')
        }
          >
        {
          transitions.map(({ item, key, props }) => 
            item !== false
            ? <animated.div className="disabled" style={props}><FaArrowRight /></animated.div>
            : <animated.div style={props}><FaCircle /></animated.div>
            )
        }
        </div>
    )
}
