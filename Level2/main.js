
document.addEventListener('keydown',levelInput)
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 85, window.innerWidth / window.innerHeight, 0.1, 3000 );
clock = new THREE.Clock();
//minimap
mapCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000  );        


// creates the scene cameras
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
//creates renderer with anitalsialing
renderer =new THREE.WebGLRenderer({antialias:true});
renderer.shadowMap.enabled = true;

renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

scene.add(lightAmbient);
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00,envMap:stellarBackground} );

//loads in all relevant textures
textureLoader = new THREE.TextureLoader()
loadTextures() 
loadModels()
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


scene.background = stellarBackground;
scene.environment = stellarBackground;
loadSpaceShip(function(){ //callback after loaded
	xWingBox = new THREE.Box3();
	xWingBox.setFromObject(xWing.scene);
	//creates player class that handles camera and model together
	player = new Player();
	player.add( camera );
	player.add( xWing.scene);
	scene.add( player );
	//sets the event listener to check whether we should changeView of camera
	document.addEventListener('keydown', player.changeView);

	//sets up the controller for the player 
	firstcontrols= new THREE.FirstPersonControls(player);
	firstcontrols.lookSpeed = 0.05;
	firstcontrols.movementSpeed = 10;

})
//initial game camera parameters
camera.position.set( 0, 1,-0.5);
hp = 50;
timeLeft = 10;
gamePaused=true;
timeTillShot = 0.0
bullets = [];
turretBullets=[];
turretModels=[];
turretBoxes=[]
turretsRemoved=[]
//creates all boulders in the scene
createAtmosphericBoulders()
fireBullets()
setTimeout(createTurret,1000)


// createTurret()

//sets background cube map
scene.background = stellarBackground;
scene.environment = stellarBackground;


//adds minimap to scene
scene.add(mapCamera);

setupAudio()

function animate() {
	var delta = clock.getDelta();
	//checks if game is in running state
	if(!gamePaused){
		// firstcontrols.moveForward = true;
		timeLeft -= delta;
	}else{
		firstcontrols.moveForward = false;
	}
	

	firstcontrols.movementSpeed= 75
 
    // code for mini map rendering
	var w=window.innerWidth,h=innerHeight;
	renderer.setScissorTest( true );
	renderer.setScissor(0, 0, w, h);
	renderer.setViewport( 0, 0, w, h );
	mapCamera.position.set(player.position.x, player.position.y + 100, player.position.z);
  	mapCamera.lookAt( player.position.x , player.position.y, player.position.z );
	mapCamera.rotation.z = Math.PI
	//end of mini map setup

	//gameplay loop update
    for(let i=0; i<bullets.length; i++) {
        if(!bullets[i].update(player.position)) {
            scene.remove(bullets[i].getMesh())
            bullets.splice(i, 1)
        }
    }

	xWingBox.setFromObject(xWing.scene)
	
	if(turretModels.length!=0){
		for(let i=0;i<turretModels.length;i++){
			animateTurret(i)
		}
	}

	for(let i=0; i<bullets.length; i++) {
        if(!bullets[i].update(turretModel.scene.position)) {
            scene.remove(bullets[i].getMesh())
            bullets.splice(i, 1)
        }
    }

	for(let i=0; i<turretBullets.length; i++) {
        if(!turretBullets[i].update(turretModel.scene.position)) {
            scene.remove(turretBullets[i].getMesh())
            turretBullets.splice(i, 1)
        }
    }

	firstcontrols.update(delta);
	    for(let i=0; i<bullets.length; i++) {
			for(let j=0;j<turretBoxes.length;j++){
				if(bullets[i].hitbox.intersectsBox(turretBoxes[j])){
					scene.remove(scene.getObjectByName("turret"+String(j)))//logical error here when they shoot the turrets in a different order than they appear
					scene.remove(bullets[i].getMesh())

					turretModels.splice(j, 1)
					turretBoxes.splice(j, 1)
					bullets.splice(i, 1)
				}
			}
        	
   		 }

		for(let i=0; i<turretBullets.length; i++) {
			if(turretBullets[i].hitbox.intersectsBox(xWingBox)){
				// scene.remove(scene.getObjectByName('turret0'))
				console.log("Hit")
				scene.remove(turretBullets[i].getMesh())
				turretBullets.splice(i, 1)
			}
			}
	//updates html for player stats
	updateUI()

	//if game over
	// if(hp<0 ||timeLeft <0){
	// 	console.warn("game over")
	// 	showGameOver()
	// 	restartLevel()
	// }
	//normal scene render
    renderer.render( scene, camera );


	//mini map rendering
	renderer.setScissor(10, window.innerHeight - mapHeight - 10, mapWidth, mapHeight);
	renderer.setViewport( 10, window.innerHeight - mapHeight - 10, mapWidth, mapHeight );
	xWing.scene.scale.set(5,5,5)
	renderer.render( scene, mapCamera)
	renderer.setScissorTest( false );
	xWing.scene.scale.set(1,1,1)
	//end of mini map render

	requestAnimationFrame( animate );
}
setTimeout(animate,1000) // may need to be longer for more assets


