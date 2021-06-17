function animateFlag(){
    flag.position.set( 4* Math.sin(clock.getElapsedTime()), 0, 4 *Math.cos(clock.getElapsedTime() ))
    flag.rotation.set(0, 2*clock.getElapsedTime()  , 0.2 *Math.sin(clock.getElapsedTime() * 0.1))
}
function createSpotlight( color ) {

    const newObj = new THREE.SpotLight( color, 1 );

    newObj.castShadow = true;
    newObj.angle = 0.3;
    newObj.penumbra = 0.2;
    newObj.decay = 2;
    newObj.distance = 50;

return newObj;

}

function showCredits(){
    // let container = document.getElementById("body")
    // let text = document.createElement("OBJECT")
    // text.data = "../assets/AssetAttributions.txt"
    // text.className = "scroll-text"
    // container.appendChild(text)
    // setTimeout(function(){
    //     text.remove()
    // },4000)
    window.location.href='../Credits/credits.html'
}
//loads in turret 
function createTurret(){
    loader.load('../assets/turret/BlueSphereTurret.glb',function(glb){
        console.log('turret loaded')
        turret = glb;
        turret.scene.scale.set(0.3,0.3,0.3)
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

      
        mixer = new THREE.AnimationMixer( turret.scene );
        
        turret.animations.forEach( ( clip ) => {
          
            mixer.clipAction( clip ).play();
          
        } );
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
        //callback to ensure correct initialisation
    callback()
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
}

//for atmosspheric sound
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
