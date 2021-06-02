//scene.add(mapCamera); do this in the main
//renderer.render( scene, mapCamera ); do this in the main
function minimap(){
    miniCamera = new THREE.OrthographicCamera(
        window.innerWidth / -2,		// Left
        window.innerWidth / 2,		// Right
        window.innerHeight / 2,		// Top
        window.innerHeight / -2,	// Bottom
        1,            			// Near 
        1000 
    );           			// Far 
    
    miniCamera.position.set(player.position.x, player.position.y+5, player.position.z);
    miniCamera.lookAt( player.position.x , player.position.y-5, player.position.z );

    renderer.setScissorTest( true );
    renderer.setScissor(10, window.innerHeight - mapHeight - 10, mapWidth, mapHeight);
	renderer.setViewport( 10, window.innerHeight - mapHeight - 10, mapWidth, mapHeight );
    renderer.setScissorTest( false );

    return miniCamera;
}