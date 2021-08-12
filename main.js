import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.131.3-QQa34rwf1xM5cawaQLl8/mode=imports/optimized/three.js'
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';

//container 
const scene = new THREE.Scene()

// 
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)


const renderer = new THREE.WebGLRenderer({
    canvas:document.querySelector(".model")
})

renderer.setPixelRatio(window.devicePixelRatio)

renderer.setSize(window.innerWidth,window.innerHeight)

camera.position.setZ(30)

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color:'#ff6347'});

const torus = new THREE.Mesh(geometry,material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
const ambientLight = new THREE.AmbientLight(0xffffff)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)

const controls = new OrbitControls(camera,renderer.domElement)
scene.add(lightHelper,gridHelper)

function addStars(){

    const geometry = new THREE.SphereGeometry(0.25,24,24)
    const material = new THREE.MeshStandardMaterial({color:'#ffffff'});
    const star = new THREE.Mesh(geometry,material)

    const [ x,y,z]  = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100))
    star.position.set(x,y,z)
    scene.add(star)
}

Array(200).fill().forEach(addStars)

const moonTexture = new THREE.TextureLoader().load('moon.jpg')

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map:moonTexture,
    })
)
scene.add(moon)

moon.position.z=30;
moon.position.setX(-10)

function moveCamera(){

    const t = document.body.getBoundingClientRect().top
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture


pointLight.position.set(20,20,20)
scene.add(pointLight,ambientLight)

function animate(){
    requestAnimationFrame(animate)

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    controls.update()
    
    renderer.render(scene,camera)
}

animate()