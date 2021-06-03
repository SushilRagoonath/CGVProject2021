
document.addEventListener('keydown',resetLevel)
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
scene.background = stellarBackground;
scene.environment = stellarBackground;
loadSpaceShip(function(){ //callback after loaded
	xWingBox = new THREE.Box3();
	xWingBox.setFromObject(xWing.scene);
	player = new Player();
	player.add( camera );
	player.add( xWing.scene);
	scene.add( player );
	document.addEventListener('keydown', player.changeView);

	const helper = new THREE.Box3Helper( xWingBox, 0xffff00 );
	scene.add(helper)
	firstcontrols= new THREE.FirstPersonControls(player);
	firstcontrols.lookSpeed = 0.05;
	firstcontrols.movementSpeed = 10;

})
camera.position.set( 0, 1,-0.5);
hp = 50;
timeLeft = 10;

createAtmosphericBoulders()
createDodgeBoulders()

setTimeout(function(){
flag = createFlag(stellarBackground,checkeredTexture);
flag.position.set(0,0,2800)
flagBox = new THREE.Box3();
flagBox.setFromObject(flag);
var flagHelper = new THREE.Box3Helper(flagBox,0xffff00);
scene.add(flag)
scene.add(flagHelper)
flag.scale.set(0.5,0.5,0.5)

},500)


scene.background = stellarBackground;
scene.environment = stellarBackground;

// mapCamera.position = [10,10,10];
// mapCamera.lookAt([10,0,10]); 
scene.add(mapCamera);

setupAudio()

function animate() {
	var delta = clock.getDelta();
  
	timeLeft -= delta;
	// camera.position.set( 0, 1,-0.5);
	// camera.position.set( 0, 2,5*Math.sin(clock.getElapsedTime()));
	// if(timeLeft<57){
	// 	firstcontrols.moveForward=true //keeps ship moving
	// }
	firstcontrols.movementSpeed= 75
  
	var w=window.innerWidth,h=innerHeight;
	renderer.setScissorTest( true );
	renderer.setScissor(0, 0, w, h);
	renderer.setViewport( 0, 0, w, h );
	mapCamera.position.set(player.position.x, player.position.y + 10, player.position.z);
  mapCamera.lookAt( player.position.x , player.position.y, player.position.z );

	firstcontrols.update(delta);
	xWingBox.setFromObject(xWing.scene)
	if(flagBox.intersectsBox(xWingBox)){
		showGameWon()
	}
	let ringsToDelete=[]; //keeps track of collided rings
	let ringBoxToDelete =-1;

	for (let index = 0; index <ringBoxes.length; index++) {
		const box = ringBoxes[index];
		if(box.intersectsBox(xWingBox)){
			console.log('ring collision')
			ringsToDelete.push("ring"+String(index) ) 
			// ringsToDelete.push("helper"+String(index) ) 
			ringBoxToDelete = index	
		}
	}
	for (var i = 0; i < boulderBoxes.length; i++) {
		if(boulderBoxes[i].intersectsBox(xWingBox)){
			hp-=1;
			console.log('collision with rock',hp)
		}
	}
	setTimeout(function(){ //setTimeout for delaying deletion
		for (let index = 0; index < ringsToDelete.length; index++) {
			if(scene.getObjectByName(ringsToDelete[index])!==undefined){
				ringsRemoved +=1;
				timeLeft +=2.2
				console.log(ringsRemoved)
			}
			scene.remove(scene.getObjectByName(ringsToDelete[index]) )
		}
		

	},100)

	updateUI()
	if(hp<0 ||timeLeft <0){
		console.warn("game over")
		showGameOver()
		restartLevel()
	}
    renderer.render( scene, camera );


	
	renderer.setScissor(10, window.innerHeight - mapHeight - 10, mapWidth, mapHeight);
	renderer.setViewport( 10, window.innerHeight - mapHeight - 10, mapWidth, mapHeight );
	renderer.render( scene, mapCamera)
	renderer.setScissorTest( false );

	requestAnimationFrame( animate );
}
setTimeout(animate,1000) // may need to be longer for more assets


