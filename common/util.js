const randomizeMatrix = function () {

    const position = new THREE.Vector3();
    const rotation = new THREE.Euler();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    return function ( matrix,center,offset ) {

        position.x = Math.random() * center.x - center.x/2 + offset.x;
        position.y = Math.random() * center.y - center.y/2 + offset.y;
        position.z = Math.random() * center.z - center.z/2 + offset.z;

        rotation.x = Math.random() * 2 * Math.PI;
        rotation.y = Math.random() * 2 * Math.PI;
        rotation.z = Math.random() * 2 * Math.PI;

        quaternion.setFromEuler( rotation );

        scale.x = scale.y = scale.z = Math.random() * 20;

        matrix.compose( position, quaternion, scale );

    };

}();


function makeInstanced( geometry,count,center,offset ) {

    const matrix = new THREE.Matrix4();
    const material = new THREE.MeshPhysicalMaterial({color:0x8c7012})
    console.log(center)
    const mesh = new THREE.InstancedMesh( geometry, material, count );

    for ( let i = 0; i < count; i ++ ) {

        randomizeMatrix( matrix,center,offset );
        mesh.setMatrixAt( i, matrix );

    }

    scene.add( mesh );

    //




}