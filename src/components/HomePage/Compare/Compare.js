import React, {useState} from 'react'

import SommioImg3 from '../../../images/sommio-img3.png'

import BeadOpen from "../../../video/windowTurn.mp4"
import BeadSmoke from "../../../video/explodeSmoke3.mp4"
import WeightexTurn from "../../../video/weightexTurn.mp4"
import WeightexExplode from "../../../video/weightexExploCold.mp4"
import Leak from "../../../video/leakSquare.mp4"
import ReactPlayer from 'react-player'
import VisibilitySensor from "react-visibility-sensor"
import Head from '../../AnimatedText/Head'
import Para from '../../AnimatedText/Para'

const details = [
  { 
    url:{WeightexTurn},
    title:`Perfect Weight Distribution`,
    text:`Weightex has high density chromium alloy microspheres integrated into the fabric for zero weight shifting` 
  },
  { 
    url:{BeadOpen},
    title:`Weight moving and bunching`,
    text:`Loose beads are free to move around the pocket and build up at the lowest point, concentrating the weight in one spot.` 
  },
  { 
    url:{WeightexExplode},
    title:`Advanced Cooling`,
    text:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the` 
  },
  { 
    url:{BeadSmoke},
    title:`Quickly Overheats`,
    text:`To disguise the bunching and reduce the noise of beads moving manufacturers add thick wadding, which traps heat and can feel suffocating..` 
  },
  { 
    url:{Leak},
    title:`Keeps on going`,
    text:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the` 
  },
  { 
    url:{Leak},
    title:`Leak over time`,
    text:`As the blanket is used the stitching loosens allowing beads to escape, turning your bed into a sandpit.` 
  },
]


  


const CompareBox = ({details: {title, text, url}, visible, left}) => {
  console.log("Details =>", url[Object.keys(url)[0]])
  console.log("visible =>", visible)
  return (
    <div className= {left ? "col-12 col-lg-6 bor-right" : "col-12 col-lg-6"}> 
      <div className="sommio-box">
      
        
        <ReactPlayer url={url[Object.keys(url)[0]]}
                playing={visible ? true : false}
                muted
                width={'100%'}
                height={'100%'}
                loop={false}
        />
        <Head>{title}</Head>
        <Para>{text}</Para>
      </div>
    </div>
  )
}

const CompareRow = ({row}) => {
  const [isVisible, setVisibility] = useState(false)
  const onChange = visiblity => {
    setVisibility(visiblity);
  };
  console.log("visible =>", isVisible)
  return (
    <VisibilitySensor onChange={onChange} partialVisibility>
      <div className="row no-gutters">
          <CompareBox key="0" details={details[row]} visible={isVisible} left/>
          <CompareBox key="1" details={details[row + 1]} visible={isVisible}/>
      </div>
    </VisibilitySensor>
  )
}



const Compare = () => {
  return (
    <div className="col-12 blanketdifference-main" >
      <div className="row no-gutters">
        <div className="col-12 col-lg-6 bor-right">
          <h2>Sommio Weightex™ </h2>
        </div>
        <div className="col-12 col-lg-6">
          <h2>Bead Filled Pockets </h2>
        </div>
      </div>
      <CompareRow row={0} />
      <CompareRow row={2}/>
      <CompareRow row={4}/>
      
    </div>
    
  )
}
export default Compare
