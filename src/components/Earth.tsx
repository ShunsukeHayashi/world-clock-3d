'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber'
import { OrbitControls, Sphere, Stars } from '@react-three/drei'
import * as THREE from 'three'

// 都市の座標データ（緯度経度）
const CITY_COORDINATES = {
  'Asia/Tokyo': { lat: 35.6762, lng: 139.6503 },
  'America/New_York': { lat: 40.7128, lng: -74.0060 },
  'Europe/London': { lat: 51.5074, lng: -0.1278 },
  'Europe/Paris': { lat: 48.8566, lng: 2.3522 },
  'Australia/Sydney': { lat: -33.8688, lng: 151.2093 },
  'Asia/Singapore': { lat: 1.3521, lng: 103.8198 },
} as const

type CityTimeZone = keyof typeof CITY_COORDINATES

type GlobeProps = {
  selectedTimeZone: CityTimeZone
}

function Globe({ selectedTimeZone }: GlobeProps) {
  const earthRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()

  // Load textures
  const [colorMap, normalMap, specularMap] = useLoader(THREE.TextureLoader, [
    '/earth_texture.jpg',
    '/earth_bump.jpg',
    '/earth_specular.jpg'
  ])

  // 緯度経度から3D座標に変換
  const latLngToVector3 = (lat: number, lng: number, radius: number = 1.5) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lng + 180) * (Math.PI / 180)
    const x = -(radius * Math.sin(phi) * Math.cos(theta))
    const z = radius * Math.sin(phi) * Math.sin(theta)
    const y = radius * Math.cos(phi)
    return new THREE.Vector3(x, y, z)
  }

  // 選択された都市にカメラを移動
  useEffect(() => {
    const coords = CITY_COORDINATES[selectedTimeZone]
    const targetPosition = latLngToVector3(coords.lat, coords.lng)
    
    // カメラのアニメーション
    const startPosition = camera.position.clone()
    const endPosition = targetPosition.clone().multiplyScalar(2.5)
    
    let frame = 0
    const animate = () => {
      frame++
      const progress = Math.min(frame / 60, 1) // 60フレームかけてアニメーション
      const t = 1 - Math.pow(1 - progress, 3) // イージング関数

      camera.position.lerpVectors(startPosition, endPosition, t)
      camera.lookAt(0, 0, 0)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    animate()
  }, [selectedTimeZone, camera])

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <>
      <Sphere ref={earthRef} args={[1, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalnessMap={specularMap}
          metalness={0.4}
          roughness={0.7}
        />
      </Sphere>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  )
}

type EarthProps = {
  selectedTimeZone?: CityTimeZone
}

export default function Earth({ selectedTimeZone = 'Asia/Tokyo' }: EarthProps) {
  return (
    <div className="w-full h-full bg-black/20 rounded-2xl overflow-hidden backdrop-blur-sm">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#000000'), 0)
        }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 3, 5]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <Globe selectedTimeZone={selectedTimeZone} />
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  )
} 