function loadSpaceShip(callback){
    loader.load('../assets/x-wing/modified-x-wing.glb',function ( gltf ) {
        xWing= gltf;
        

        xWing.scene.traverse((o) => {
            
            if (o.isMesh){
                console.log(o.material)
                let newMaterial = new THREE.MeshPhysicalMaterial({color: 0xffffff,envMap:stellarBackground,roughness:0.1,metalness:0.7,vertexColors: true})
                o.material = newMaterial;
            } 
            
          });
          
	// scene.add(xWing.scene)
    callback()
	})
 
}
function loadBoulders(){
    loader.load('../assets/Boulder/PUSHILIN_boulder.gltf',function ( gltf ) {
        gltf.scene.traverse((o) => {
            if (o.isMesh){
                makeInstanced(o.geometry,500,new THREE.Vector3(300,600,5000),new THREE.Vector3(-300,0,0))
                makeInstanced(o.geometry,500,new THREE.Vector3(300,600,5000),new THREE.Vector3(300,0,0))
                // makeInstanced(o.geometry,500,new THREE.Vector3(500,500,500))
            } 
          });
    })
}


function createRings(){
    rings =[];
    ringBoxes=[];
    const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
    console.log('before ring',snowRoughness)
    const rock1 = new THREE.MeshPhysicalMaterial(
     { color: 0x61420c,reflectivity:0.6,envMap:stellarBackground,roughness:0.7,metalness:0.2,roughnessMap:snowRoughness,normalMap:snowNormal,emissive:0x16241e} 
        );
    const rock2 = new THREE.MeshPhysicalMaterial(
     { color: 0x943e00,reflectivity:0.6,envMap:stellarBackground,roughness:0.7,metalness:0.2,roughnessMap:snowRoughness,normalMap:snowNormal,emissive:0x212121} 
        );
    // torus = new THREE.Mesh( geometry, material );
    // scene.add( torus );
    //good rocks
    for (let index = 0; index < 10; index++) {
        let x = 70 * Math.random()
        let z = 60* Math.random()  +55 *index +20
        let y = 5 * Math.random()
        const torus = new THREE.Mesh( geometry, rock2 );
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
    for (let index = 0; index < 10; index++) {
        let x = 70 * Math.random()
        let z = 60* Math.random()  +55 *index +20
        let y = 5 * Math.random()
        const torus = new THREE.Mesh( geometry, rock1 );
        torus.name="ring" +String(index+10) //sets name so we can easilty delete later
        torus.position.z = z
        torus.position.y = y
        torus.position.x = x
        rings.push(torus)
        let box = new THREE.Box3().setFromObject(torus)
        ringBoxes.push(box)

        scene.add(torus)
        const helper = new THREE.Box3Helper( box, 0xffff00 );
        helper.name = "helper" +String(index+10)
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