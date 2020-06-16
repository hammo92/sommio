import React, { useState, useEffect, useRef } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import VisibilitySensor from 'react-visibility-sensor'

const Button = ({ type, text, link, disabled, children, clickFunction }) => {
  const [isVisible, setVisibility] = useState(false)
  const onChange = visiblity => {
    setVisibility(visiblity)
  }
  const configTwo = {
    mass: 1,
    tension: 252,
    friction: 19
  }
  const [props, set] = useSpring(() => ({
    transform:"scale(0)",
    top:  0,
    left:  0,
    opacity: 0,
    config: configTwo
  }))
  useEffect(() => {
    set({
      transform: isVisible ? "scale(1)" : "scale(0)",
      top: disabled ? 0 : isVisible ? -5 : 0,
      left: disabled ? 0 : isVisible ? -5 : 0,
      opacity: disabled && isVisible ? 0.3 : isVisible ? 1 : 0
    })
  },[isVisible])
  const bind = useGesture({
    onHover: props => {
      if (!disabled)
        set({
          top: props.hovering ? -2 : -5,
          left: props.hovering ? -2 : -5
        })
    }
  })
  return (
    <VisibilitySensor onChange={onChange} partialVisibility scrollCheck={true}>
    <button
      className={`buttonWrapper ${type}`}
      {...bind()}
      onClick={clickFunction}
      disabled={disabled}
    >
      {link && <AniLink paintDrip to={link} hex="#D8A8FF"></AniLink>}
      <animated.div style={props.transform, props.opacity } className="buttonShadow" />
      <animated.div style={props} className="buttonInner">
        {children}
      </animated.div>
      </button>
    </VisibilitySensor>
  )
}

export default Button
