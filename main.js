const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshToonMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
let lightAmbient = new THREE.AmbientLight(0x2FFFFFF); // soft white light
scene.add(lightAmbient);

scene.add( cube );
camera.position.z = 5;
scene.background = new THREE.CubeTextureLoader()
	.setPath( 'assets/stardust/' )
	.load( [
		'posx.png',
		'negx.png',
		'posy.png',
		'negy.png',
		'posz.png',
		'negz.png'
	]  );


function animate() {
	requestAnimationFrame( animate );
    cube.rotation.z+=0.02
    cube.rotation.y+=0.02
    cube.rotation.x+=0.02
    renderer.render( scene, camera );
}

animate()
