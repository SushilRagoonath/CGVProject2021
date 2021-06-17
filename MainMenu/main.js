

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

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.add(lightAmbient);


textureLoader = new THREE.TextureLoader()
loadTextures()
//happens after 500ms because needs to wait for textures.
setTimeout(function(){
	const geometry = new THREE.PlaneGeometry( 20, 20 );
	//this material uses snow textures
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
loadSpaceShip(function(){ //this is the callback that happens after the x-wing model is loaded.
	player = new THREE.Group(); // creates a player so we can attatch a camera and model
	player.add( camera );
	player.add( xWing.scene);
	scene.add( player );
	//controls the player
	firstcontrols= new THREE.FirstPersonControls(player);
	firstcontrols.lookSpeed = 0.05;
	firstcontrols.movementSpeed = 10;
	
})

setTimeout(function(){
flag = createFlag(stellarBackground,checkeredTexture);
flag.position.set(0,0,0)
flagBox = new THREE.Box3();
flagBox.setFromObject(flag);
let flagBase = flag.getObjectByName("flagBase")
flagBase.material.map = brickTexture
flagBase.material.roughnessMap = brickRoughness
flagBase.material.normalMap = brickNormal
flagBase.material.metalness =0.1
flagBase.material.roughness = 0.8
// var flagHelper = new THREE.Box3Helper(flagBox,0xffff00);
// scene.add(flagHelper)
scene.add(flag)
flag.scale.set(0.02,0.02,0.02)

},1000)

//sets cubemap for environment
scene.background = stellarBackground;
scene.environment = stellarBackground;


setupAudio()

function animate() {
	document.getElementsByClassName("info")[0].style.display= 'initial'
	var delta = clock.getDelta();
	if ( mixer ) mixer.update( delta );
	turret.scene.position.set(3* Math.cos( 0.5 * clock.getElapsedTime()) , 2,3* Math.sin( 0.5*clock.getElapsedTime()))
	turret.scene.lookAt(0,0,0)
	xWing.scene.rotation.set(0, clock.getElapsedTime()*0.5,0)
	camera.position.set( 5* Math.cos( 0.2 * clock.getElapsedTime()) , 2,5* Math.sin( 0.2 *clock.getElapsedTime()));
	camera.lookAt(0,0,-1)
	// firstcontrols.update(delta);
	animateFlag()
    renderer.render( scene, camera );
	// composer.render()
	requestAnimationFrame( animate );
}
setTimeout(animate,1000) // may need to be longer for more assets
