import React from 'react'
import { graphql } from 'gatsby'
import Img from "gatsby-image"

const ReadMorePage = ({ data }) => {
  console.log('query , data => ', query, data)
  return (
  <>
    <div className="container-fluid">

    <div className="condition-hero">
      <img
        src={data.contentfulCondition.cardImage.file.url}
        alt={data.contentfulCondition.cardImage.file.fileName}
      />
      <div className="gradient-overlay"></div>
      <h1>{data.contentfulCondition.conditionName}</h1>
      
      
    </div>
    </div>
    <div className="container">
      <div dangerouslySetInnerHTML={{
        __html: data.contentfulCondition.content.childMarkdownRemark.html,
      }}></div>

    </div>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulCondition: contentfulCondition(slug: { eq: $slug }) {
      slug
      id
      conditionName
      cardImage {
        file {
          url
        }
      }
      content {
        childMarkdownRemark {
        html
        }
      }
    }
  }
`

export default ReadMorePage
