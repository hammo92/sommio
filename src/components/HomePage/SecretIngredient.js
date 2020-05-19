import React, { useRef } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import ReactPlayer from 'react-player'
import Spin from '../../video/spin3.mp4'
import VisibilitySensor from 'react-visibility-sensor'
import AniText from '../AnimatedText/AniText'
import secretContainImages from '../../images/secretContain-img.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import BookOpen from '../../images/book-open-solid.svg'
import Button from '../Button'
import Img from 'gatsby-image'
import Quiz from './Quiz'

const SecretIngredient = () => {
  const vid = useRef()
  const Meditate = useStaticQuery(graphql`
    query {
      file(name: {eq: "Meditate"}) {
        childImageSharp {
          fluid(maxWidth: 800, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `) 
  console.log("meditate is => ", Meditate)
  return (
    <div className="container-fluid secretContain">
      <div className="row">
        <div className="col-12 col-lg-6">
        <Quiz />
        </div>
        <div className="col-12 col-lg-6">
          <div className="img">
            <Img fluid={Meditate.file.childImageSharp.fluid} />
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
