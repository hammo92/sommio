import React, {Fragment} from 'react'
import { Link } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'
import Img from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-solid-svg-icons'


const Rating = ({score}) => {
    let elementArray = new Array(5)
    for (let i = 0; i < 5; i++){
        i < score ? elementArray[i] = <FontAwesomeIcon icon={faStar} /> : elementArray[i] = <FontAwesomeIcon icon={faCircle} />
    }
    console.log("element array: ", elementArray)
    return (
        <div className="star-list">
            {elementArray.map((item, i) => item )}

        </div>
    )
}


const ReviewCard = ({item}) => {
    console.log("item is: ",item)
    return (
    <>
        <h1>{item.reviewTitle}</h1>
        <Rating score={item.reviewScore}/>
        <div 
            dangerouslySetInnerHTML={{
                __html: item && item.content.childMarkdownRemark.html
            }}      
        />
        <p>{item.reviewerName}</p>
        <p>{item.location}</p>
                
    </>
    )
}
export default ReviewCard