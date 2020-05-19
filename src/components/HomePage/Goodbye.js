import React, { useState, useRef } from 'react'
import AniText from '../AnimatedText/AniText'
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
      <div className="row">
        <div className="col-10 goodquiz-boxs">
          <AniText type={"h1"}>Goodbye stress</AniText>
          <AniText type={"h1"}>hello rest</AniText>
        </div>
        <div className="col-2 goodquiz-boxs buttonCol">
          <Button type={`round large`}><FontAwesomeIcon icon={faEye} /></Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="goodquiz-boxs hero">
      
            <Img fluid={Top.file.childImageSharp.fluid} />
              {/*<div className="goodquiz-bottom">
                <div className="goodquiz-content">
                  <h2>Explore the blanket </h2>s
                  <AniText type={"p"}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text
                    ever since the
                  </AniText>
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
