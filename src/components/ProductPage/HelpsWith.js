import React, {useState} from 'react'
import Slider from 'react-slick'
import { useStaticQuery } from 'gatsby'
import { Link } from 'gatsby'
import HelpImg from '../../images/help-img.png'
import HelpImg2 from '../../images/help-img2.png'
import { useTrail, animated, useTransition } from 'react-spring'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'; 
import useMedia from '../../hooks/useMedia'
import useMeasure from '../../hooks/useMeasure'


const config = { mass: 1, tension: 500, friction: 100 }


const HelpsWith = () => {
  const columns = useMedia(['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'], [3, 2, 1], 2)
  const [bind, { width }] = useMeasure()
  const cardSize = (width / columns - 30 )
  console.log(cardSize)
  const cardPos = [0, cardSize + 15, cardSize * 2 + 30]
  

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
  
  const [page, setPage] = useState([0,3])
  const [toggle, set] = useState(true)
  const paged = 3
  console.log(allContentfulCondition)
  const show = allContentfulCondition.nodes.slice(page[0], page[1])
  console.log(show)
  const transition = useTransition(show, item => item.id, {
    trail: 400 / show.length,
    from: {
      opacity: 0,
      width:0,
      height:400
    },
    enter: {
      opacity: 1,
      width:cardSize,
      height:400
    },
    leave: {
      opacity: 0,
      width:0,
      height:400
    }
  })

  return (
    <div {...bind} className="helpsWith">
      <div className="container-fluid">
        <div className="helpHeading" >
            <h3>Helps you with</h3>
            <FaChevronCircleLeft onClick={() => setPage([page[0] - 3, page[1] - 3])}/>
            <FaChevronCircleRight onClick={() => setPage([page[0] + 3, page[1] + 3])} />
        </div>
        <div className="cardWrap" >
        {transition.map(({item, props, key}) => (
            <animated.div style={props}  className="help-boxs" key={key}>
                <img
                  src={item.cardImage.file.url}
                  alt={item.cardImage.file.fileName}
                />
                <div className="gradient-overlay"></div>
                <div className="help-content">
                  <h2>{item.conditionName}</h2>
                  <Link
                    to={`/readMore/${item.slug}`}
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
