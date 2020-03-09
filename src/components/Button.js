import React, { useState, useEffect, useRef } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

const Button = ({type, text, link, disabled, children}) => {
    const domTarget = useRef(null)
    const [hovered, setHovered] = useState(false)
    const configTwo ={
        mass: 2,
        tension: 252,
        friction: 19
      }
    const [props, set] = useSpring(() => ({
        top: disabled ? 0 : -5,
        left: disabled ? 0 : -5,
        opacity: disabled ? 0.3 : 1,
        config:configTwo,

    }))
    useEffect(() => {
        set({
            top: disabled ? 0 :  -5,
            left: disabled ? 0 : -5,
            opacity: disabled ? 0.3 : 1,
        })
    }, [disabled])
    console.log("props => ", props)
    const bind = useGesture({
        onHover: (props) => {
              if(!disabled)
              set({
                  top: props.hovering  ? -2 :  -5,
                  left:props.hovering  ? -2 :  -5,
                })
            },
    })
    return (
        <button className={`buttonWrapper ${type}`} {...bind()}>
            {link && <AniLink paintDrip to={link} hex="#D8A8FF"></AniLink>}
            <animated.div style={ props.opacity }   className="buttonShadow" />
            <animated.div style={props}  className="buttonInner">
                {children}
            </animated.div>            
        </button>
    )
}

export default Button 