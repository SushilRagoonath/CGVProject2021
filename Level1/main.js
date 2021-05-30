

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.1, 1000 );
clock = new THREE.Clock();

lightAmbient = new THREE.AmbientLight(0x8c8c8c); // soft white light
particleLight = new THREE.PointLight( 0xff0000, 1, 100 )
directionalLight1 = new THREE.DirectionalLight( 0x0f672e, 0.5);
directionalLight1.position.x=-1
directionalLight1.position.y=0
directionalLight2 = new THREE.DirectionalLight( 0xea5d04, 0.5);
directionalLight2.position.x=1
directionalLight2.position.y=0
scene.add(directionalLight1)
scene.add(directionalLight2)
renderer =new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
scene.add(lightAmbient);
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00,envMap:stellarBackground} );
textureLoader = new THREE.TextureLoader()

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
loadTextures()
setTimeout(function(){
createRings()

},200)
loadSpaceShip(function(){ //callback after loaded

	xWingBox = new THREE.Box3();
	xWingBox.setFromObject(xWing.scene);
	console.log("xWing AABB",xWingBox)
	player = new THREE.Group();
	player.add( camera );
	player.add( xWing.scene);
	scene.add( player );
	const helper = new THREE.Box3Helper( xWingBox, 0xffff00 );
	scene.add(helper)
	firstcontrols= new THREE.FirstPersonControls(player);
	firstcontrols.lookSpeed = 0.05;
	firstcontrols.movementSpeed = 10;
	// camera.position.set( 0, 2,5*Math.sin(clock.getElapsedTime()));
	// animate()// watch out for async. May need to be put in a setTimeout
	
})
loadBoulders() 
console.log(player)

scene.background = stellarBackground;
scene.environment = stellarBackground;

listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
audioLoader = new THREE.AudioLoader();
audioLoader.load( '../assets/sound/SpaceAmbience.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.1 );
	sound.play();
});

function animate() {
	var delta = clock.getDelta();
	camera.position.set( 0, 1,-0.5);
	// firstcontrols.moveForward=true //keeps ship moving
	firstcontrols.movementSpeed= 25
	firstcontrols.update(delta);
	xWingBox.setFromObject(xWing.scene)
	let ringsToDelete=[]; //keeps track of collided rings
	let ringBoxToDelete =-1;
	for (let index = 0; index <ringBoxes.length; index++) {
		const box = ringBoxes[index];
		if(box.intersectsBox(xWingBox)){
			console.log('ring collision')
			ringsToDelete.push("ring"+String(index) ) 
			ringsToDelete.push("helper"+String(index) ) 
			ringBoxToDelete = index	
		}
	}
	setTimeout(function(){ //setTimeout for delaying deletion
		for (let index = 0; index < ringsToDelete.length; index++) {
			scene.remove(scene.getObjectByName(ringsToDelete[index]) )
		}

	},100)

    renderer.render( scene, camera );
	// composer.render()
	requestAnimationFrame( animate );
}
setTimeout(animate,500) // may need to be longer for more assets
