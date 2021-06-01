const randomizeMatrix = function () {

    const position = new THREE.Vector3();
    const rotation = new THREE.Euler();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    return function ( matrix,center,offset,s ) {

        position.x = Math.random() * center.x - center.x/2 + offset.x;
        position.y = Math.random() * center.y - center.y/2 + offset.y;
        position.z = Math.random() * center.z - center.z/2 + offset.z;

        rotation.x = Math.random() * 2 * Math.PI;
        rotation.y = Math.random() * 2 * Math.PI;
        rotation.z = Math.random() * 2 * Math.PI;

        quaternion.setFromEuler( rotation );

        scale.x = scale.y = scale.z = Math.random() * s;

        matrix.compose( position, quaternion, scale );

    };

}();



