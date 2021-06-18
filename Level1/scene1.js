//spins our flag around the axis 
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

function animateHealth() {
    for (var i = 0; i < healthNumber; i++) {
        let object = scene.getObjectByName("health"+String(i))
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
    timeLeft = 10;
    hp = 50;
    gamePaused = true;
    destroyRings()
    createRings()
    removeHealth()
    createHealthBoxes()
    sound.stop()
    sound.play()

}
// destroys boxes for rings and rings from scene
function destroyRings(){
        for (let index = 0; index < ringNumber; index++) {
            scene.remove(scene.getObjectByName("ring"+String(index)) )
        }
    delete ringBoxes;
    ringBoxes = [];
}

// destroys boxes for health and health from scene
function removeHealth(){
    for (let index = 0; index < healthNumber; index++) {
        scene.remove(scene.getObjectByName("health"+String(index)) )
    }
delete healthBoxes;
healthBoxes = [];
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
    go.innerHTML= "You beat level 1! achieved " +String(ringsRemoved)+'/' +String(ringNumber) +" rings" 
    setTimeout(function(){
        go.innerHTML=""
        window.location.href='../Level2'// routes back to menu after 5 seconds
    },3000)
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


function createRings(){
    rings =[];
    ringBoxes=[];
    ringsRemoved =0;
    const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
    console.log('before ring',snowRoughness)
    const rock2 = new THREE.MeshPhysicalMaterial(
     { color: 0x943e00,reflectivity:0.6,envMap:stellarBackground,roughness:0.7,metalness:0.2,roughnessMap:snowRoughness,normalMap:snowNormal,emissive:0x212121} 
        );
    for (let index = 0; index < ringNumber; index++) {
        let x = 70 * Math.random() 
        let z = 30* Math.random()  +85 *(index+1) 
        let y = 5 * Math.random()
        torus = new THREE.Mesh( geometry, rock2 );
        torus.castShadow = true;
        torus.receiveShadow = true;
        //sets name so we can easilty delete later
        torus.name="ring" +String(index) 
        torus.position.z = z
        torus.position.y = y
        torus.position.x = x
        rings.push(torus)
        //creates hitbox for each ring
        let box = new THREE.Box3().setFromObject(torus)
        ringBoxes.push(box)

        scene.add(torus)
        // const helper = new THREE.Box3Helper( box, 0xffff00 );
        // helper.name = "helper" +String(index)
        // scene.add(helper)
    }

}

function createHealthBoxes(){
    health =[];
    healthBoxes=[];
        
    for (let index = 0; index < healthNumber; index++) {
        let x = 70 * Math.random() 
        let z = 30* Math.random()  + 450 *(index+1) 
        let y = 5 * Math.random()
        healthBox = createHealthObj(stellarBackground);
        healthBox.scale.set(5,5,5)
        healthBox.castShadow = true;
        healthBox.receiveShadow = true;
        //sets name so we can easilty delete later
        healthBox.name="health" +String(index) 
        healthBox.position.z = z
        healthBox.position.y = y
        healthBox.position.x = x
        health.push(healthBox)
        //creates hitbox for each healthbox
        let box = new THREE.Box3().setFromObject(healthBox)
        healthBoxes.push(box)

        scene.add(healthBox)
        //const helper = new THREE.Box3Helper( box, 0xffff00 );
        //helper.name = "helper" +String(index)
        //scene.add(helper)
    }

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

//takes in geom, number of geom we want, the center of the placement area, the offset to place from center
// s for scale, scalar is for reducing the size of the hitbox
function makeInstancedWithCollision( geometry,count,center,offset,s,scalar ) {
    const matrix = new THREE.Matrix4();
    const material = new THREE.MeshPhysicalMaterial({color:0x8c7012})
    // the mesh for instancing
    mesh = new THREE.InstancedMesh( geometry, material, count,s );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
    for ( let i = 0; i < count; i ++ ) {
        // mesh.name="boulder"+String(i)
        randomizeMatrix( matrix,center,offset,s );
        //sets the mode-view matrix in the instanced buffer for performant rendering
        mesh.setMatrixAt( i, matrix );
        let box = new THREE.Box3()
        //sets the box for each rock
        box.copy( mesh.geometry.boundingBox).applyMatrix4( matrix );
        box.expandByScalar(scalar)
        boulderBoxes.push(box)
        // console.log(mesh)
        // boulders.push(mesh)
        // helper = new THREE.Box3Helper( box, 0xffff00 );
        // helper.name = "bhelper" +String(i)
        // scene.add(helper)
        
    }
    // console.log(boulders)
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
    pickUpSound = new THREE.Audio(listener);
    audioLoader.load('../assets/sound/pickup.wav',function(buffer){
        pickUpSound.setBuffer(buffer);
        pickUpSound.setLoop(false);
        pickUpSound.setVolume(0.2)
    })
}
