var laser = function(initialPos,direction) {
    this.direction=direction.clone()//set direction from constructor
    var bullet1 = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.5
   })

    this.mesh = new THREE.Mesh(
       new THREE.SphereGeometry(3, 16, 16),//make the bullet
       bullet1
    )
 
    this.mesh.position.copy(initialPos)
    this.movementSpeed = 5;
    this.getMesh = function() {
       return this.mesh
    }
    this.hitbox = new THREE.Box3()
   
    this.hitboxHelper = new THREE.Box3Helper(this.hitbox)
 
    this.update = function(z) {//take in some z value
       this.mesh.position.x-=this.direction.x * this.movementSpeed//change x by the direction
       this.mesh.position.y-=this.direction.y * this.movementSpeed//change y by the direction
       this.mesh.position.z-=this.direction.z * this.movementSpeed//change z by the direction
       this.hitbox.setFromObject(this.mesh)
       // console.log(this.mesh.position)
 
       if(Math.abs(this.mesh.position.z - z) > 1000) {//check if the z value is far enough away and delete it
          delete this.mesh
          return false   
       }
 
       return true
    }
 
    return this
 }

 