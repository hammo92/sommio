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
    cart:{
      drawer:false,
    },
    configure: {
      mainProduct:"Weighted Blanket",
      page: 0,
      size: {
        id: false,
        addPrice: 0,
        size:false,
      },
      weight: {
        id: false,
        addPrice: 0,
        weight:false,
      },
      cover: {
        id: false,
        addPrice: 0,
        cover:false,
      },
      metric:true,
    }
    
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
        case 'setCart':
        return {
          ...state,
          cart:action.setCart
        };
        case 'setUnit':
        return {
          ...state,
          configure: {
            ...state.configure,
            metric: action.setUnit
          }
        };
        case 'changeConfigureStep':
          return{
            ...state,
            configure: {
            ...state.configure,
            page: action.nextQuestion
          }
        };
        case 'changeConfigureWeight':
          return{
            ...state,
            configure: {
            ...state.configure,
              weight:{
                ...state.configure.weight,
                id: action.setId,
                addPrice: action.setAddPrice,
                weight:action.setWeight,
              },
              page: action.nextQuestion
        }};
        case 'changeConfigureSize':
          return{
            ...state,
            configure: {
            ...state.configure,
              size:{
                ...state.configure.size,
                id: action.setId,
                addPrice: action.setAddPrice,
                size:action.setSize,

              },
              page: action.nextQuestion
        }};
        case 'changeConfigureCover':
          return{
            ...state,
            configure: {
            ...state.configure,
              cover:{
                ...state.configure.weight,
                id: action.setId,
                addPrice: action.setAddPrice,
                cover:action.setCover,
              },page: action.nextQuestion
        }};
        
        
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
  