import React, {useState} from 'react'

import SommioImg3 from '../../../images/sommio-img3.png'

import BeadOpen from "../../../video/windowTurn.mp4"
import BeadSmoke from "../../../video/explodeSmoke3.mp4"
import WeightexTurn from "../../../video/weightexTurn.mp4"
import WeightexExplode from "../../../video/weightexExploCold.mp4"
import Leak from "../../../video/leakSquare.mp4"
import PlayDuotone from "../../../images/play-duotone.png"
import ReactPlayer from 'react-player'
import VisibilitySensor from "react-visibility-sensor"
import Head from '../../AnimatedText/Head'
import Para from '../../AnimatedText/Para'
import {Tab, Row, Col, Nav} from 'react-bootstrap'

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
          <div className="play-box">
            <button className="btn btn-primary">
              <img src={PlayDuotone} />
            </button>
            <span>Play</span>
          </div>
          <CompareBox key="1" details={details[row + 1]} visible={isVisible}/>
      </div>
    </VisibilitySensor>
  )
}



const Compare = () => {
  return (
    <div className="col-12 blanketdifference-main">

      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col xs={12}>
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="first">Weightex</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Cover</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col xs={12}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <div className="row no-gutters">
                  <div className="col-12 col-lg-6">
                    <div className="weightex-box">
                      <h2>Sommio Weightex<sup>™</sup></h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="weightex-box">
                      <h2>Bead-filled Pockets</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                    </div>
                  </div>
                </div>
                <CompareRow row={0} />
                <CompareRow row={2}/>
                <CompareRow row={4}/>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                Lorem
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      
      
    </div>
    
  )
}
export default Compare
