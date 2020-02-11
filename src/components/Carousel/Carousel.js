import React, {useState, useRef} from 'react'
import { useStaticQuery } from 'gatsby'
import { Link } from 'gatsby'
import { useTrail, animated, useTransition, useSpring } from 'react-spring'
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'; 
import useMedia from '../../hooks/useMedia'
import useMeasure from 'react-use-measure'
import Card from './Card'
import AnimatedOver from './Animated'
import Head from '../AnimatedText/Head'


const HelpsWith = () => {
const { allContentfulCondition } = useStaticQuery(graphql`
    query {
      allContentfulCondition {
        nodes {
          slug
          id
          conditionName
          content{
            childMarkdownRemark {
              html
            }
          }
          cardImage {
            file {
              url
            }
          }
        }
      }
    }
  `)   

  //state for clicked card
  const [expanded, setExpanded] = useState({
    itemClicked: false,
    xy: [0,0],
    width:0
  })


  //number of columns
  const columns = useMedia(['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'], [3, 2, 1], 2)

  //responsive width hook
  const [bind, {width}] = useMeasure()

  //visible cards state
  const [page, setPage] = useState(0)

  //Card count
  const condCount = allContentfulCondition.nodes.length
  //array of visible cards
  const show = allContentfulCondition.nodes.slice(page, columns + page + 1 )
  const config = { mass: 1.5, tension: 170, friction: 25 }

 


  //map cards array and set position variables
  let cards = show.map((card,i) => {
    const column = i
    const xy = [(width / columns) * column, 0]
    const cardWidth = width / columns - 30
    return {...card, xy, width: cardWidth}
  })


  //react-spring transition for cards
  const transition = useTransition(cards, item => item.id, {
    trail: 300 / columns,
    from: ({ xy, width }) => ({ xy, width, opacity:0 }),
    enter: ({ xy, width }) => ({ xy, width, opacity:1 }),
    update: ({ xy, width }) => ({ xy, width }),
    leave: {opacity: 0 },
    config
  })

  return (
    <div ref={bind} className="helpsWith">
      <div className="container-fluid">
        <div className="helpHeading" >
            <Head size="h3">Helps you with</Head>
            <FaChevronCircleLeft className={page == 0 ? "disabled" : ""} onClick={() => setPage(page - 1)}/>
            <FaChevronCircleRight className={page >= condCount - columns ? "disabled" : ""} onClick={() => setPage(page + 1)} />
        </div>
        <div className="cardWrap" >
        {transition.map(({item, props: { xy, column, ...rest }, key}) => (
            <animated.div 
            style={{transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`), ...rest }} 
            className="help-boxs" key={key}
            onClick = {() => {
              setExpanded({
                itemClicked:item.id,
                xy:item.xy,
                width:item.width
                })
              
            }}
            >
                <Card item={item} />
            </animated.div>
        ))}
        </div>
      </div>
      
    </div>
  )
}
export default HelpsWith
