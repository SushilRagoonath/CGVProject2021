const controls = new THREE.OrbitControls( camera, renderer.domElement ); //might change this camera in the future
// to disable zoom
controls.enableZoom = false;
// to disable rotation
//controls.enableRotate = false;
// to disable pan
controls.enablePan = false;
camera.position.set( 0, 0, 10);
controls.update(); //always update camera after any control changes

// const controls = new PointerLockControls( camera, document.body );

// // add event listener to show/hide a UI (e.g. the game's menu)

// controls.addEventListener( 'lock', function () {

// 	menu.style.display = 'none';

// } );

// controls.addEventListener( 'unlock', function () {

// 	menu.style.display = 'block';

// } );
// camera.position.set( 0, 0, 10);
// controls.update();