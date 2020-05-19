import React, {useState, useRef, useEffect} from 'react'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'




 const VideoPopover = ({
    show,
    title,
    ...props
}) => {
    const [target, setTarget] = useState(null);
    const [display, setDisplay] = useState(false)

    const handleClick = event => {
        setDisplay(!display);
        setTarget(event.target);
      };
    const ref = useRef(null)
    return(
        <div className={"plusCircle " + (show ? "show " : "") + (display ? "toggled " : "")}  open={show} ref={ref} onClick={handleClick}>
        <FontAwesomeIcon icon={faPlus} />
        <Overlay
            show={display}
            target={target}
            placement="bottom"
            container={ref.current}
            containerPadding={20}
        >
        <Popover >
            <Popover.Title as="h3">{title}</Popover.Title>
            <Popover.Content>
                {props.children}
            </Popover.Content>
            </Popover>
            </Overlay>
        </div>

    )

}

export default VideoPopover