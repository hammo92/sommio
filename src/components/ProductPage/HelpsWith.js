import React, {useState} from 'react'
import Slider from 'react-slick'
import { useStaticQuery } from 'gatsby'
import { Link } from 'gatsby'
import HelpImg from '../../images/help-img.png'
import HelpImg2 from '../../images/help-img2.png'
import { useTrail, animated, useTransition } from 'react-spring'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'; 


const config = { mass: 1, tension: 500, friction: 100 }


const HelpsWith = () => {
    const { allContentfulCondition } = useStaticQuery(graphql`
    query {
      allContentfulCondition {
        nodes {
          slug
          id
          conditionName
          cardImage {
            file {
              url
            }
          }
        }
      }
    }
  `)  
  
  const [page, setPage] = useState(1)
  const [toggle, set] = useState(true)
  const paged = 3
  const transition = useTransition(paged, {
    trail: 400 / paged.length,
    from: {
      opacity: 0,
      transform: 'scale(0)'
    },
    enter: {
      opacity: 1,
      transform: 'scale(1)'
    },
    leave: {
      opacity: 0,
      transform: 'scale(0)'
    }
  })
  console.log(allContentfulCondition.nodes[0])

  return (
    <div className="helpsWith">
      <div className="container-fluid">
        <div className="helpHeading" >
            <h3>Helps you with</h3>
            <FaChevronCircleLeft />
            <FaChevronCircleRight onClick={() => setPage(page + 1)} />
        </div>
        <div className="cardWrap" >
        {trail.map(({ x, height, ...rest }, index) => (
            <animated.div style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}  className="help-boxs" key={index * page}>
                <img
                  src={allContentfulCondition.nodes[index * page].cardImage.file.url}
                  alt={allContentfulCondition.nodes[index * page].cardImage.file.fileName}
                />
                <div className="gradient-overlay"></div>
                <div className="help-content">
                  <h2>{allContentfulCondition.nodes[index * page].conditionName}</h2>
                  <p>{index * page}</p>
                  <Link
                    to={`/readMore/${allContentfulCondition.nodes[index * page].slug}`}
                    className="btn btn-link"
                  >
                    Read More
                  </Link>
                </div>
            </animated.div>
        ))}
        </div>
      </div>
    </div>
  )
}
export default HelpsWith
