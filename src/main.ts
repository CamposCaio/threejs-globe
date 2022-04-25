import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
)
camera.position.z = 10

const renderer = new THREE.WebGLRenderer()

init()

function init() {
  renderer.setSize(innerWidth, innerHeight)
  document.body.appendChild(renderer.domElement)

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.MeshBasicMaterial({
      // color: 0xff0000,
      map: new THREE.TextureLoader().load('../assets/planet-map.jpg'),
    })
  )

  scene.add(sphere)

  animate()
}

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
