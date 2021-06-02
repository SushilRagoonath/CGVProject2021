
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.1, 1000 );
clock = new THREE.Clock();

mapCamera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 0.1, 1000 );        

lightAmbient = new THREE.AmbientLight(0x8c8c8c); // soft white light
directionalLight1 = new THREE.DirectionalLight( 0x0f672e, 0.5);
directionalLight1.position.x=-1
directionalLight1.position.y=0
directionalLight1.castShadow = true; 

directionalLight2 = new THREE.DirectionalLight( 0xea5d04, 0.5);
directionalLight2.position.x=1
directionalLight2.position.y=0
directionalLight2.castShadow = true; 
scene.add(directionalLight1)
scene.add(directionalLight2)
renderer =new THREE.WebGLRenderer({antialias:true});
renderer.shadowMap.enabled = true;

renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.add(lightAmbient);
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00,envMap:stellarBackground} );


textureLoader = new THREE.TextureLoader()
loadTextures()
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

setTimeout(function(){ createRings() },200)
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

	// xWingShadow = new ShadowMesh( xWing.scene);
	// scene.add( xWingShadow );

	camera.position.set( 0, 2,5*Math.sin(clock.getElapsedTime()));
	// animate()// watch out for async. May need to be put in a setTimeout
	
})
createAtmosphericBoulders()
createDodgeBoulders()

scene.background = stellarBackground;
scene.environment = stellarBackground;

// mapCamera.position = [10,10,10];
// mapCamera.lookAt([10,0,10]); 
scene.add(mapCamera);

setupAudio()

function animate() {
	var delta = clock.getDelta();
	
	var w=window.innerWidth,h=innerHeight;
	renderer.setScissorTest( true );
	renderer.setScissor(0, 0, w, h);
	renderer.setViewport( 0, 0, w, h );
	// console.log(player.position)
	// console.log(mapCamera.position)
	mapCamera.position.set(player.position.x, player.position.y + 10, player.position.z);
    mapCamera.lookAt( player.position.x , player.position.y, player.position.z );

	//camera.position.set( 0, 1,-0.5);
	//camera.position.set( 0, 2,5*Math.sin(clock.getElapsedTime()));
	// firstcontrols.moveForward=true //keeps ship moving
	firstcontrols.movementSpeed= 85
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
	updateTimer()

    renderer.render( scene, camera );
	
	renderer.setScissor(10, window.innerHeight - mapHeight - 10, mapWidth, mapHeight);
	renderer.setViewport( 10, window.innerHeight - mapHeight - 10, mapWidth, mapHeight );
	renderer.render( scene, mapCamera)
	renderer.setScissorTest( false );
	requestAnimationFrame( animate );
}
setTimeout(animate,1000) // may need to be longer for more assets
