import React from 'react'
import SommioImg3 from '../../images/sommio-img3.png'
import BeadOpen from '../../video/windowTurn.mp4'
import BeadSmoke from '../../video/explodeSmoke3.mp4'
import WeightexTurn from '../../video/weightexTurn.mp4'
import WeightexExplode from '../../video/weightexExploCold.mp4'
import Leak from '../../video/leakSquare.mp4'
import ReactPlayer from 'react-player'
import VisibilitySensor from 'react-visibility-sensor'

const BlanketDifference = () => {
  return (
    <div className="blanketdifference-main">
      <div className="row no-gutters">
        <div className="col-12 col-lg-6 bor-right">
          <h2>Sommio Weightex™ </h2>
          <div className="sommio-box">
            <VisibilitySensor partialVisibility={true}>
              {({ isVisible }) => (
                <ReactPlayer
                  url={WeightexTurn}
                  playing={isVisible ? true : false}
                  muted
                  width={'100%'}
                  height={'100%'}
                  loop={false}
                />
              )}
            </VisibilitySensor>
            <h4>Perfect Weight Distribution</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
          </div>
          <div className="sommio-box">
            <VisibilitySensor partialVisibility={true}>
              {({ isVisible }) => (
                <ReactPlayer
                  url={WeightexExplode}
                  playing={isVisible ? true : false}
                  muted
                  width={'100%'}
                  height={'100%'}
                  loop={false}
                />
              )}
            </VisibilitySensor>
            <h4>Advanced Colling</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
          </div>
          <div className="sommio-box">
            <img alt="keeps-on-going" src={SommioImg3} />
            <h4>Keeps on going</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <h2>Bead-filled Pockets</h2>
          <div className="sommio-box">
            <VisibilitySensor partialVisibility={true}>
              {({ isVisible }) => (
                <ReactPlayer
                  url={BeadOpen}
                  playing={isVisible ? true : false}
                  muted
                  width={'100%'}
                  height={'100%'}
                  loop={false}
                />
              )}
            </VisibilitySensor>
            <h4>Weight moving and bunching</h4>
            <p>
              Loose beads are free to move around the pocket and build up at the
              lowest point, concentrating the weight in one spot.
            </p>
          </div>
          <div className="sommio-box">
            <VisibilitySensor partialVisibility={true}>
              {({ isVisible }) => (
                <ReactPlayer
                  url={BeadSmoke}
                  playing={isVisible ? true : false}
                  muted
                  width={'100%'}
                  height={'100%'}
                  loop={false}
                />
              )}
            </VisibilitySensor>
            <h4>Quickly Overheats</h4>
            <p>
              To disguise the bunching and reduce the noise of beads moving
              manufacturers add thick wadding, which traps heat and can feel
              suffocating.
            </p>
          </div>
          <div className="sommio-box">
            <VisibilitySensor partialVisibility={true}>
              {({ isVisible }) => (
                <ReactPlayer
                  url={Leak}
                  playing={isVisible ? true : false}
                  muted
                  width={'100%'}
                  height={'100%'}
                  loop={false}
                />
              )}
            </VisibilitySensor>
            <h4>Leak over time</h4>
            <p>
              As the blanket is used the stitching loosens allowing beads to
              escape, turning your bed into a sandpit.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BlanketDifference
