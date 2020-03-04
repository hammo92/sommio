import React, { useRef } from 'react'
import ReactPlayer from 'react-player'
import Spin from '../../video/spin3.mp4'
import VisibilitySensor from 'react-visibility-sensor'
import Para from '../AnimatedText/Para'
import Head from '../AnimatedText/Head'
import Button from '../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import secretContainImages from '../../images/secretContain-img.svg'
import BookOpen from '../../images/book-open-solid.svg'

const SecretIngredient = () => {
  const vid = useRef()
  return (
    <div className="container-fluid secretContain">
      <div className="row">
        <div className="col-12 col-lg-6">
          <div className="secretingredient-boxs">
            <Head type={2}>Your secret ingredient</Head>

            <Para>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the dummy text of the printing and typesetting
              industry.
            </Para>
            <button className="btn btn-primary">
              <span>Learn</span>
              <img src={BookOpen} />
            </button>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="img">
            <img src={secretContainImages} />
            {/* <Button type="thin">
              <h3>Learn</h3>
              <FontAwesomeIcon icon={faBookOpen} />
            </Button> */}
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
