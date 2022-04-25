import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer()

init()

function init() {
  renderer.setSize(innerWidth, innerHeight)
  document.body.appendChild(renderer.domElement)

  animate()
}

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
