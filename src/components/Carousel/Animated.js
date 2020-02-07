import React, {useState} from 'react'
import { useSpring, animated, config } from 'react-spring'

const AnimatedOver = (xy, width, image, clicked) => {
    const [open, setOpen] = useState(false)
    const props = useSpring({opacity: open ? 0 : 1})

    return (
        <div className="animationOverlay">
            <div className="transitionCover">
            
            </div>
        </div>
    )
}

export default AnimatedOver
