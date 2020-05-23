import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

const BlanketImages = () => {
  const Room = useStaticQuery(graphql`
    query {
      file(name: { eq: "housealicefinal-img" }) {
        childImageSharp {
          fluid(maxWidth: 1800, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  return (
    <div className="github-main" id="image">
      <div className="row">
        <div className="col-12">
          {/*<img src={HousealicefinalImage} className="img-fluid w-100" />*/}
          <Img fluid={Room.file.childImageSharp.fluid} />
        </div>
        <div className="col-12">
          <h2>What's so special about a Sommio Blanket?</h2>
        </div>
        {/* <div className="col-12 col-lg-6">
          <div className="row">
            <div className="col-12 col-lg-6">
              <img src={GridImg2} className="img-fluid w-100" />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
export default BlanketImages
