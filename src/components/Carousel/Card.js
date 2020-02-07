import React from 'react'
import { Link } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'

const TRANSITION_DELAY = 1.2;
const TRANSITION_LEN = 1.2;

export default function Card({item}) {
    return (
        <>
                <img
                  src={item.cardImage.file.url}
                  alt={item.cardImage.file.fileName}
                />
                <div className="gradient-overlay"></div>
                <div className="help-content">
                  <h2>{item.conditionName}</h2>
                  <TransitionLink
                    to={`/readMore/${item.slug}`}
                    className="btn btn-link"
                    
                  >
                    Read More
                  </TransitionLink >
                </div>
        </>
    )
}
