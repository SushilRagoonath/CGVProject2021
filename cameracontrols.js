const controls = new THREE.OrbitControls( camera, renderer.domElement );

camera.position.set( 0, 0, 10);

controls.update();