

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.1, 1000 );
clock = new THREE.Clock();

lightAmbient = new THREE.AmbientLight(0x2FFFFFF); // soft white light
particleLight = new THREE.PointLight( 0xff0000, 1, 100 )
renderer =new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
scene.add(lightAmbient);
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geometry, material );
var cubeBox = new THREE.Box3();
cube.geometry.computeBoundingBox();
cubeBox.copy(cube.geometry.boundingBox)
console.log("reference box AABB",cubeBox)
scene.add( cube ); //reference cube

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
createRings()
loadSpaceShip(function(){

	xWingBox = new THREE.Box3();
	xWingBox.setFromObject(xWing.scene);
	console.log("xWing AABB",xWingBox)
	player = new THREE.Group();
	player.add( camera );
	player.add( xWing.scene);
	scene.add( player );
	firstcontrols= new THREE.FirstPersonControls(player);
	firstcontrols.lookSpeed = 0.05;
	firstcontrols.movementSpeed = 10;
	// camera.position.set( 0, 2,5*Math.sin(clock.getElapsedTime()));
	// animate()// watch out for async. May need to be put in a setTimeout
	
})
console.log(player)

scene.background = stellarBackground;


function animate() {
	var delta = clock.getDelta();
	camera.position.set( 0, 1,-0.5);
	firstcontrols.moveForward=true
	firstcontrols.movementSpeed= 25
	firstcontrols.update(delta);
	xWingBox.setFromObject(xWing.scene)
	if(cubeBox.intersectsBox(xWingBox)){
		console.log('collision?')
	}
    renderer.render( scene, camera );
	requestAnimationFrame( animate );
}
setTimeout(animate,500) // may need to be longer for more assets
