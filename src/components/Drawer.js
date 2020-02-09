import React, {useState} from 'react'
import {useSpring, animated} from 'react-spring'
import useMedia from '../hooks/useMedia'
import useMeasure from '../hooks/useMeasure'

const Drawer = ({isOpen}, props) => {

    const DrawerWidth = useMedia(['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'], [0.8, 0.8, 0.98], 2)
    const [bind, { width }] = useMeasure()
    const [open, setOpen] = useState(isOpen ? isOpen : false)
    const anim = useSpring({width: open ? 1 : 0})


    return (
        <animated.div class="drawer" style={anim} {...bind}>
            {props.children}
        </animated.div>
    )
}

export default Drawer