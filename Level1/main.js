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

var firstcontrols = new THREE.FirstPersonControls(camera);
firstcontrols.lookSpeed = 0.05;
firstcontrols.movementSpeed = 10;


sceneHome.add( cube );
let stellarBackground = new THREE.CubeTextureLoader()
.setPath( '../assets/stardust/' )
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

camera.position.set( 0, 0, 10);

console.log(currentScene)
function animate() {
	var delta = clock.getDelta();
	cube.rotation.z+=0.02
    cube.rotation.y+=0.02
    cube.rotation.x+=0.02

	firstcontrols.update(delta);

    //camera.rotation.x+=0.001
	//     camera.position.z = 5*Math.sin(clock.getElapsedTime())
    //camera.position.y = 5*Math.cos(clock.getElapsedTime())
    renderer.render( currentScene, camera );
	requestAnimationFrame( animate );
}
animate()

