import React from 'react'

const Donut = ({percent}) => {
    return (
        <svg 
        width="200"
        height="200"
        viewBox="0 0 51 51" 
        stroke-width="2.5" 
        fill="transparent" 
        stroke="white" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        stroke-dasharray="10 20" 
        stroke-dashoffset={percent}>
            <circle 
            transform="translate(25.500000, 25.500000) rotate(-270.000000) translate(-25.500000, -25.500000)"
            cx="25.5"
            cy="25.5"
            r="24.5">
            </circle>
        </svg>
    )
}

export  default Donut