import React, { useRef } from 'react'
import { useThree, extend, useFrame } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })
const Controls = props => {
  const { gl, camera } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}

export default Controls
