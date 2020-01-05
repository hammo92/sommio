import React from 'react'
import { useStateValue } from '../../context/SiteContext';
import Row from 'react-bootstrap/Row'

const Results = () => {
    const [{ quiz }, dispatch] = useStateValue();
    
    var questions = quiz.questions

    questions = Object.entries(questions)
    console.log(questions)


    return (
        <Row>
           <h1>Hello</h1>
        </Row>
    )
}

export default Results