function loadSpaceShip(callback){
    loader.load('../assets/x-wing/modified-x-wing.glb',function ( gltf ) {
        xWing= gltf;
        xWing.scene.rotation.x = 2 * Math.sin(clock.getElapsedTime())
	// scene.add(xWing.scene)
    callback()
	})
 
}
function createRings(){
    rings =[];
    ringBoxes=[];
    const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
    const material = new THREE.MeshToonMaterial( { color: 0xffff00 } );
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