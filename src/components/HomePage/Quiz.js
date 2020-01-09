import React, {useState} from 'react'
import Link from 'gatsby-plugin-transition-link'
import AniLink from "gatsby-plugin-transition-link/AniLink";
import PlayIcon from '../../images/play-duotone.png'
import { useStateValue } from '../../context/SiteContext'
import { useTrail, animated, useSpring, useChain } from 'react-spring'
const items = ['Is a weighted blanket,', ['a good fit for', 'you.'], "Take our short quiz to discover whether a sommio weighted blanket could help you sleep better and enjoy lower stress"]
const config = { mass: 1, tension: 500, friction: 100 }


const Quiz = () => {
  const [{ quiz }, dispatch] = useStateValue();
  const [toggle, setToggle] = useState(true)
  const trail = useTrail(items.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 120,
    height: toggle ? 120 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div className="quiz-boxs" id="start">
    {trail.map(({ x, height, ...rest }, index) => (
        <animated.div
          key={items[index]}
          className="trails-text"
          style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
          {index == 0 ? <animated.h2>{items[index]}</animated.h2> : index == 1 ? <animated.h2>{items[index][0]}<span> {items[index][1]}</span></animated.h2> : <animated.p>{items[index]}</animated.p>}
        </animated.div>
        
    ))}
      <AniLink paintDrip to="/QuizNew" hex="#D8A8FF"  className="btn btn-info ml-auto">
        {quiz.currentQuestion !== 0 && quiz.complete ? "Your Results" : quiz.currentQuestion !== 0 ? "Resume" : "Start" }
        <img src={PlayIcon} />
      </AniLink >
    </div>
  )
}
export default Quiz
