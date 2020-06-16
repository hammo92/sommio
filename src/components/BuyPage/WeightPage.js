import React, {useState} from 'react'
import { Link } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'
import Img from 'gatsby-image'
import Button from '../Button'

const WeightCard = ({item}) => {
  const [selected, setSelected] = useState()
  const weight = parseInt(item.name, 10)
  const lbWeight = Math.trunc(weight * 2.20462)
  console.log("pounds: ", lbWeight)
  return(
    <div className="weightCard">
      <h4 className="price">£{item.price}</h4>
      <h2><span>{weight}</span> kg</h2>
      <p>recommended for users weighing: {item.short_description}</p>
      <Button ><p>Select</p></Button>
    </div>
  )
}

const WeightPage = ({weights}) => {
    const options = weights.nodes
    console.log("options: ", options)
    return (
      <>
        { options.length > 1 ? (
            options.map((weight, i) => (
                <WeightCard item={weight} />
            ))
        ):<div>weight.name</div>
        }
        
      </>
    )
}
export default WeightPage