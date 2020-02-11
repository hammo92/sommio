import React, { useContext, useRef, useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Slider from 'react-slick'
import { CartContext } from '../../context/CartContext'
import { useSprings, useSpring, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import clamp from 'lodash-es/clamp'

function Viewpager({pages, width}) {
  const index = useRef(0)
  const [props, set] = useSprings(pages.length, i => ({ x: i * width, sc: 1, display: 'block' }))


  const bind = useGesture(
    useGesture({ onDrag: ({ local: [x] }) => set({ y: x * -1.5 }) })
  )
  
  return props.map(({ x, display, sc }, i) => (
    
    <animated.div className="springSlide" {...bind()} key={i} style={{ display, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
      <animated.div style={{ transform: sc.interpolate(s => `scale(${s})`), backgroundImage: `url(${pages[i].url})` }} />
    </animated.div>
  ))
}


function ProductImage({ productId, selectedVariationId }) {
  const [sliderWidth, setSliderWidth] = useState(0)
  const sliderRef = useRef(null)
  useEffect(() => {  
    setSliderWidth(sliderRef.current.clientWidth)   
  },[])
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
  const {
    selectedCover,
    selectedWeight,
    selectedCoverImageHumanId,
    selectedWeightImageHumanId
  } = useContext(CartContext)

  const mainProduct = allBuiltonProduct.nodes.filter(product => {
    return product.id === productId
  })
  const images = allBuiltonProduct.nodes.find(({_id: {_oid}}) => _oid === selectedVariationId).media

  console.log("images =>", images.length)
  return(
    <div className="col-12 col-lg-8 " ref={sliderRef}>
      <Viewpager pages={images} width={sliderWidth} />
    </div>
  )
 
}
export default ProductImage
