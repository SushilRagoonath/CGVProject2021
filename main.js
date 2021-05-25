// import {bullet} from '/modules/bullet.js';

const sceneHome = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const clock = new THREE.Clock();
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshToonMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );

let lightAmbient = new THREE.AmbientLight(0x2FFFFFF); // soft white light
let particleLight = new THREE.PointLight( 0xff0000, 1, 100 );
sceneHome.add(lightAmbient);

sceneHome.add( cube );
let stellarBackground = new THREE.CubeTextureLoader()
.setPath( 'assets/stardust/' )
.load( [
	'posx.png',
	'negx.png',
	'posy.png',
	'negy.png',
	'posz.png',
	'negz.png'
] );
//camera.position.z = 5;

//GLOBALS
// currentScene=sceneHome;    
currentScene = loadScene1();
currentScene.background = stellarBackground;
// console.log(camera.position)
    
var bullets = []
function animate() {
	cube.rotation.z+=0.02
    cube.rotation.y+=0.02
    cube.rotation.x+=0.02
    //camera.rotation.x+=0.001
	//     camera.position.z = 5*Math.sin(clock.getElapsedTime())
    //camera.position.y = 5*Math.cos(clock.getElapsedTime())
	// console.log(scene1.position)
	    
	// console.log(camera.position) 
	 
	// cube.position.z-=0.01;
	for(var i=0; i<bullets.length; i++) {
		if(!bullets[i].update(cube.position)) {
			currentScene.remove(bullets[i].getMesh())
			bullets.splice(i, 1)
		}
	}

    renderer.render( currentScene, camera );
	requestAnimationFrame( animate );
}

window.addEventListener('keyup', function(e) {     
	switch(e.keyCode) {
	   case 32: // Space
		 var shipPosition = cube.position.clone()
		 shipPosition.sub(new THREE.Vector3(0, 25, 100))
		
		//  var matrix = new THREE.Matrix4();
		// matrix.extractRotation( cube.matrix );

		// console.log(matrix.extractRotation( cube.matrix ));
		// var direction = new THREE.Vector3( 0, 0, 1 );
		// matrix.multiplyVector3( direction );

		 var bullet = new laser(shipPosition,camera.position)//cube.get
		 bullets.push(bullet)
		 scene1.add(bullet.getMesh())
	   break
	}
	})

animate()

