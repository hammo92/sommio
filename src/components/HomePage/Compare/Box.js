import React from 'react'
import ReactPlayer from 'react-player'

const Box = ({url, title,  visible, props}) => {
    return (
        <div>
        <div className="col-12 col-lg-6">
        <h2>Sommio Weightex™ </h2>
        <div className="sommio-box">
          {({visible}) =>
            <ReactPlayer url={url}
            playing={visible ? true : false}
            muted
            width={'100%'}
            height={'100%'}
            loop={false}
            />
    
          }
        </div>
        <h4>{title}</h4>

        </div>
        </div>
    )
}

export default Box
