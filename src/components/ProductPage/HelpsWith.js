import React, {useState} from 'react'
import Slider from 'react-slick'
import { useStaticQuery } from 'gatsby'
import { Link } from 'gatsby'
import HelpImg from '../../images/help-img.png'
import HelpImg2 from '../../images/help-img2.png'
import { useTrail, animated, useTransition, config } from 'react-spring'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'; 
import useMedia from '../../hooks/useMedia'
import useMeasure from '../../hooks/useMeasure'




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


  const columns = useMedia(['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'], [3, 2, 1], 2)
  const [bind, { width }] = useMeasure()

  const [page, setPage] = useState(0)
  const show = allContentfulCondition.nodes.slice(page, columns + page + 1)

  console.log(show)
  let cards = show.map((child,i) => {
    const column = i
    const xy = [(width / columns) * column, 0]
    return {...child, xy, width: width / columns - 30}
  })

  console.log(cards)

  const cardSize = ((width / columns) - 100 )
  const cardPos = [0, cardSize + 15, cardSize * 2 + 30]


  const transition = useTransition(cards, item => item.id, {
    trail: 300 / columns,
    from: ({ xy, width }) => ({ xy, width, opacity:0 }),
    enter: ({ xy, width }) => ({ xy, width, opacity:1 }),
    update: ({ xy, width }) => ({ xy, width }),
    leave: {opacity: 0 },
    config: config.wobble
  })

  return (
    <div {...bind} className="helpsWith">
      <div className="container-fluid">
        <div className="helpHeading" >
            <h3>Helps you with</h3>
            <FaChevronCircleLeft onClick={() => setPage(page - 1)}/>
            <FaChevronCircleRight onClick={() => setPage(page + 1)} />
        </div>
        <div className="cardWrap" >
        {transition.map(({item, props: { xy, ...rest }, key}) => (
            <animated.div style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`), ...rest }}  className="help-boxs" key={key}>
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
