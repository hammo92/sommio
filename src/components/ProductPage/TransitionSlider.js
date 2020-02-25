import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  Fragment,
  useLayoutEffect
} from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Slider from 'react-slick'
import { ShippingAndUserDetailContext } from '../../context/ShippingAndUserDetailContext'
import {
  useSprings,
  useTransition,
  useSpring,
  animated,
  useTrail
} from 'react-spring'
import { useDrag } from 'react-use-gesture'
import clamp from 'lodash-es/clamp'
import useMeasure from 'react-use-measure'
import { fieldSubscriptionItems } from 'final-form'

function Viewpager({ pages, width }) {
  const index = useRef(0)
  const [cards, setCards] = useState(
    pages.map((card, i) => {
      return { ...card, xy: [0, 0], scale: 1, order: i, width: 0 }
    })
  )
  const [currentSlide, setCurrent] = useState(0)
  const config = { mass: 1, tension: 180, friction: 30 }

  //update card details after width calculated
  useEffect(
    () =>
      setCards(
        pages.map((card, i) => {
          return {
            ...card,
            xy: [currentSlide === i ? 0 : width * i, 0],
            scale: 1,
            order: i,
            width: width
          }
        })
      ),
    [width, pages]
  )

  let indicators = pages.map((indicator, i) => {
    const indicatorWidth = width / pages.length - 20
    const xy = [(width / pages.length) * i, 0]
    return { ...indicator, position: i, width: indicatorWidth, xy }
  })

  const transition = useTransition(indicators, item => item.human_id, {
    from: ({ xy, width }) => ({ xy, width, opacity: 0 }),
    enter: ({ xy, width, position }) => ({
      xy,
      width,
      opacity: position === currentSlide ? 1 : 0.2
    }),
    update: ({ xy, width, position }) => ({
      xy,
      width,
      opacity: position === currentSlide ? 1 : 0.2
    }),
    leave: { opacity: 0 }
  })

  const cardTransition = useTransition(cards, item => item.human_id, {
    trail: 300 / cards.length,
    from: ({ xy, width, scale }) => ({ xy, width, opacity: 0, scale }),
    enter: ({ xy, width, scale }) => ({ xy, width, opacity: 1, scale }),
    update: ({ xy, scale }) => ({ xy, scale, opacity: 1 }),
    leave: { opacity: 0 },
    config
  })

  /*const [props, set] = useSprings(pages.length, i => ({
      x: i * width,
      scale: 1,
      display: 'block',
      zIndex: '1',
      config
    }))
  */
  const bind = useDrag(
    ({
      down,
      delta: [xDelta],
      movement: [mx],
      direction: [xDir],
      distance,
      cancel
    }) => {
      if (down && distance > width / 2)
        cancel(
          (index.current = clamp(
            index.current + (xDir > 0 ? -1 : 1),
            0,
            cards.length - 1
          ))
        )
      setCurrent(index.current)
      setCards(
        pages.map((card, i) => {
          const x = (i - index.current) * width + (down ? xDelta : 0)
          return { ...card, xy: [x, 0], scale: 1, order: i, width: width }
        })
      )
    }
  )
  return (
    <Fragment>
      <div className="indicatorWrap">
        {transition.map(({ item, props: { xy, ...rest }, key }) => (
          <animated.div
            className="photoIndicator"
            style={{
              transform: xy.interpolate(
                (x, y) => `translate3d(${x}px,${y}px,0)`
              ),
              ...rest
            }}
          />
        ))}
      </div>
      {cardTransition.map(({ item, props: { xy, scale, ...rest }, key }) => (
        <animated.div
          className="springSlide"
          {...bind()}
          key={key}
          style={{
            transform: xy.interpolate((x, y) => `translate3d(${x}px,0,0)`)
          }}
        >
          <animated.div
            style={{
              transform: scale.interpolate(scale => `scale(${scale})`),
              backgroundImage: `url(${item.url})`
            }}
          />
        </animated.div>
      ))}
      {/*
      props.map(({ x, display, scale, zIndex }, i) => (
      <animated.div className="springSlide" {...bind()} key={i} style={{zIndex, display, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
        <animated.div style={{ transform: scale.interpolate(scale => `scale(${scale})`), backgroundImage: `url(${pages[i].url})`,  }} />
      </animated.div>
    ))
      */}
    </Fragment>
  )
}

function ProductImage({ productId, selectedVariationId }) {
  //responsive width hook
  const [bind, { width }] = useMeasure()

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

  const data = allBuiltonProduct.nodes.find(
    ({ _id: { _oid } }) => _oid === selectedVariationId
  ).media

  const mainProduct = allBuiltonProduct.nodes.filter(product => {
    return product.id === productId
  })
  const [images, setImages] = useState(data)
  useEffect(() => setImages(data), [data])

  return (
    <div ref={bind} className="col-12 col-lg-8 ">
      <div className="springWrap">
        <Viewpager pages={images} width={width} />
      </div>
    </div>
  )
}
export default ProductImage
