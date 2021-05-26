const controls = new THREE.OrbitControls( camera, renderer.domElement ); //might change this camera in the future
// to disable zoom
controls.enableZoom = false;
// to disable rotation
//controls.enableRotate = false;
// to disable pan
controls.enableZoom = false;
camera.position.set( 0, 0, 10);
controls.update(); 
// function Controller(baseObject,renderer){
//     const controls = new THREE.OrbitControls(baseObject,renderer.domElement)
//     controls.enableZoom = false;
//     controls.enableZoom = false;
//     camera.position.set( 0, 0, 10);
//     controls.update(); 
// }