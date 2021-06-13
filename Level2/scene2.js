//spins our flag around the axis 
function fireBullets(){
    for(let i=0; i<bullets.length; i++) {
        if(!bullets[i].update(player.position)) {
            currentScene.remove(bullets[i].getMesh())
            bullets.splice(i, 1)
        }
    }


window.addEventListener('mousedown', function(e) {
    console.log(e)     
    switch(e.button) {
       case 0: // Space
         
         var shipPosition = player.position.clone()
         // console.log(player)
         var direction = new THREE.Vector3()
         player.getWorldDirection(direction);
         console.log(direction)
         // firstcontrols.getWorldDirection(direction)
         // shipPosition.sub(new THREE.Vector3(0, 25, 100))
        
        //  var matrix = new THREE.Matrix4();
        // matrix.extractRotation( cube.matrix );

        // console.log(matrix.extractRotation( cube.matrix ));
        // var direction = new THREE.Vector3( 0, 0, 1 );
        // matrix.multiplyVector3( direction );

         var bullet = new laser(shipPosition,direction)//cube.get
         bullets.push(bullet)
         scene.add(bullet.getMesh())
         scene.add(bullet.hitboxHelper)
       break
    }
    })
}
function createTurret(){
    turretModel.scene.scale.set(20,20,20)
    scene.add(turretModel.scene);
}
function animateFlag(){
    flag.rotation.set(0, 2*clock.getElapsedTime()  , 0.2 *Math.sin(clock.getElapsedTime() * 0.1))
}

function animateRings() {
    for (var i = 0; i < ringNumber; i++) {
        let object = scene.getObjectByName("ring"+String(i))
        if(object===undefined){
            continue
        }
        object.rotation.set(2*clock.getElapsedTime()+i , 2*clock.getElapsedTime()+i  , 0)
    }
    
}

//handles input for level related function
function levelInput(e){
    var node = document.getElementById("tutorial-info1")
    
    if(e.key==="r"){
        showGameOver()
        setTimeout(  restartLevel,2000)
    }
    else if(e.key===" "){
        gamePaused=false;

        let t2 = document.getElementById("tutorial-info2")
        t2.innerHTML = ""
    }

}
//resets entire level
function restartLevel(){
    player.position.set(0,0,0)
    player.rotation.set(0,0,0)
    timeLeft = 10;
    hp = 50;
    gamePaused = true;
    destroyRings()
    createRings()
    sound.stop()
    sound.play()

}

//html message showing game failure
function showGameOver(){
    let go =document.getElementById("game-over");
    go.innerHTML= "Restarting level"
    setTimeout(function(){//delay makes it dissappear after 1s
        go.innerHTML=""
    },1000)
}
//html message that shows when you finish the level
function showGameWon(){
    let go =document.getElementById("game-over");
    go.innerHTML= "You Won! achieved " +String(ringsRemoved)+'/' +String(ringNumber) +" boxes" 
    setTimeout(function(){
        go.innerHTML=""
        window.location.href='../MainMenu'// routes back to menu after 5 seconds
    },5000)
    player.position.set(0,0,0)
}

function loadSpaceShip(callback){
    loader.load('../assets/x-wing/modified-x-wing.glb',function ( gltf ) {
        xWing= gltf;
        

        xWing.scene.traverse((o) => {
            
            if (o.isMesh){
                let newMaterial = new THREE.MeshPhysicalMaterial({color: 0xffffff,envMap:stellarBackground,roughness:0.1,metalness:0.7,vertexColors: true})
                o.castShadow = true;
                o.receiveShadow = true;
                o.material = newMaterial;
            } 
            
          });
	//use callback for correct initialisation of player
    callback()
	})
 
}
function createAtmosphericBoulders(){
    loader.load('../assets/Boulder/PUSHILIN_boulder.gltf',function ( gltf ) {
        gltf.scene.traverse((o) => {
            if (o.isMesh){//box size, location
                makeInstancedWithCollision(o.geometry,500,new THREE.Vector3(300,600,5000),new THREE.Vector3(300,0,0),50,-5)
                makeInstancedWithCollision(o.geometry,500,new THREE.Vector3(300,400,5000),new THREE.Vector3(0,0,0),15,0)
                makeInstancedWithCollision(o.geometry,500,new THREE.Vector3(300,600,5000),new THREE.Vector3(-300,0,0),50,-5)
                makeInstancedWithCollision(o.geometry,250,new THREE.Vector3(400,400,2000),new THREE.Vector3(0,0,+2000),100,-45)
            } 
          });
    })
}
function updateUI(){
    let timer = document.getElementById("timer")
    timer.innerHTML = Math.round(timeLeft)
    let hElement = document.getElementById("hp")
    hElement.innerHTML = hp;
    
}



function loadTextures(){
    textureLoader.load('../assets/snow3/snow_03_rough_1k.png',function(texture){
        snowRoughness = texture;
        console.log('snow roughness loaded')
    })
    textureLoader.load('../assets/snow3/snow_03_nor_1k.png',function(texture){
        snowNormal= texture;
        console.log('snow normal loaded')
    })
    textureLoader.load('../assets/checkeredTexture.png',function(texture){
        checkeredTexture= texture;
        console.log('check  loaded')
    })
    textureLoader.load('../assets/brick7/castle_brick_07_diff_1k.png',function(texture){
        console.log('check  loaded')
        brickTexture= texture;
        brickTexture.repeat.set(0.1,0.1)
    })
    textureLoader.load('../assets/brick7/castle_brick_07_nor_1k.png',function(texture){
        console.log('check  loaded')
        brickNormal= texture;
        brickNormal.repeat.set(0.1,0.1)
    })
    textureLoader.load('../assets/brick7/castle_brick_07_rough_1k.png',function(texture){
        console.log('check  loaded')
        brickRoughness = texture;
        brickRoughness.repeat.set(0.1,0.1)
    })
    // textureLoader.load('../assets/Asteroid/Asteroids_BaseColor.png',function(texture){
    //     asteroidAlbedo= texture;
    //     console.log('asteroid albedo loaded')
    // })
    // textureLoader.load('../assets/floor6/floor_tiles_06_spec_1k.png',function(texture){
    //     texture.repeat.set(0.1, 0.1);
    //     floorSpec= texture;
    //     console.log('floor spec loaded')
    // })
}

function loadModels(){
     loader.load('../assets/turret/SphereTurret.glb',function ( gltf ) {
        console.log('turret loaded')
        turretModel = gltf;
     })
}

//takes in geom, number of geom we want, the center of the placement area, the offset to place from center
// s for scale, scalar is for reducing the size of the hitbox
function makeInstancedWithCollision( geometry,count,center,offset,s,scalar ) {

    const matrix = new THREE.Matrix4();
    const material = new THREE.MeshPhysicalMaterial({color:0x8c7012})
    boulderBoxes = []
    // the mesh for instancing
    mesh = new THREE.InstancedMesh( geometry, material, count,s );
    mesh.name="instancedCollisionBoulder"
        mesh.castShadow = true;
        mesh.receiveShadow = true;
    for ( let i = 0; i < count; i ++ ) {

        randomizeMatrix( matrix,center,offset,s );
        //sets the mode-view matrix in the instanced buffer for performant rendering
        mesh.setMatrixAt( i, matrix );
        let box = new THREE.Box3()
        //sets the box for each rock
        box.copy( mesh.geometry.boundingBox).applyMatrix4( matrix );
        box.expandByScalar(scalar)
        boulderBoxes.push(box)
        // helper = new THREE.Box3Helper( box, 0xffff00 );
        // helper.name = "bhelper" +String(i)
        // scene.add(helper)
    }
    //adds to scene
    scene.add( mesh );
}
//for atmospheric sound
function setupAudio(){
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
}
