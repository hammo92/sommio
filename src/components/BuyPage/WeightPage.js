import React, {useState} from 'react'
import { Link } from 'gatsby'
import TransitionLink from 'gatsby-plugin-transition-link'
import Img from 'gatsby-image'
import Button from '../Button'
import { useStateValue } from '../../context/SiteContext';
import UnitToggle from './UnitToggle'


const WeightCard = ({ item }) => {
  const [{ configure }, dispatch] = useStateValue();
  const metric = configure.metric
  const weight = metric ? parseInt(item.name, 10) : Math.trunc(parseInt(item.name, 10) * 2.20462)
  const unit = metric ? "kg" : "lb"
  const selected = parseInt(item.name, 10) === configure.weight
  return(
    <div className={`weightCard ${selected ? "active" : ""}`}>
      <h4 className="price">£{item.price}</h4>
      <h2><span>{weight}</span> {unit}</h2>
      <p>recommended for users weighing: {item.short_description}</p>
      <Button disabled={selected} clickFunction={() => {
        dispatch({
          type: 'changeConfigureWeight',
          setWeight: weight,
          nextQuestion: configure.page + 1
        })
      }}>
        <p>{selected ? "Selected" : "Select"}</p>
      </Button>
    </div>
  )
}



const WeightPage = ({ weights }) => {
    //compare function for sorting weights
    const options = weights.nodes
    function compare(a, b) {
      const weightA = parseInt(a.name.split(' ')[0], 10)
      const weightB = parseInt(b.name.split(' ')[0], 10)
      let comparison = 0
      if (weightA > weightB) {
        comparison = 1
      } else if (weightA < weightB) {
        comparison = -1
      }
      return comparison
    }
    options.sort(compare)
    /********************* end *********************/
    return (
      <>
        <div className="row WeightHeader">
          <h1>Choose your blanket's weight</h1>
          <p>We recommend a weight close to 10% of your body weight</p>
          <UnitToggle />
        </div>
        <div className="row cardWrap">
        { options.length > 1 ? (
            options.map((weight, i) => (
                <WeightCard item={weight} />
            ))
        ):<div>weight.name</div>
          }
        </div>
        
      </>
    )
}
export default WeightPage