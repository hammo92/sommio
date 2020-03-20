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
    <div className="goodquiz-boxs">
      <Head type={1}>Goodbye stress, hello rest.</Head>
      <Img fluid={Top.file.childImageSharp.fluid} />
      <div className="goodquiz-bottom">
        <div className="goodquiz-content">
          <h2>Explore the blanket </h2>
          <Para>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the
          </Para>
        </div>
        <div className="goodquiz-view">
          <Button type="round large" link="/products">
            <FontAwesomeIcon icon={faEye} />
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Goodbye
