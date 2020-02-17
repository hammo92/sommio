import React, {useState, useEffect} from 'react'
import VisibilitySensor from "react-visibility-sensor"
import {animated, useTrail } from 'react-spring'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'


const Head = ({children, head, type}) => {
    const [isVisible, setVisibility] = useState(true)
    const onChange = visiblity => {
        setVisibility(visiblity);
    };
    const CustomTag = type ? `h${type}` : `h3`
      
    

    
    const words = children ? children.split(" ") : head.split(" ")
    const config = { mass: 0.1, tension: 900, friction: 40 }
    const trail = useTrail(words.length, {
        from:{
            opacity: 0.3,
            transform: `translate3d(0px,30px,0)`,},
        to:{
            opacity: isVisible ? 1 : 0.3,
            transform: isVisible ? `translate3d(0,0px,0)` : `translate3d(0px,30px,0)`,
        },
        config,
        
    })
    
    return (
        <VisibilitySensor
        onChange={onChange}
        partialVisibility
        scrollCheck={true}
        >
        <CustomTag>
        {trail.map(({ opacity, transform }, index) => (
            <animated.span
                key={words[index] + Math.random()}
                style={{opacity, transform}}
            >
                {words[index]}
            </animated.span>
          ))}
        </CustomTag>

        </VisibilitySensor>
    )
}
export default Head