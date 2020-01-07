import React from 'react'
import { useStateValue } from '../../context/SiteContext';
import {useSpring, animated, config} from 'react-spring'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const Donut = animated(CircularProgressbarWithChildren)
const Results = () => {
    const [{ quiz }, dispatch] = useStateValue();
    const sleepScore = quiz.sleepScore
    const stressScore = quiz.stresScore

    const sleep = useSpring({config: config.molasses, value: sleepScore, from: { value: 0 } })
    //const stress = useSpring({config: config.molasses, value: stressScore, from: { value: 0 } })
    console.log(sleep)

    return (
        <Row className= "resultWrapper">
            <Col>
            <h2>Sleep Score</h2>
            <Donut 
            value={sleep.value}
            text={`Good`}
            styles={buildStyles({
                pathTransition: 'none',
                backgroundColor: '#01122B',
            })}
            
             />
            </Col>
            <Col>
            <h2>Wellbeing Score</h2>
            <Donut 
            value={'80'}
            text={`Good`}
            styles={buildStyles({
                pathTransition: 'none',
                backgroundColor: '#01122B',
            })}
            
             />
            </Col>
            <Col><h2>Recommendation</h2></Col>
           
           
        </Row>
    )
}

export default Results