const sceneHome = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const clock = new THREE.Clock();
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshToonMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
let lightAmbient = new THREE.AmbientLight(0x2FFFFFF); // soft white light
let particleLight = new THREE.PointLight( 0xff0000, 1, 100 );
sceneHome.add(lightAmbient);

sceneHome.add( cube );
let stellarBackground = new THREE.CubeTextureLoader()
.setPath( 'assets/stardust/' )
.load( [
	'posx.png',
	'negx.png',
	'posy.png',
	'negy.png',
	'posz.png',
	'negz.png'
] );

//camera.position.z = 5;


//GLOBALS
// currentScene=sceneHome;
currentScene = loadScene1();
currentScene.background = stellarBackground;

console.log(currentScene)

function animate() {
	requestAnimationFrame( animate );
	renderer.render( currentScene, camera );
}

animate()

