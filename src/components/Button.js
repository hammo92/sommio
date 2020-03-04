import React, { useState, useEffect, useRef } from 'react'
import { animated, useSpring, config } from 'react-spring'
import { useGesture } from 'react-use-gesture'


const Button = ({type, text, children}) => {
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
        <div className={`buttonWrapper ${type}`} {...bind()}>
            <div  className="buttonShadow" ></div>
            <animated.div style={props}  className="buttonInner">
                {children}
            </animated.div>
            
        </div>
    )
}

export default Button 