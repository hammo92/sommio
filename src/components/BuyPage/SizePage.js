import React, {useState} from 'react'
import { Link } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'
import Img from 'gatsby-image'
import Button from '../Button'
import { useStateValue } from '../../context/SiteContext';
import UnitToggle from './UnitToggle'
import { animated, useSpring, config } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'

const Dimensions = ({dimensions, metric}) => {
    const width = metric ? `${dimensions[0]}cm`: `${dimensions[0][0]}ft ${dimensions[0][1]}in`
    const height =  metric ? `${dimensions[1]}cm`: `${dimensions[1][0]}ft ${dimensions[1][1]}in`
    return(
        <div className="dimensions">
            <h3>Width</h3><p></p><h3>Height</h3>
            <h2>{width}</h2><h3><FontAwesomeIcon icon={faTimes} /></h3><h2>{height}</h2>
        </div>
    )
}

const SizeCard = ({ item }) => {
    const [{ configure }, dispatch] = useStateValue()
    const itemSize = item.short_description.split(" ")
    const dimensions = [itemSize[0], itemSize[2]]
    let dimensionsImp = []
    dimensions.map((item, i) => {
        dimensionsImp[i] = [Math.floor((item * 0.393)/12),Math.floor((item * 0.393)%12)]
    })
  const metric = configure.metric
  const selected = item._id._oid === configure.size.id
  return(
    <div className={`sizeCard ${selected ? "active" : ""}`}>
      <h4 className="price">+ £{item.price}</h4>
      <h2 >{item.name}</h2>
      <Dimensions dimensions={metric ? dimensions : dimensionsImp} metric={metric}/>
      <Button disabled={selected} clickFunction={() => {
        dispatch({
          type: 'changeConfigureSize',
          setSize: item.name,
          setId: item._id._oid,
          setAddPrice: item.price,
          nextQuestion: configure.page + 1
        })
      }}>
        <p>{selected ? "Selected" : "Select"}</p>
      </Button>
    </div>
  )
}



const SizePage = ({ sizes }) => {

    const options = sizes.nodes

    return (
      <>
        <div className="row ConfigureHeader">
          <h1>Choose your blanket size</h1>
          <p>Bigger is not always better, a properly sized blanket provides better pressure.</p>
          <UnitToggle met={"cm"} imp={"ft"} />
        </div>
        <div className="row cardWrap">
        { options.length > 1 ? (
            options.map((size, i) => (
                <SizeCard item={size} />
            ))
        ):<div>size.name</div>
          }
        </div>
        
      </>
    )
}
export default SizePage