// our player class that extends the group so that
// we can changeview and increase functionality in the future
class Player extends THREE.Group {
	constructor() {
		super()

		this.type = 'Player';
	}
	changeView(e) {
  		if(e.key ==="v"){
  			camera.position.set( 0,2,4);
  		}
  		else if(e.key==="b"){
  			camera.position.set( 0, 1,-0.5);
  		}
  		
	}
	
}


