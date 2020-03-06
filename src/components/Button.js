import React, { useState, useEffect, useRef } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

const Button = ({type, text, link, children}) => {
    const domTarget = useRef(null)
    const [hovered, setHovered] = useState(false)
    const configTwo ={
        mass: 2,
        tension: 252,
        friction: 19
      }
    const [props, set] = useSpring(() => ({
        top: 0,
        left:0,
        s:1,
        config:configTwo,

    }))
    console.log("props => ", props)
    const bind = useGesture({
          onHover: (props) => {
              set({
                  top: props.hovering ? 2 : 0,
                  left:props.hovering ? 2 : 0,
                  s:props.hovering ? 1.2 : 1 
                })
            },
    })
    return (
        <button className={`buttonWrapper ${type}`} {...bind()}>
            {link && <AniLink paintDrip to={link} hex="#D8A8FF"></AniLink>}
            <div  className="buttonShadow" />
            <animated.div style={props}  className="buttonInner">
                {children}
            </animated.div>            
        </button>
    )
}

export default Button 