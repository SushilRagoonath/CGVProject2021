function createFlag(env,texture){
                const flag = new THREE.Group();
                flag.name = "flag"
                var flag_geometry = new THREE.BoxGeometry( 50, 40, 50 );
                var flag_material = new THREE.MeshPhysicalMaterial( { color: 0xffffff} );
                const cube = new THREE.Mesh( flag_geometry, flag_material );
                cube.name="flagBase"
                cube.position.set(0,0,0)
                flag.add( cube );
                
                flag_geometry = new THREE.CylinderGeometry( 5, 5, 300, 32 );
                flag_material = new THREE.MeshPhysicalMaterial( { color: 0xffffff,metalness:0.5,roughness:0.2,envMap:env } );//0x00ff00
                const pole = new THREE.Mesh( flag_geometry, flag_material );
                pole.name = "flagPole"
                pole.position.set(0,130,0)
                flag.add(pole)

                flag_geometry = new THREE.SphereGeometry( 10, 32, 32 );
                flag_material = new THREE.MeshPhysicalMaterial( { color: 0xe0a10d,metalness:0.5,roughness:0.1,envMap:env} );
                const sphere = new THREE.Mesh( flag_geometry, flag_material );
                sphere.position.set(0,280,0)
                sphere.name = "flagTop"
                flag.add(sphere)

                const verticesOfTriangle = [
                    -1,1,0,    -1,-1,0,   1,0,0
                ];

                const indicesOfFaces = [
                    0,1,2,
                ];

                flag_geometry = new THREE.PolyhedronGeometry( verticesOfTriangle, indicesOfFaces, 40, 0 );
                flag_material = new THREE.MeshPhysicalMaterial( { color: 0xffffff,side: THREE.DoubleSide,map:texture} );
                const triangle = new THREE.Mesh( flag_geometry, flag_material );
                triangle.name="flagTriangle"
                triangle.position.set(30,240,0)
                flag.add(triangle)
                return flag
}