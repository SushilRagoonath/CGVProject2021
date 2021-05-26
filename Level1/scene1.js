function loadSpaceShip(callback){
    loader.load('../assets/x-wing/modified-x-wing.glb',function ( gltf ) {
        xWing= gltf;
        
        var newMaterial = new THREE.MeshBasicMaterial({color: 0xff0000,envMap:stellarBackground,reflectivity:0.4})
        xWing.scene.traverse((o) => {
            
            if (o.isMesh){
                console.log(o.material)
                let newMaterial = new THREE.MeshBasicMaterial({color: 0xffffff,envMap:stellarBackground,reflectivity:0.6,vertexColors: true})
                o.material = newMaterial;
            } 
            
          });
          
	// scene.add(xWing.scene)
    callback()
	})
 
}
function createRings(){
    rings =[];
    ringBoxes=[];
    const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00,envMap:stellarBackground,reflectivity:0.5} );
    // torus = new THREE.Mesh( geometry, material );
    // scene.add( torus );

    for (let index = 0; index < 10; index++) {
        let x = 100 * Math.random()
        let z = 600* Math.random()
        let y = 5 * Math.random()
        const torus = new THREE.Mesh( geometry, material );
        torus.name="ring" +String(index) //sets name so we can easilty delete later
        torus.position.z = z
        torus.position.y = y
        torus.position.x = x
        rings.push(torus)
        let box = new THREE.Box3().setFromObject(torus)
        ringBoxes.push(box)

        scene.add(torus)
    }
}