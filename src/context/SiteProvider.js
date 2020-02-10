import React from 'react'
import { StateProvider } from './SiteContext';
import YAMLData from '../../content/Quiz.yaml' 

const initialState = {
    theme: { primary: 'green' },
    quiz:{
      questions: YAMLData,
      currentQuestion: 0,
      complete:false,
      sleepScore:0,
      stressScore:0
    },
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeTheme':
        return {
          ...state,
          theme: action.newTheme
        };
      
      case 'changeQuestion':
        return{
          ...state,
          quiz: {
          ...state.quiz,
          currentQuestion: action.nextQuestion
        }};
  
      case 'selectAnswer':
        return{
        ...state,
        quiz:{
          ...state.quiz,
          questions:{
            ...state.quiz.questions,
            [action.question]:{
              ...state.quiz.questions[action.question],
              Answer: action.answer,
              sleepScore: action.sleep,
              stressScore: action.stress,
            }
            
          }
          
        }};
        case 'setScore':
        return {
          ...state,
          quiz:{
            ...state.quiz,
            sleepScore: action.sleepScore,
  
          }
        };
        
        case 'setCompleted':
        return {
          ...state,
          quiz:{
            ...state.quiz,
            complete:true,
            sleepScore: action.score,
            stressScore:action.stress
  
          }
        };
        
        
      default:
        return state;
    }
  };

  
  export const SiteProvider = ({ children, ...props }) => {
      return (
        <StateProvider initialState={initialState} reducer={reducer}>
            {children}
        </StateProvider>
      )
  }
  