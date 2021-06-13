var laser = function(initialPos,direction) {
    this.direction=direction//set direction from constructor
    this.mesh = new THREE.Mesh(
       new THREE.SphereGeometry(3, 16, 16),//make the bullet
       bullet1
    )
 
    this.mesh.position.copy(initialPos)
 
    this.getMesh = function() {
       return this.mesh
    }
 
    this.update = function(z) {//take in some z value
       this.mesh.position.x+=this.direction.x//change x by the direction
       this.mesh.position.y+=this.direction.y//change y by the direction
       this.mesh.position.z-=this.direction.z//change z by the direction
       // console.log(this.mesh.position)
 
       if(Math.abs(this.mesh.position.z - z) > 1000) {//check if the z value is far enough away and delete it
          delete this.mesh
          return false   
       }
 
       return true
    }
 
    return this
 }