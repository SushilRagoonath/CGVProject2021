

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.1, 1000 );
clock = new THREE.Clock();

lightAmbient = new THREE.AmbientLight(0x8c8c8c); // soft white light

renderer =new THREE.WebGLRenderer({antialias:true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

spotlight = createSpotlight({color:0x8c8c8c})
spotlight.position.y= 14
spotlight.castShadow=true
scene.add(spotlight)
const spotLightHelper = new THREE.SpotLightHelper( spotlight );
scene.add( spotLightHelper );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.add(lightAmbient);


textureLoader = new THREE.TextureLoader()
loadTextures()
setTimeout(function(){
	const geometry = new THREE.PlaneGeometry( 20, 20 );
	material = new THREE.MeshPhysicalMaterial( {color: 0xffffff, side: THREE.DoubleSide,roughness:0.2,roughnessMap:snowRoughness,bumpMap:snowBump,normalMap:snowNormal} );
	ground = new THREE.Mesh( geometry, material );
	ground.receiveShadow=true
	ground.rotation.x = Math.PI/2
	ground.position.y= -2
	scene.add( ground );
},500)
stellarBackground = new THREE.CubeTextureLoader()
.setPath( '../assets/stardust/' )
.load( [
	'posx.png',
	'negx.png',
	'posy.png',
	'negy.png',
	'posz.png',
	'negz.png'
] );

createTurret();
loadSpaceShip(function(){ //callback after loaded
	player = new THREE.Group();
	player.add( camera );
	player.add( xWing.scene);
	scene.add( player );
	firstcontrols= new THREE.FirstPersonControls(player);
	firstcontrols.lookSpeed = 0.05;
	firstcontrols.movementSpeed = 10;
	camera.position.set( 0, 2,5*Math.sin(clock.getElapsedTime()));
	// animate()// watch out for async. May need to be put in a setTimeout
	
})



scene.background = stellarBackground;
scene.environment = stellarBackground;


setupAudio()

function animate() {
	var delta = clock.getDelta();
	camera.position.set( 0, 2,5);
	// camera.position.set( 0, 2,5*Math.sin(clock.getElapsedTime()));
	xWing.scene.rotation.set(0, clock.getElapsedTime()*0.5,0)
	camera.position.set( 5* Math.cos( 0.2 * clock.getElapsedTime()) , 2,5* Math.sin( 0.2 *clock.getElapsedTime()));
	camera.lookAt(0,0,-1)
	// firstcontrols.update(delta);

    renderer.render( scene, camera );
	// composer.render()
	requestAnimationFrame( animate );
}
setTimeout(animate,1000) // may need to be longer for more assets
