import React from 'react'
import cx from 'classnames'

export default function Photo({ src, transparent, ...props }) {
  const imageClass = cx('product-image', {
    'bg-grey-light': !transparent
  })
  if (!src) return <span>No photo</span>

  return (
    <div className={imageClass}>
      <img src={src} alt="" {...props} />
    </div>
  )
}
