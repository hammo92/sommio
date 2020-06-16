import React, {useState, useEffect, useMemo} from 'react'
import { animated, useSpring } from 'react-spring'
import { useStateValue } from '../../context/SiteContext';


const UnitToggle = () => {
    const [{ configure }, dispatch] = useStateValue();
    const config = {
        mass: 0.4,
        tension: 196,
        friction: 9
      }
    //const metric = configure.metric*/
    const [metric, setMetric] = useState(configure.metric)
    const [props, set] = useSpring(() => ({
        left: metric ? 0 : 75,
        config:config
        
    }))
    useEffect(() => {
        set({
        opacity: metric ? 1 : 0,
        left: metric ? 0 : 75,
        })
      },[metric])
    console.log("configure ", configure)
    console.log(metric, configure.metric)

    const setMetricContext = (value) => {
        setMetric(value)
        dispatch({
        type: 'setUnit',
        setUnit: value
        })
    }
  

    return(
    <div className="toggleBack">
        <animated.div style={{ left: props.left }} className="toggleSlider" />
        <div className="toggleText" >
            <p onClick={() => setMetricContext(true)}>kg</p>
            <p onClick={() => setMetricContext(false)}>lb</p>
        </div>
        
        </div>
    )

}
export default UnitToggle