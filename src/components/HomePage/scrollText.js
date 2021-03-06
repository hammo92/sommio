import React, {useState} from 'react'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { animated, useSpring, config } from 'react-spring'



function ScrollText({text}) {
    const [scrollPosition, setScrollPosition] = useState(60)
    useScrollPosition(({ prevPos, currPos }) => {
        setScrollPosition(100 + currPos.y/2)
    })
    
    const style1 = useSpring({
        from: {
          transform: `translate3d(60px,0,0)`,
          opacity: 0
        },
        to: {
          transform: `translate3d(${scrollPosition}px,0,0)`,
          opacity:1,
        },
        config: config.wobbly
    });
    return (

        <div className="scrollText">
            <animated.h2 style={style1}>{text}</animated.h2>
        </div>
    )
}

export default ScrollText