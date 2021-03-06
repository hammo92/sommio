import React, { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, extend, useFrame, useThree } from 'react-three-fiber'

extend({ OrbitControls })
const Controls = props => {
  const { gl, camera } = useThree()
  const ref = useRef()
  useFrame(() => ref.current.update())
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}

function Model({ url }) {
  const [gltf, set] = React.useState()
  React.useMemo(() => new GLTFLoader().load(url, set), [url])
  return gltf ? <primitive object={gltf.scene} /> : null
}

const Meditate = () => {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 20], fov: 25 }} shadowMap>
        <ambientLight intensity={0.8} />
        <pointLight intensity={0.51} position={[-10, -25, -10]} />
        <spotLight
          castShadow
          intensity={1.25}
          angle={Math.PI / 8}
          position={[25, 25, 15]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Model url="/scene2.glb" />
        <Controls
          autoRotate
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.5}
          rotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </>
  )
}

export default Meditate
