import React, { useState, useRef } from 'react'
import Para from '../AnimatedText/Para'
import Head from '../AnimatedText/Head'
import GoodquizImages from '../../images/goodquiz-img.jpg'
import { useStaticQuery, graphql } from 'gatsby'
import GoodquizEyeIcon from '../../images/eye-solid.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Button from '../Button'
import Img from 'gatsby-image'

const Goodbye = () => {
  const Top = useStaticQuery(graphql`
    query {
      file(name: { eq: "goodquiz-img" }) {
        childImageSharp {
          fluid(maxWidth: 1800, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  return (
    <div className="goodquiz-bg container-fluid">
      <div className="row d-flex align-items-top">
        <div className="col-7 goodquiz-boxs above-image">
          <Head type={1}>Goodbye Stress</Head>
          <Head type={1}>Hello rest...</Head>
        </div>
        <div className="col-5 goodquiz-boxs">
          <Para >Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. 
          </Para>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="goodquiz-boxs">
      
            <Img fluid={Top.file.childImageSharp.fluid} />
              {/*<div className="goodquiz-bottom">
                <div className="goodquiz-content">
                  <h2>Explore the blanket </h2>
                  <Para>
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text
                    ever since the
                  </Para>
                </div>
                <div className="goodquiz-view">
                  <Button type="round large" link="/products/DEWR3J">
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                </div>
              </div>
              */}
        </div>
      </div>
    </div>
  </div>
  )
}
export default Goodbye
