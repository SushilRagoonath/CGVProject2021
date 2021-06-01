function loadSpaceShip(callback){
    loader.load('../assets/x-wing/modified-x-wing.glb',function ( gltf ) {
        xWing= gltf;
        

        xWing.scene.traverse((o) => {
            
            if (o.isMesh){
                console.log(o.material)
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
                makeInstanced(o.geometry,500,new THREE.Vector3(300,600,5000),new THREE.Vector3(-300,0,0),50)
                makeInstanced(o.geometry,500,new THREE.Vector3(300,600,5000),new THREE.Vector3(300,0,0),50)
                makeInstanced(o.geometry,500,new THREE.Vector3(300,400,5000),new THREE.Vector3(0,0,0),15)
            } 
          });
    })
}

function createDodgeBoulders(){
    loader.load('../assets/Boulder/PUSHILIN_boulder.gltf',function ( gltf ) {
        gltf.scene.traverse((o) => {
            if (o.isMesh){//box size, location
                makeInstancedWithCollision(o.geometry,100,new THREE.Vector3(300,300,1500),new THREE.Vector3(0,0,+1500),100)
            } 
          });
    })
}
function createRings(){
    rings =[];
    ringBoxes=[];
    const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
    console.log('before ring',snowRoughness)
    const rock2 = new THREE.MeshPhysicalMaterial(
     { color: 0x943e00,reflectivity:0.6,envMap:stellarBackground,roughness:0.7,metalness:0.2,roughnessMap:snowRoughness,normalMap:snowNormal,emissive:0x212121} 
        );
    // torus = new THREE.Mesh( geometry, material );
    // scene.add( torus );
    //good rocks
    for (let index = 0; index < 10; index++) {
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
        const helper = new THREE.Box3Helper( box, 0xffff00 );
        helper.name = "helper" +String(index)
        scene.add(helper)
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
}
function makeInstanced( geometry,count,center,offset,s ) {

    const matrix = new THREE.Matrix4();
    const material = new THREE.MeshPhysicalMaterial({color:0x8c7012})
    console.log(center)
    const mesh = new THREE.InstancedMesh( geometry, material, count,s );

    for ( let i = 0; i < count; i ++ ) {

        randomizeMatrix( matrix,center,offset ,s);
        mesh.setMatrixAt( i, matrix );

    }

    scene.add( mesh );
}
function makeInstancedWithCollision( geometry,count,center,offset,s ) {

    const matrix = new THREE.Matrix4();
    const material = new THREE.MeshPhysicalMaterial({color:0x8c7012})
    console.log(center)
    mesh = new THREE.InstancedMesh( geometry, material, count,s );
        mesh.castShadow = true;
        mesh.receiveShadow = true;
    for ( let i = 0; i < count; i ++ ) {

        randomizeMatrix( matrix,center,offset,s );
        mesh.setMatrixAt( i, matrix );

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
function updateTimer(){
    document.getElementById("timer")
    timer.innerHTML = Math.round( clock.getElapsedTime())
}
