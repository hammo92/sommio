import React, {useState, useEffect, useRef} from 'react'

import SommioImg3 from '../../../images/sommio-img3.png'

import BeadOpen from "../../../video/Window.mp4"
import BeadSmoke from "../../../video/Explode2.mp4"
import WeightexTurn from "../../../video/Turn.mp4"
import WeightexExplode from "../../../video/Explode.mp4"
import PocketLeak from "../../../video/pocketCut.mp4"
import WeightexLeak from "../../../video/weightexCut.mp4"
import PlayDuotone from "../../../images/play-duotone.png"
import ReactPlayer from 'react-player'
import VisibilitySensor from "react-visibility-sensor"
import AniText from '../../AnimatedText/AniText'
import { Tab, Row, Col, Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faRedo, faStop } from '@fortawesome/free-solid-svg-icons'
import Button from '../../Button'

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
    url:{WeightexLeak},
    title:`Keeps on going`,
    text:`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the` 
  },
  { 
    url:{PocketLeak},
    title:`Leak over time`,
    text:`As the blanket is used the stitching loosens allowing beads to escape, turning your bed into a sandpit.` 
  },
]


  
const CompareBox = ({details: {title, text, url}, setPlaying, playing, left}) => {
  console.log("Details =>", url[Object.keys(url)[0]])
  console.log(`playing ${title} => `, playing)
  return (
    <div className= {left ? "col-12 col-lg-6 bor-right" : "col-12 col-lg-6"}> 
      <div className="sommio-box">
        <ReactPlayer url={url[Object.keys(url)[0]]}
          playing={playing ? true : false}
          muted
          width={'100%'}
          height={'100%'}
          loop={false}
          onEnded={() => setPlaying(false)}
        />
        <AniText>{title}</AniText>
        <AniText type={"p"}>{text}</AniText>
      </div>
    </div>
  )
}

const CompareRow = ({row}) => {
  const [onePlaying, setOnePlay] = useState(false)
  const [twoPlaying, setTwoPlay] = useState(false)
  let playing = (twoPlaying && onePlaying) ? true : false
  return (
      <div className="row no-gutters">
      <CompareBox key="0" details={details[row]} playing={onePlaying} setPlaying={setOnePlay} left/>
      <CompareBox key="1" details={details[row + 1]}  playing={twoPlaying} setPlaying={setTwoPlay}/>
      
      <div className="play-box" onClick={() => {
        setOnePlay(playing ? false : true)
        setTwoPlay(playing ? false : true)
      }}>
            <Button type="round medium" >
              <FontAwesomeIcon icon={playing ? faStop : faPlay} />
              
          </Button>
        <span>{playing ? "Stop" : "Play"}</span>
              
          </div>
      
      </div>
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
                <CompareRow row={2} />
                <CompareRow row={4}/>
                {/*<CompareRow row={4}/>*/}
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
