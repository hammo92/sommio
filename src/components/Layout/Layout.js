import React, { useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ToastContainer } from 'react-toastify'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import { StateProvider } from '../../context/SiteContext';
import YAMLData from '../../../content/Quiz.yaml' 
import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'
import '../../styles/main.scss'



const toastOptions = {
  position: 'bottom-center',
  draggable: false,
  toastClassName: 'text-xl bg-black text-white text-center p-3 shadow-none',
  progressClassName: 'bg-white opacity-25',
  closeButton: false
}
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
          sleepScore: action.score

        }
      };
      
      
    default:
      return state;
  }
};

const Layout = ({ children }) => {
  const { site, allBuitlon } = useStaticQuery(categoriesQuery)

  const builtonProduct = allBuitlon.nodes.find(ele => {
    return ele.main_product === true && ele.tags.length > 0
  })

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sommio Gatsby</title>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <script src="https://x.klarnacdn.net/kp/lib/v1/api.js"></script>
        <script src="https://unpkg.com/@builton/core-sdk@latest/dist/main.bundle.js"></script>
      </Helmet>
      <Header
        siteTitle={site.siteMetadata.title}
        human_id={builtonProduct.human_id}
      />

      <main>{children}</main>
      <ToastContainer {...toastOptions} />
    </StateProvider>
  )
}

const categoriesQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }

    allBuitlon: allBuiltonProduct {
      nodes {
        id
        name
        human_id
        tags
        parents {
          _oid
        }
        main_product
      }
    }
  }
`

export default Layout
