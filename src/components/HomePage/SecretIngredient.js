import React, {useRef} from 'react'
import ScrollText from './scrollText'
import ReactPlayer from 'react-player'
import Spin from "../../video/spin3.mp4"
import VisibilitySensor from "react-visibility-sensor"
import Para from '../AnimatedText/Para'


const SecretIngredient = () => {
  const vid = useRef()
  return (
    <div className="container-fluid secretContain">
       <ScrollText text={"Discover Calm • Discover Calm"}/>
      <div className="row">
        
        <div className="col-12 col-lg-5">
          <div className="secretingredient-boxs">
            <Para>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text ever
                since the dummy text of the printing and typesetting
                industry.
            </Para>
  {/* <button className="btn btn-primary">Discover Yours</button> */}
          </div>
        </div>
        {/*<div className="col-12 col-lg-7">
        <VisibilitySensor partialVisibility={true} offset={{top:-100}}>
        {({isVisible}) =>
          <ReactPlayer url={Spin}
          ref = {vid}
          playing={(isVisible) ? true : false}
          width={'100%'}
          height={'100%'}
          progressInterval={100}
        
          />
        }

      </VisibilitySensor>
        
      </div>*/}
      </div>
    </div>
  )
}
export default SecretIngredient
