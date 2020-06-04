import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import { Link } from 'gatsby'

const Logo = () => {
    const Logo = useStaticQuery(graphql`
    query {
        file(name: {eq: "logo"}) {
            childImageSharp {
                fixed(traceSVG: {
                color: "#1A172F"
                blackOnWhite: false
                }, width: 209) {
                    tracedSVG
                }
            }
        }
    }
    `)
    console.log("logo: ",Logo) 
    return (
        <Link to="/" className="mx-auto flex items-center logo">
           <Img fluid={Logo.file.childImageSharp.fixed} />
        </Link>
    )
}
export default Logo