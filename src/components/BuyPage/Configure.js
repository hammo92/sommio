import React, { useState, useRef } from 'react'
import { useStaticQuery } from 'gatsby'
import { Link } from 'gatsby'
import { useTrail, animated, useTransition, useSpring } from 'react-spring'
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


const CarouselInner = ({product, width, page}) => {
  const pages = [
    ({ style }) => <animated.div style={{ ...style }}><WeightPage weights={product.weights}/></animated.div>,
    ({ style }) => <animated.div style={{ ...style }}><WeightPage weights={product.weights}/></animated.div>,
    ({ style }) => <animated.div style={{ ...style }}>C</animated.div>,
  ]

  /*const size = Object.keys(product).length;
  //console.log("product =", product, size)
  let elements = new Array(Object.keys(product).length) 
  Object.keys(product).map((key,i)=>{
    elements[i] = product[key]
  })*/
  console.log("product", product)

  //array of visible cards
  const config = { mass: 1.5, tension: 170, friction: 25 }

  //map cards array and set position variables
  /*let cards = show.map((card, i) => {
    const column = i
    const xy = [width * column, 0]
    const cardWidth = width - 30
    return { ...card, xy, width: cardWidth }
  })
  */
  const transitions = useTransition(page, p => p, {
    from: { opacity: 1, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 1, transform: 'translate3d(-100%,0,0)' },
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

  return(
    <div className="simple-trans-main" >
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item]
        return <Page key={key} style={props} />
      })}
    </div>
  )

}

const Configure = ({product}) => {
  /* visibility sensor */


  /* unused for setting breakpoints through props
  const { breakpoints : breakpoints = [1500,1000,600], slides : slides  = [3,2,1.3]} = responsive
  breakpoints.map((item,i) => {
    breakpoints[i] = `(min-width: ${item}px)`
  })

  /*set carousel to empty when out of view */
  //const elements = contents
  
  //responsive width hook
  const [bind, { width }] = useMeasure()

  //init paging
  const [page, setPage] = useState(1)

  return (
      <div
      ref={bind}
      className={'ConfigureBody'}
    >
      <div className="container-fluid">
        <div className="helpHeading">
          <AniText type="h3">Hello</AniText>
          <div className="navIcons">
            <div
              onClick={() => setPage(page - 1)}
            >
              <Button type="round small">
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
            </div>
            <div
              onClick={() => setPage(page + 1)}
            >
              <Button type="round small">
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
          </div>
        </div>
      <CarouselInner width={width} product={product} page={page}/>}
      </div>
      </div>
      
  )
}
export default Configure
