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
import ProductService from '../ProductPage/ProductService'
import { useStateValue } from '../../context/SiteContext';
const AnimatedWeightPage = animated(WeightPage)

const CarouselInner = ({product, page}) => {
  const pages = [
    ({ style }) => <animated.div style={{ ...style }} className="pageWrap"><WeightPage weights={product.weights}/></animated.div>,
    ({ style }) => <animated.div style={{ ...style }} className="pageWrap"><WeightPage weights={product.weights}/></animated.div>,
    ({ style }) => <animated.div style={{ ...style }} className="pageWrap"><WeightPage weights={product.weights}/></animated.div>
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
          <h3>{`from £${product.product.nodes[0].final_price}`}</h3>
        </div>   
        </div>
      </div>
      <CarouselInner product={product} page={configure.page} />

      <div className="container-fluid navIcons" >
        

            <div
            onClick={
                configure.page !== 0 && (
                () => dispatch({
                type: 'changeConfigureStep',
                nextQuestion: configure.page - 1
              }))}
            >
              <Button >
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
            </div>
            <div
              onClick={() => dispatch({
                type: 'changeConfigureStep',
                nextQuestion: configure.page + 1
              })}
            >
              <Button type="round small">
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
          </div>
    </>
      
  )
}
export default Configure
