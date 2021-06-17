function createHealthObj(env){
    const hObj = new THREE.Group();
    hObj.name = "hObj"
    var hObj_geometry = new THREE.BoxGeometry( 3, 3, 1 );
    var hObj_material = new THREE.MeshPhysicalMaterial( { color: 0xFF0000,metalness:0.3} );
    const hBox = new THREE.Mesh( hObj_geometry, hObj_material );
    hBox.position.set(0,0,0)
    hObj.add( hBox );

    hObj_geometry = new THREE.BoxGeometry( 1, 3, 0.1 );
    hObj_material = new THREE.MeshPhysicalMaterial( { color: 0xFFFFFF,metalness:0.1} );
    const stripe1 = new THREE.Mesh( hObj_geometry, hObj_material );
    stripe1.position.set(0,0,0.55)
    hObj.add( stripe1 );

    hObj_geometry = new THREE.BoxGeometry( 3, 1, 0.1 );
    hObj_material = new THREE.MeshPhysicalMaterial( { color: 0xFFFFFF,metalness:0.1} );
    const stripe2 = new THREE.Mesh( hObj_geometry, hObj_material );
    stripe2.position.set(0,0,0.55)
    hObj.add( stripe2 );

    hObj_geometry = new THREE.BoxGeometry( 1, 3, 0.1 );
    hObj_material = new THREE.MeshPhysicalMaterial( { color: 0xFFFFFF,metalness:0.1} );
    const stripe3 = new THREE.Mesh( hObj_geometry, hObj_material );
    stripe3.position.set(0,0,-0.55)
    hObj.add( stripe3 );

    hObj_geometry = new THREE.BoxGeometry( 3, 1, 0.1 );
    hObj_material = new THREE.MeshPhysicalMaterial( { color: 0xFFFFFF,metalness:0.1} );
    const stripe4 = new THREE.Mesh( hObj_geometry, hObj_material );
    stripe4.position.set(0,0,-0.55)
    hObj.add( stripe4 );

    hObj_geometry = new THREE.BoxGeometry( 1, 0.1, 1.2 );
    hObj_material = new THREE.MeshPhysicalMaterial( { color: 0xFFFFFF,metalness:0.1} );
    const stripe5 = new THREE.Mesh( hObj_geometry, hObj_material );
    stripe5.position.set(0,-1.55,0)
    hObj.add( stripe5 );

    hObj_geometry = new THREE.BoxGeometry( 1, 0.1, 1.2 );
    hObj_material = new THREE.MeshPhysicalMaterial( { color: 0xFFFFFF,metalness:0.1} );
    const stripe6 = new THREE.Mesh( hObj_geometry, hObj_material );
    stripe6.position.set(0,1.55,0)
    hObj.add( stripe6 );

    hObj_geometry = new THREE.BoxGeometry( 0.1, 1, 1.2 );
    hObj_material = new THREE.MeshPhysicalMaterial( { color: 0xFFFFFF,metalness:0.1} );
    const stripe7 = new THREE.Mesh( hObj_geometry, hObj_material );
    stripe7.position.set(-1.55,0,0)
    hObj.add( stripe7 );

    hObj_geometry = new THREE.BoxGeometry( 0.1, 1, 1.2);
    hObj_material = new THREE.MeshPhysicalMaterial( { color: 0xFFFFFF,metalness:0.1} );
    const stripe8 = new THREE.Mesh( hObj_geometry, hObj_material );
    stripe8.position.set(1.55,0,0)
    hObj.add( stripe8 );
    
        
    return hObj
}