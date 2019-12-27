import React from 'react'
import { graphql } from 'gatsby'
import Img from "gatsby-image"

const ReadMorePage = ({ data }) => {
  console.log('query , data => ', query, data)
  return (
    <div className="container-fluid">

    <div className="condition-hero">
      <img
        src={data.contentfulCondition.cardImage.file.url}
        alt={data.contentfulCondition.cardImage.file.fileName}
      />
      <div className="gradient-overlay"></div>
      <h1>{data.contentfulCondition.conditionName}</h1>
      
      
    </div>

      <p>
        {data.contentfulCondition.description.content.map(content =>
          content.content.map(cont => <p>{cont.value}</p>)
        )}
      </p>

    </div>
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
      description {
        content {
          content {
            value
          }
        }
      }
    }
  }
`

export default ReadMorePage
