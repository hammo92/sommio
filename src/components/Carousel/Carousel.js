import React, { useState, useRef } from 'react'
import { useStaticQuery } from 'gatsby'
import { Link } from 'gatsby'
import { useTrail, animated, useTransition, useSpring } from 'react-spring'
import VisibilitySensor from 'react-visibility-sensor'
import useMedia from '../../hooks/useMedia'
import useMeasure from 'react-use-measure'
import Card from './Card'
import AnimatedOver from './Animated'
import AniText from '../AnimatedText/AniText'
import Button from '../Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const HelpsWith = ({ shifted }) => {
  const { allContentfulCondition } = useStaticQuery(graphql`
    query {
      allContentfulCondition {
        nodes {
          slug
          id
          conditionName
          content {
            childMarkdownRemark {
              html
            }
          }
          cardImage {
            fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid_withWebp
            }
            file {
              url
            }
          }
        }
      }
    }
  `)
  /* visibility sensor */
  const [isVisible, setVisibility] = useState(false)
  const onChange = visiblity => {
    setVisibility(visiblity)
  }
  const conditions = isVisible ? allContentfulCondition.nodes : []



  //number of columns
  const columns = useMedia(
    ['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'],
    [3, 2, 1.3],
    1
  )

  //responsive width hook
  const [bind, { width }] = useMeasure()

  //visible cards state
  const [page, setPage] = useState(0)

  //Card count
  const condCount = conditions.length
  //array of visible cards
  const show = conditions.slice(page, columns + page + 1)
  const config = { mass: 1.5, tension: 170, friction: 25 }

  //map cards array and set position variables
  let cards = show.map((card, i) => {
    const column = i
    const xy = [(width / columns) * column, 0]
    const cardWidth = width / columns - 30
    return { ...card, xy, width: cardWidth }
  })

  //react-spring transition for cards
  const transition = useTransition(cards, item => item.id, {
    trail: 300 / columns,
    from: ({ xy, width }) => ({ xy, width, opacity: 0 }),
    enter: ({ xy, width }) => ({ xy, width, opacity: 1 }),
    update: ({ xy, width }) => ({ xy, width }),
    leave: { opacity: 0 },
    config
  })

  return (
    <VisibilitySensor onChange={onChange} partialVisibility scrollCheck={true}>
    <div
      ref={bind}
      className={shifted ? 'helpsWith shiftUp' : 'helpsWith noShift'}
    >
      <div className="container-fluid">
        <div className="helpHeading">
          <AniText type="h3">Helps you with</AniText>
          <div className="navIcons">
            <div
              className={page == 0 && 'disabled'}
              onClick={() => setPage(page - 1)}
            >
              <Button type="round small">
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
            </div>
            <div
              className={page == condCount - columns && 'disabled'}
              onClick={() => setPage(page + 1)}
            >
              <Button type="round small">
                <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </div>
          </div>
        </div>
        <div className="cardWrap">
          {transition.map(({ item, props: { xy, column, ...rest }, key }) => (
            <animated.div
              style={{
                transform: xy.interpolate(
                  (x, y) => `translate3d(${x}px,${y}px,0)`
                ),
                ...rest
              }}
              className="help-boxs"
              key={key}
            >
              <Card item={item} />
            </animated.div>
          ))}
        </div>
      </div>
      </div>
    </VisibilitySensor>
  )
}
export default HelpsWith
