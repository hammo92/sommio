import React, {useState, useEffect} from 'react'
import VisibilitySensor from "react-visibility-sensor"
import {animated, useTrail } from 'react-spring'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'


const Head = ({children, head}) => {
    const [isVisible, setVisibility] = useState(false)
    const [entered, setEntered] = useState(false);
    const onChange = visiblity => {
        setVisibility(visiblity);
    };
      
    
    useEffect(() => {
        if (isVisible) {
          setEntered(true);
        }
    }, [isVisible]);

    console.log("entered =>",entered)


    const words = children.split(" ")
    const config = { mass: 0.1, tension: 900, friction: 40 }
    const trail = useTrail(words.length, {
        config,
        opacity: isVisible ? 1 : 0.3,
        transform: isVisible ? `translate3d(0,0px,0)` : `translate3d(0px,30px,0)`,
    })
    
    return (
        <VisibilitySensor
        onChange={onChange}
        >
        <h3>
        {trail.map(({ opacity, transform }, index) => (
            <animated.span
                key={words[index]}
                style={{opacity, transform}}
            >
                {words[index]}
            </animated.span>
          ))}
        </h3>

        </VisibilitySensor>
    )
}
export default Head