function resetLevel(e){
    var node = document.getElementById("tutorial-info1")
    
    if(e.key==="Enter"){
        if(node.innerHTML==="press enter to confirm reset"){
            node.innerHTML="Move your mouse to change direction"
            restartLevel()
        }
    }
    if(e.key==="Escape"){
        node.innerHTML= "press enter to confirm reset"
        return
    }
    if(e.key==="r"){
        showGameOver()
       setTimeout(  restartLevel,2000)
    }

}
function restartLevel(){
    player.position.set(0,0,0)
    player.rotation.set(0,0,0)
    timeLeft = 10;
    hp = 50;
    firstcontrols.moveForward=false
    destroyRings()
    createRings()
    sound.stop()
    sound.play()
}
function destroyRings(){
        for (let index = 0; index < ringNumber; index++) {
            scene.remove(scene.getObjectByName("ring"+String(index)) )
        }
    delete ringBoxes;
    ringBoxes = [];
}
function showGameOver(){
    let go =document.getElementById("game-over");
    go.innerHTML= "Restarting level"
    setTimeout(function(){
        go.innerHTML=""
    },1000)
       

}
function showGameWon(){
    let go =document.getElementById("game-over");
    go.innerHTML= "You Won! achieved " +String(ringsRemoved)+'/' +String(ringNumber) +" boxes" 
    setTimeout(function(){
        go.innerHTML=""
        window.location.href='../MainMenu'
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
	// scene.add(xWing.scene)
    callback()
	})
 
}
function createAtmosphericBoulders(){
    loader.load('../assets/Boulder/PUSHILIN_boulder.gltf',function ( gltf ) {
        gltf.scene.traverse((o) => {
            if (o.isMesh){//box size, location
                makeInstancedWithCollision(o.geometry,500,new THREE.Vector3(300,600,5000),new THREE.Vector3(300,0,0),50,-10)
                makeInstancedWithCollision(o.geometry,500,new THREE.Vector3(300,400,5000),new THREE.Vector3(0,0,0),15,-5)
                makeInstancedWithCollision(o.geometry,500,new THREE.Vector3(300,600,5000),new THREE.Vector3(-300,0,0),50,-10)
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

function createDodgeBoulders(){
    loader.load('../assets/Boulder/PUSHILIN_boulder.gltf',function ( gltf ) {
        gltf.scene.traverse((o) => {
            if (o.isMesh){//box size, location
                makeInstancedWithCollision(o.geometry,250,new THREE.Vector3(400,400,2000),new THREE.Vector3(0,0,+2000),100,-45)
            } 
          });
    })
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
    // torus = new THREE.Mesh( geometry, material );
    // scene.add( torus );
    //good rocks
    for (let index = 0; index < ringNumber; index++) {
        let x = 70 * Math.random() 
        let z = 30* Math.random()  +85 *(index+1) 
        let y = 5 * Math.random()
        torus = new THREE.Mesh( geometry, rock2 );
        torus.castShadow = true;
        torus.receiveShadow = true;
        torus.name="ring" +String(index) //sets name so we can easilty delete later
        torus.position.z = z
        torus.position.y = y
        torus.position.x = x
        rings.push(torus)
        let box = new THREE.Box3().setFromObject(torus)
        ringBoxes.push(box)

        scene.add(torus)
        // const helper = new THREE.Box3Helper( box, 0xffff00 );
        // helper.name = "helper" +String(index)
        // scene.add(helper)
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
function makeInstanced( geometry,count,center,offset,s ) {

    const matrix = new THREE.Matrix4();
    const material = new THREE.MeshPhysicalMaterial({color:0x8c7012}) //,map:asteroidAlbedo
    const mesh = new THREE.InstancedMesh( geometry, material, count,s );

    for ( let i = 0; i < count; i ++ ) {

        randomizeMatrix( matrix,center,offset ,s);
        mesh.setMatrixAt( i, matrix );

    }

    scene.add( mesh );
}
function makeInstancedWithCollision( geometry,count,center,offset,s,scalar ) {

    const matrix = new THREE.Matrix4();
    const material = new THREE.MeshPhysicalMaterial({color:0x8c7012})
    boulderBoxes = []
    mesh = new THREE.InstancedMesh( geometry, material, count,s );
    mesh.name="instancedCollisionBoulder"
        mesh.castShadow = true;
        mesh.receiveShadow = true;
    for ( let i = 0; i < count; i ++ ) {

        randomizeMatrix( matrix,center,offset,s );
        mesh.setMatrixAt( i, matrix );
        let box = new THREE.Box3()
        box.copy( mesh.geometry.boundingBox).applyMatrix4( matrix );
        box.expandByScalar(scalar)
        boulderBoxes.push(box)
        // helper = new THREE.Box3Helper( box, 0xffff00 );
        // helper.name = "bhelper" +String(i)
        // scene.add(helper)
    }

    scene.add( mesh );
}
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
