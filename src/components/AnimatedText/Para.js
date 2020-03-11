import React, {useState, useEffect} from 'react'
import VisibilitySensor from "react-visibility-sensor"
import { useTrail, animated, config } from 'react-spring'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'


const Para = ({children, head}) => {
    const [isVisible, setVisibility] = useState(true)
    const onChange = visiblity => {
        setVisibility(visiblity);
    };
      


    const config = { mass: 0.1, tension: 1500, friction: 40 }
    const words = children.split(" ")
    const trail = useTrail(words.length, {
        from:{
            opacity: 1,
            transform: `translate3d(0px,0px,0)`,},
        to:{
            opacity: isVisible ? 1 : 0.3,
            transform: isVisible ? `translate3d(0,0px,0)` : `translate3d(0px,20px,0)`,
        },
        config,
        
    })
    
    return (
        <VisibilitySensor
        onChange={onChange}
        >
        <p>
        {trail.map(({ opacity, transform }, index) => (
            <animated.span
                key={words[index] + Math.random()}
                style={{opacity, transform}}
            >
                {words[index]}
            </animated.span>
          ))}
        </p>

        </VisibilitySensor>
    )
}
export default Para