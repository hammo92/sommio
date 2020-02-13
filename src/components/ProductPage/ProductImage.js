import React, { useContext, useRef, useState, useEffect, Fragment } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Slider from 'react-slick'
import { CartContext } from '../../context/CartContext'
import { useSprings, useTransition, useSpring, animated, useTrail } from 'react-spring'
import {  useDrag } from 'react-use-gesture'
import clamp from 'lodash-es/clamp'
import useMeasure from 'react-use-measure'

function Viewpager({pages, width}) {
  const index = useRef(0)
  const [currentSlide, setCurrent] = useState(0)
  const config = { mass: 1 , tension: 180, friction: 30 }
  let indicators = pages.map((indicator,i) => {
    const indicatorWidth = width / pages.length - 20
    const xy = [(width/pages.length) * i, 0]
    return{...indicator, position: i, width:indicatorWidth, xy}
  })
  
  console.log("current slide => ", currentSlide)

  const transition = useTransition(indicators, item => item.human_id, {
    from:({ xy, width }) => ({ xy, width, opacity:0 }),
    enter:({ xy, width, position }) => ({ xy, width, opacity: position === currentSlide  ? 1 : 0.2 }),
    update: ({ xy, width, position }) => ({ xy, width, opacity: position === currentSlide  ? 1 : 0.2 }),
    leave:{opacity:0}
  })

  const [props, set] = useSprings(pages.length, i => ({
      x: i * width,
      scale: 1,
      display: 'block',
      zIndex: '1',
      config 
    }))
  
  const bind = useDrag(({
    down,
    movement: [mx],
    direction: [xDir],
    distance,
    cancel 
   }) => {
   if (down && distance > width / 2) cancel((index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, pages.length - 1)))
   setCurrent(index.current)
   set(i => {
     const x = (i - index.current) * width + (down ? mx : 0)
     const scale =  down ? 1 - distance / width / 2 : 1
     return { x, scale, display: 'block', zIndex: i === index.current ? '0' : '10'}
   })
 })
 return  (
   <Fragment>
    <div className="indicatorWrap">
      {transition.map(({item, props:{xy, ...rest}, key}) => (
        <animated.div 
        className="photoIndicator"
        style={{transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`), ...rest }}
        />

      ))}
    </div>
    {
      props.map(({ x, display, scale, zIndex }, i) => (
      <animated.div className="springSlide" {...bind()} key={i} style={{zIndex, display, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
        <animated.div style={{ transform: scale.interpolate(scale => `scale(${scale})`), backgroundImage: `url(${pages[i].url})`,  }} />
      </animated.div>
    ))
    }
  </Fragment>
 )
}


function ProductImage({ productId, selectedVariationId }) {
   //responsive width hook
   const [bind, {width}] = useMeasure()

  const { allBuiltonProduct } = useStaticQuery(
    graphql`
      query {
        allBuiltonProduct {
          nodes {
            id
            _id {
              _oid
            }
            media {
              human_id
              url
            }
            name
            image_url
          }
        }
      }
    `
  )

  const data = allBuiltonProduct.nodes.find(({_id: {_oid}}) => _oid === selectedVariationId).media
  const [sliderWidth, setSliderWidth] = useState(0)
  console.log(sliderWidth)
  const sliderRef = useRef()
  /*useEffect(() => {  
    setSliderWidth(sliderRef.current.clientWidth)   
  },[])*/
  
  const {
    selectedCover,
    selectedWeight,
    selectedCoverImageHumanId,
    selectedWeightImageHumanId
  } = useContext(CartContext)

  const mainProduct = allBuiltonProduct.nodes.filter(product => {
    return product.id === productId
  })
  const [images, setImages] = useState(data)
  
  useEffect(() => setImages(data),[data])

  return(
    <div ref={bind} className="col-12 col-lg-8 " >
      <div  className="springWrap">
        <Viewpager pages={images} width={width} />
      </div>
    </div>
  )
 
}
export default ProductImage
