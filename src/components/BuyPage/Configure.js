import React, { useState, useRef } from 'react'
import { useStaticQuery } from 'gatsby'
import { Link } from 'gatsby'
import { useTrail, animated, useTransition, useSpring, config } from 'react-spring'
import VisibilitySensor from 'react-visibility-sensor'
import useMedia from '../../hooks/useMedia'
import useMeasure from 'react-use-measure'
import AniText from '../AnimatedText/AniText'
import Button from '../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Slide from './MainSlide'
import WeightPage from './WeightPage'
import SizePage from './SizePage'
import CoverPage from './CoverPage'
import ProductService from '../ProductPage/ProductService'
import { useStateValue } from '../../context/SiteContext';
import { faCircle} from '@fortawesome/free-solid-svg-icons'
import StepNav from './StepNav'

const CarouselInner = ({product, page}) => {
  const pages = [
    ({ style }) => <animated.div style={{ ...style }} className="pageWrap"><SizePage sizes={product.sizes}/></animated.div>,
    ({ style }) => <animated.div style={{ ...style }} className="pageWrap"><WeightPage weights={product.weights}/></animated.div>,
    ({ style }) => <animated.div style={{ ...style }} className="pageWrap"><CoverPage covers={product.covers}/></animated.div>
  ]

  /*const size = Object.keys(product).length;
  //console.log("product =", product, size) 
  let elements = new Array(Object.keys(product).length) 
  Object.keys(product).map((key,i)=>{
    elements[i] = product[key]
  })*/

  //array of visible cards
  //const config = { mass: 1.5, tension: 170, friction: 25 }

  //map cards array and set position variables
  /*let cards = show.map((card, i) => {
    const column = i
    const xy = [width * column, 0]
    const cardWidth = width - 30
    return { ...card, xy, width: cardWidth }
  })
  */
  const transitions = useTransition(page, p => p, {
    from: { opacity: 0, transform: 'translate3d(50%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    config: config.gentle,
  })
/*
  //react-spring transition for cards
  const transition = useTransition(cards, item => item.id, {
    trail: 300 / columns,
    from: ({ xy, width }) => ({ xy, width, opacity: 0 }),
    enter: ({ xy, width }) => ({ xy, width, opacity: 1 }),
    update: ({ xy, width }) => ({ xy, width }),
    leave: { opacity: 0 },
    config
  })*/

  return (
  <div className='container-fluid configureWrap position-relative'>
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item]
        return <Page key={key} style={props} />
      })}
  </div>
  )



}

const StepIndicator = ({name, active, first}) => {
  return(
    <>
    {!first && 
    <div className={`stepConnector ${active ? "active" : ""}`}>
      <span />
    </div>
    }
    <div className={`stepIndicator ${active ? "active" : ""}`}>
      <p>{name}</p>
      <FontAwesomeIcon icon={faCircle} />
      <p>text</p>
    </div>
    
  </>
  )
}
const Stepper = ({page}) => {
  
  const steps = ["Product", "Size", "Weight", "Cover"]
  return(
    <div className="stepper">
    {steps.map((item, i) => (
        <StepIndicator name={steps[i]} active={page >= i - 1} first={i === 0}/>
    ))}
    </div>
  )
}

const NavBar = ({ product }) => {
  const [{ configure }, dispatch] = useStateValue();
  return(
    <div className="container-fluid configNav" >

        <button className="stepBack" onClick={
          configure.page !== 0 && (
          () => dispatch({
          type: 'changeConfigureStep',
          nextQuestion: configure.page - 1
        }))}>
          <FontAwesomeIcon icon={faArrowLeft} /> back
        </button>
        <StepNav/>
        <Button type={"thin"} clickFunction={() => dispatch({
          type: 'changeConfigureStep',
          nextQuestion: configure.page + 1
        })}>
          <p>next</p> <FontAwesomeIcon icon={faArrowRight} />
        </Button>
    </div>
  )
} 

const Configure = ({ product }) => {
  const [{ configure }, dispatch] = useStateValue();
  /* visibility sensor */


  /* unused for setting breakpoints through props
  const { breakpoints : breakpoints = [1500,1000,600], slides : slides  = [3,2,1.3]} = responsive
  breakpoints.map((item,i) => {
    breakpoints[i] = `(min-width: ${item}px)`
  })

  /*set carousel to empty when out of view */
  //const elements = contents
  

  return (
    <>
      <div className='container-fluid ConfigureBody '>
      <div className="row titleContain">
        <div className="column title">
          <FontAwesomeIcon icon={faArrowLeft} />
          <AniText type="h3">{product.product.nodes[0].name}</AniText>
        </div>
        <div className="column priceBlock">
          <h3>{
            `Your ${product.product.nodes[0].name} 
            price £${product.product.nodes[0].final_price}
            ${configure.size.addPrice !== 0 ? (' + ' + configure.size.addPrice) : ""}
            ${configure.weight.addPrice !== 0 ? (' + ' + configure.weight.addPrice) : ""}
            ${configure.cover.addPrice !== 0 ? (' + ' + configure.cover.addPrice) : ""}`}
            </h3>
        </div>   
        </div>
      </div>
      <CarouselInner product={product} page={configure.page} />
      <NavBar product={product}/>

      
    </>
      
  )
}
export default Configure
