import React, {useState, useRef} from 'react'
import { useTrail, animated, useSpring, useChain } from 'react-spring'
import VisibilitySensor from "react-visibility-sensor"
const items = ['Goodbye stress,', ['hello', 'rest.'], "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the"]
const config = { mass: 1, tension: 500, friction: 100 }

const Goodbye = () => {
  const [toggle, setToggle] = useState(true)
  const trail = useTrail(items.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 120,
    height: toggle ? 160 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
 
    <div className="goodquiz-boxs" data-scroll-section>
      {trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={items[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
            {index == 0 ? <animated.h1>{items[index]}</animated.h1> : index == 1 ? <animated.h1>{items[index][0]}<span> {items[index][1]}</span></animated.h1> : <animated.p>{items[index]}</animated.p>}
          </animated.div>
          
      ))}
      
    </div>
  )
}
export default Goodbye
