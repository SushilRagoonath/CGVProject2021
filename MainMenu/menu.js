
function createSpotlight( color ) {

    const newObj = new THREE.SpotLight( color, 1 );

    newObj.castShadow = true;
    newObj.angle = 0.3;
    newObj.penumbra = 0.2;
    newObj.decay = 2;
    newObj.distance = 50;

return newObj;

}

function createTurret(){
    loader.load('../assets/turret/sphere_turret_fixed.glb',function(glb){
        console.log('turret loaded')
        turret = glb;
        turret.scene.traverse((o) => {
            
            if (o.isMesh){
                console.log(o.material)
                o.material.metalness = 0.5
                o.castShadow = true;
                o.receiveShadow = true;
            } 
            
          });

        turret.scene.position.x = 1
        turret.scene.position.y = 1
        scene.add(turret.scene)
    })
}

function loadSpaceShip(callback){
    loader.load('../assets/x-wing/modified-x-wing.glb',function ( gltf ) {
        xWing= gltf;

        xWing.scene.traverse((o) => {
            
            if (o.isMesh){
                let newMaterial = new THREE.MeshPhysicalMaterial({color: 0xffffff,envMap:stellarBackground,roughness:0.1,metalness:0.3,vertexColors: true})
                o.material = newMaterial;

                o.castShadow = true;
                o.receiveShadow = true;
            } 
            
          });

    callback()
    })
 
}
function createAtmosphericBoulders(){
    loader.load('../assets/Boulder/PUSHILIN_boulder.gltf',function ( gltf ) {
        gltf.scene.traverse((o) => {
            if (o.isMesh){//box size, location
                makeInstanced(o.geometry,500,new THREE.Vector3(300,600,5000),new THREE.Vector3(-300,0,0),50)
                makeInstanced(o.geometry,500,new THREE.Vector3(300,600,5000),new THREE.Vector3(300,0,0),50)
                makeInstanced(o.geometry,500,new THREE.Vector3(300,400,5000),new THREE.Vector3(0,0,0),5)
            } 
          });
    })
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
    textureLoader.load('../assets/snow3/snow_03_bump_1k.png',function(texture){
        snowBump= texture;
        console.log('snow bumploaded')
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
        sound.setVolume( 0.05 );
        sound.play();
    });
}
