const loader = new THREE.GLTFLoader();
let scene1= new THREE.Scene();
let xWingGLTF;
function loadScene1(){
    
    loader.load('assets/x-wing/model.gltf',function ( gltf ) {
    xWingGLTF = gltf;
	scene1.add( xWingGLTF.scene );
	});
	return scene1;
}
function animateScene(){

}
