import React from 'react'
import TransitionLink from 'gatsby-plugin-transition-link'
import Img from 'gatsby-image'

export default function Card({ item }) {
  return (
    <>
      <Img fluid={item.cardImage.fluid} />
      <div className="gradient-overlay"></div>
      <div className="help-content">
        <h2>{item.conditionName}</h2>
        <TransitionLink to={`/readMore/${item.slug}`} className="btn btn-link">
          Read More
        </TransitionLink>
      </div>
    </>
  )
}
