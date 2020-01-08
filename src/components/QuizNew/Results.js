import React from 'react'
import { useStateValue } from '../../context/SiteContext';
import {useSpring, animated, config} from 'react-spring'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import YAMLData from '../../../content/Advice.yaml'


const Donut = animated(CircularProgressbarWithChildren)
const Results = () => {
    const [{ quiz }, dispatch] = useStateValue();
    const sleepScore = Math.floor(100-((quiz.sleepScore / 23) * 100))
    const stressScore = Math.floor(100-((quiz.stressScore / 7) * 100))
    console.log(sleepScore)
    console.log(YAMLData)
    const sleepText = sleepScore < 30 ? "Low" : sleepScore < 60 ? "Okay" : "Good"
    const stressText = stressScore < 30 ? "Low" : sleepScore < 60 ? "Okay" : "Good"
    const sleep = useSpring({config: config.molasses, value: sleepScore, from: { value: 0 } })
    const stress = useSpring({config: config.molasses, value: stressScore, from: { value: 0 } })
   
    //console.log(stress)

    return (
        <Row className= "resultWrapper">
            <Col>
            
            <h2>Sleep Score</h2>
            <Donut 
            value={sleep.value}
            text={sleepText}
            styles={buildStyles({
                pathTransition: 'none',
                backgroundColor: '#01122B',
            })}
            
             />
            <h3>{YAMLData.Sleep[sleepText].title}</h3>
            <p>{YAMLData.Sleep[sleepText].desc}</p>
            
            </Col>
            <Col>
            <h2>Wellbeing Score</h2>
            <Donut 
            value={stress.value}
            text={stressText}
            styles={buildStyles({
                pathTransition: 'none',
                backgroundColor: '#01122B',
            })}
            
             />
            <h3>{YAMLData.Stress[stressText].title}</h3>
            <p>{YAMLData.Stress[stressText].desc}</p>
            </Col>
            <Col><h2>Recommendation</h2>
            
            </Col>
           
           
        </Row>
    )
}

export default Results