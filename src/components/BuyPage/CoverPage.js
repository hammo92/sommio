import React, {useState} from 'react'
import { Link } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'
import Img from 'gatsby-image'
import Button from '../Button'
import { useStateValue } from '../../context/SiteContext';
import UnitToggle from './UnitToggle'
import { animated, useSpring, config } from 'react-spring'


const CoverCard = ({ item }) => {
  const itemCover = item.short_description.split(" ")
  const [{ configure }, dispatch] = useStateValue();

  const selected = item._id._oid === configure.cover.id
  return(
    <div className={`coverCard ${selected ? "active" : ""}`}>
      <h4 className="price">+£{item.price}</h4>
      <h2 >{item.name}</h2>
      <div className="img">
        <Img fluid={item.mainImage.childImageSharp.fluid} />
      </div>
      <Button disabled={selected} clickFunction={() => {
        dispatch({
          type: 'changeConfigureCover',
          setCover: item.name,
          setId: item._id._oid,
          setAddPrice: item.price,
          nextQuestion: configure.page
        })
      }}>
        <p>{selected ? "Selected" : "Select"}</p>
      </Button>
    </div>
  )
}



const CoverPage = ({ covers }) => {

    const options = covers.nodes

    return (
      <>
        <div className="row ConfigureHeader">
          <h1>Choose your blanket Cover</h1>
          <p>Pick the cover for your blanket, attached with zips this cover stays put perfectly.</p>
        </div>
        <div className="row cardWrap">
        { options.length > 1 ? (
            options.map((cover, i) => (
                <CoverCard item={cover} />
            ))
        ):<div>Cover.name</div>
          }
        </div>
        
      </>
    )
}
export default CoverPage