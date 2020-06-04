import React, { useState, useEffect } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { animated, useTrail } from 'react-spring'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

const AniText = ({ children, head, type }) => {
  const [isVisible, setVisibility] = useState(false)
  const onChange = visiblity => {
    setVisibility(visiblity)
  }
  const CustomTag = type ? type : `p`

  const words = children ? children.split(' ') : head ? head.split(' ') : ''
  const config = { mass: 0.1, tension: 900, friction: 40 }
  const trail = useTrail(words.length, {
    from: {
      opacity: 1,
      transform: `translate3d(0px,0px,0)`
    },
    to: {
      opacity: !isVisible ? 0.3 : 1,
      transform: !isVisible
        ? `translate3d(0px,20px,0)`
        : `translate3d(0px,0px,0)`
    },
    config
  })
  const factor = Math.random().toString()

  return (
    <VisibilitySensor onChange={onChange} partialVisibility scrollCheck={true}>
      <CustomTag>
        {trail.map(({ opacity, transform }, index) => (
          <animated.span
            style={{ opacity, transform }}
          >
            {words[index]}
          </animated.span>
        ))}
        </CustomTag>
    </VisibilitySensor>
    
  )
}
export default AniText
