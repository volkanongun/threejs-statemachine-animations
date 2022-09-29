import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'

const gui = new dat.GUI()

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

renderer.shadowMap.enabled = true

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  45, 
  window.innerWidth/window.innerHeight,
  1,
  1000
)
camera.position.set(7,5,7)

const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const planeGeometry = new THREE.PlaneGeometry(30,30)
const planeMaterial = new THREE.MeshStandardMaterial({ color : 0x39676e})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
plane.rotation.x = -.5 * Math.PI
plane.receiveShadow = true

const options = {
  planeColor : 0x39676E,
  skeletonColor : 0xC3BDBD
}

gui.addColor(options, 'planeColor').onChange((e)=>{
  plane.material.color.set(e)
})

const directionalLight = new THREE.DirectionalLight()
scene.add(directionalLight)
directionalLight.castShadow = true
directionalLight.position.set(1,1,1)

const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)

const ambientLight = new THREE.AmbientLight(0xFFFFFF)
scene.add(ambientLight)

const mousePosition = new THREE.Vector2()
window.addEventListener('mousemove', function(e){
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1
  mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1
})

const assetLoader = new GLTFLoader();

let target = new THREE.Vector3()
assetLoader.load('assets/AnimatedSkeleton.glb', function(gltf) {
    const model = gltf.scene;
    scene.add(model);

    target.copy(model.position)
    target.y += 2

    camera.lookAt(target)
    
    model.traverse(function (node) {
        if(node.isMesh)
            node.castShadow = true
    })

    model.getObjectByName('Cylinder001').material.color.set(0xC3BDBD)
    
    gui.addColor(options, 'SkeletonColor').onChange(function(e){
      model.getObjectByName('Cylinder001').material.color.set(e)
    })

    //model.scale.set(1,1,1);
    
}, undefined, function(error) {
    console.error(error);
});



function animate(){
  target.y = 2
  camera.lookAt(target)
  
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize', function(){
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
