class Cell extends THREE.Object3D {
  constructor(x, y, z, size) {
    super();
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    
    const geometry = new THREE.PlaneGeometry(size, size);
    const material = new THREE.MeshBasicMaterial({ color: "#770737", side: THREE.DoubleSide, depthTest: true });
    
    this.frontPlane = new THREE.Mesh(geometry, material);
    this.frontPlane.position.y = -size/5;
    this.add(this.frontPlane);

    this.backPlane = new THREE.Mesh(geometry, material);
    this.backPlane.rotateY(-Math.PI / 2);
    this.backPlane.position.x = -size/2;
    this.backPlane.position.z = -size/2;
    this.add(this.backPlane);

    this.rightPlane = new THREE.Mesh(geometry, material);
    this.rightPlane.rotateZ(-Math.PI / 2);
    this.rightPlane.position.z = -size;
    this.add(this.rightPlane);

    this.leftPlane = new THREE.Mesh(geometry, material);
    this.leftPlane.rotateY(Math.PI / 2);
    this.leftPlane.position.x = size/2;
    this.leftPlane.position.z = -size/2;
    this.add(this.leftPlane);
    
    this.position.set(x, y, z);
  }
 
  removeWall(direction) {
    let wall , opp_wall;
     
    if (direction === "rightPlane") {
      wall = this.rightPlane;
    } else if (direction === "leftPlane") {
      wall = this.leftPlane;
    } else if (direction === "frontPlane") {
      wall = this.frontPlane;
    } else if (direction === "backPlane") {
      wall = this.backPlane;
    } else {
      return null;
    }

    this.remove(wall);
     
  }
  
  getNeighborPosition(direction) {
    const [x, y, z] = [this.x, this.y, this.z];
    
    if (direction === "frontPlane") {
      return [this.frontPlane.position.x, this.frontPlane.position.y, this.frontPlane.position.z];
    } else if (direction === "backPlane") {
      return [this.backPlane.position.x, this.backPlane.position.y, this.backPlane.position.z];
    } else if (direction === "leftPlane") {
      return [this.leftPlane.position.x, this.leftPlane.position.y, this.leftPlane.position.z];
    } else if (direction === "rightPlane") {
      return [this.rightPlane.position.x, this.rightPlane.position.y, this.rightPlane.position.z];
    }
  }

  getOppositeDirection(direction) {
    if (direction === "leftPlane") {
      return "rightPlane";
    } else if (direction === "rightPlane") {
      return "leftPlane";
    } else if (direction === "frontPlane") {
      return "backPlane";
    } else if (direction === "backPlane") {
      return "frontPlane";
    }
  }
}
