import React, {useState, useEffect, useMemo} from 'react'
import { animated, useSpring } from 'react-spring'
import { useStateValue } from '../../context/SiteContext';


const UnitToggle = ({met,imp}) => {
    const [{ configure }, dispatch] = useStateValue();
    //const metric = configure.metric*/
    const metric = configure.metric

    const setMetricContext = (value) => {    
        dispatch({
        type: 'setUnit',
        setUnit: value
        })
    }
  

    return(
    <div className="toggleBack">
        <div  className={`toggleSlider ${!metric && "active"}`} />
        <div className="toggleText" >
            <p onClick={() => setMetricContext(true)}>{met}</p>
            <p onClick={() => setMetricContext(false)}>{imp}</p>
        </div>
        
        </div>
    )

}
export default UnitToggle