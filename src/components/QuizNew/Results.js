import React from 'react'
import { useStateValue } from '../../context/SiteContext';
import {useSpring, animated, config, interpolate} from 'react-spring'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import YAMLData from '../../../content/Advice.yaml'



export const Progress = ({ value }) => {
    const { val } = useSpring({
        from: {val: 0 },
        val: value,
    })
    return (
        <div className="progressBar">
            <div className="background" />
            <animated.div className="bar" style={{ height: val.interpolate(o => `${o}%`) }}/>
        </div>
    )
}

const Donut = animated(CircularProgressbarWithChildren)
const Results = () => {
    const [{ quiz }, dispatch] = useStateValue();
    console.log("scores => ", quiz.sleepScore, quiz.stressScore )
    const sleepScore = Math.floor(((quiz.sleepScore / 23) * 100))
    const stressScore = Math.floor(((quiz.stressScore / 7) * 100))
    console.log("percentages => ",sleepScore, stressScore)
    console.log(YAMLData)
    const sleepText = sleepScore < 30 ? "Low" : sleepScore < 60 ? "Okay" : "Good"
    const stressText = stressScore < 30 ? "Low" : sleepScore < 60 ? "Okay" : "Good"
    console.log("text => ", sleepText, stressText)
    //console.log(stress)

    return (
        <>
            <Row>
                <Col lg={6} className="borderRight" >
                <div className="resultBox">
                    <Progress value={sleepScore} />   
                    <h2>Sleep Score</h2>
                    
                    <h3>{YAMLData.Sleep[sleepText].title}</h3>
                    <p>{YAMLData.Sleep[sleepText].desc}</p>
                </div>
                <div className="resultBox">
                    <Progress value={stressScore} />  
                    <h2>Wellbeing Score</h2>
                    <h3>{YAMLData.Stress[stressText].title}</h3>
                    <p>{YAMLData.Stress[stressText].desc}</p>
                </div>
            
            
                </Col>
                <Col lg={6}>
                <div className="resultBox">
                    <h2>Recommendation</h2>
                </div>
                
            
                </Col>
            </Row>
            
           
           
        </>
    )
}

export default Results