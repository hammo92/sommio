import React from 'react'
import ScrollText from './scrollText'
import ReactPlayer from 'react-player'
import Spin from "../../video/spin2.mp4"
import VisibilitySensor from "react-visibility-sensor"
import Meditate from './Meditate/Meditate'

const SecretIngredient = () => {
  return (
    <div className="container-fluid secretContain">
       <ScrollText text={"Discover Calm • Discover Calm"}/>
      <div className="row">
        
        <div className="col-12 col-lg-5">
          <div className="secretingredient-boxs">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text ever
              since the dummy text of the printing and typesetting
              industry.
            </p>
  {/* <button className="btn btn-primary">Discover Yours</button> */}
          </div>
        </div>
        <div className="col-12 col-lg-7">
        {/*<VisibilitySensor partialVisibility={true} offset={{top:-100}}>
        {({isVisible}) =>
          <ReactPlayer url={Spin}
          ref = {vid}
          playing={(isVisible) ? true : false}
          muted
          width={'100%'}
          height={'100%'}
          progressInterval={100}
        
          />
        }

      </VisibilitySensor>*/}
        <Meditate />
        </div>
      </div>
    </div>
  )
}
export default SecretIngredient
