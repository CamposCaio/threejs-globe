import * as THREE from 'three'
// @ts-ignore
import vertexShader from '../shaders/vertex.glsl'
// @ts-ignore
import fragmentShader from '../shaders/fragment.glsl'
// @ts-ignore
import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl'
// @ts-ignore
import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl'
import gsap from 'gsap'

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let sphere: THREE.Mesh
let group: THREE.Group
let atmosphere: THREE.Mesh
let stars: THREE.Points
const pointer = new THREE.Vector2()
const canvas = document.querySelector('canvas') as HTMLCanvasElement

init()

function init() {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(
    75,
    (0.5 * innerWidth) / innerHeight,
    0.1,
    1000
  )
  camera.position.z = 15

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
  })

  renderer.setSize(0.5 * innerWidth, innerHeight)
  renderer.setPixelRatio(devicePixelRatio)

  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        planetTexture: {
          value: new THREE.TextureLoader().load('../assets/planet-map.jpg'),
        },
      },
    })
  )

  atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    })
  )

  atmosphere.scale.set(1.2, 1.2, 1.2)
  scene.add(atmosphere)

  group = new THREE.Group()
  group.add(sphere)
  scene.add(group)

  const starsCoords = []
  for (let i = 0; i < 1000; i++) {
    starsCoords.push(
      (Math.random() - 0.5) * innerWidth,
      (Math.random() - 0.5) * innerHeight,
      -Math.random() * 2000
    )
  }

  stars = new THREE.Points(
    new THREE.BufferGeometry().setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starsCoords, 3)
    ),
    new THREE.PointsMaterial({
      color: 0xffffff,
    })
  )
  scene.add(stars)

  animate()
}

function animate() {
  requestAnimationFrame(animate)
  sphere.rotation.y += 0.002
  gsap.to(group.rotation, {
    x: -pointer.y * 0.25,
    y: pointer.x * 0.5,
    duration: 2,
  })
  renderer.render(scene, camera)
}

addEventListener('mousemove', onPointerMove)

function onPointerMove(event: MouseEvent) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
}

addEventListener('resize', () => {
  renderer.setSize(0.5 * window.innerWidth, window.innerHeight)
  camera.aspect = (0.5 * window.innerWidth) / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.render(scene, camera)
})
