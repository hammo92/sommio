import React, { useState, useRef } from 'react'
import { useStateValue } from '../../context/SiteContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle} from '@fortawesome/free-solid-svg-icons';



const StepIndicator = ({name, active, first}) => {
    const [{ configure }, dispatch] = useStateValue()
    const value = configure[name][name] ? configure[name][name] : "select"
    console.log("value ", value)
    return(
      <>
        {!first && 
        <div className={`stepConnector ${active ? "active" : ""}`}>
            <span />
        </div>
        }
        <div className={`stepIndicator ${active ? "active" : ""}`}>
            <p>{name}</p>
            <FontAwesomeIcon icon={faCircle} />
            <p>{value}</p>
        </div>
      </>
    )
  }
  const StepNav = () => {
    const [{ configure }, dispatch] = useStateValue()
    const steps = ["size", "weight", "cover"]
    return(
      <div className="stepper">
      {steps.map((item, i) => (
          <StepIndicator name={steps[i]} active={configure.page >= i } first={i === 0}/>
      ))}
      </div>
    )
  }

  export default StepNav