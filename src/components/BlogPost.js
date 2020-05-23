import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export default function BlogPost() {
  const contentfulData = useStaticQuery(graphql`
    query {
      contentfulArticle {
        author {
          title
          id
        }
        body {
          body
          id
        }
        title
        description {
          description
          id
        }
        slug
      }
    }
  `)

  return (
    <div className="mb-10">
      <h4 className="mb-3">BLOG PAGE</h4>
      <p className="mb-1">Title :{contentfulData.contentfulArticle.title}</p>
      <p className="mb-1">
        Authour :{contentfulData.contentfulArticle.author.title}
      </p>
      <p className="mb-1">
        Description :{contentfulData.contentfulArticle.description.description}
      </p>
    </div>
  )
}
