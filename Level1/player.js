	class Player extends THREE.Group {
		constructor() {
			super()
			this.currentView= "1st";
			this.type = 'Player';
			console.log(this.currentView)
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


